import { fileURLToPath, pathToFileURL } from 'node:url';
import * as path from 'node:path';
import { WebSocket } from 'ws';
import { resolveNetwork, getOrCreateWallet } from './network';
import { createWallet } from './wallet';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { createUnprovenDeployTx } from '@midnight-ntwrk/midnight-js-contracts';
import * as ledger from '@midnight-ntwrk/midnight-js-protocol/ledger';

// @ts-expect-error WebSocket needed
globalThis.WebSocket = WebSocket;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const zkConfigPath = path.resolve(__dirname, '..', 'contracts', 'managed', 'hello-world');
const contractPath = path.join(zkConfigPath, 'contract', 'index.cjs');

const GhostFreeContract = await import(pathToFileURL(contractPath).href);
const compiledContract = CompiledContract.make('GhostFree', GhostFreeContract.Contract).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets(zkConfigPath),
);

const { network, config: networkConfig } = resolveNetwork({ argv: ['--network', 'preprod'] });
const WALLET = getOrCreateWallet(network);
const seed = WALLET.seed;

console.log('Restoring wallet...');
const walletCtx = await createWallet({ network, networkConfig, seed });
await walletCtx.wallet.waitForSyncedState();
console.log('Wallet synced.');

const privateStatePassword = 'GhostFree-Preprod-Secure-Storage-Key-1234';
const accountId = walletCtx.unshieldedKeystore.getBech32Address().toString();

const walletProvider = {
  getCoinPublicKey: () => walletCtx.shieldedSecretKeys.coinPublicKey,
  getEncryptionPublicKey: () => walletCtx.shieldedSecretKeys.encryptionPublicKey,
  async balanceTx(tx: any, ttl?: Date) {
    console.log('Balancing unbound transaction...');
    const recipe = await walletCtx.wallet.balanceUnboundTransaction(
      tx,
      { shieldedSecretKeys: walletCtx.shieldedSecretKeys, dustSecretKey: walletCtx.dustSecretKey },
      { ttl: ttl ?? new Date(Date.now() + 30 * 60 * 1000) },
    );
    console.log('Recipe type:', recipe.type);
    const finalized = await walletCtx.wallet.finalizeRecipe(recipe);
    console.log('Finalized recipe successfully.');
    return finalized;
  },
  submitTx: (tx: any) => walletCtx.wallet.submitTransaction(tx) as any,
};

const zkConfigProvider = new NodeZkConfigProvider(zkConfigPath);
const providers = {
  privateStateProvider: levelPrivateStateProvider({
    privateStateStoreName: 'ghostfree-preprod-state',
    accountId,
    privateStoragePasswordProvider: () => privateStatePassword,
  }),
  publicDataProvider: indexerPublicDataProvider(networkConfig.indexer, networkConfig.indexerWS),
  zkConfigProvider,
  proofProvider: httpClientProofProvider(networkConfig.proofServer, zkConfigProvider),
  walletProvider,
  midnightProvider: walletProvider,
};

console.log('Creating unproven deploy tx...');
const unprovenDeployTxData = await createUnprovenDeployTx(providers as any, {
  compiledContract: compiledContract as any,
  args: [],
  privateStateId: 'ghostfree-preprod-state',
  initialPrivateState: {},
});
console.log('Contract Address:', unprovenDeployTxData.public.contractAddress);

console.log('Proving tx...');
const provenTx = await providers.proofProvider.proveTx(unprovenDeployTxData.private.unprovenTx);
console.log('Proven tx successfully. Intents:', provenTx.intents.length);

console.log('Balancing tx...');
const balancedTx = await walletProvider.balanceTx(provenTx);
console.log('Balanced tx successfully. Checking properties:');
console.log('Network ID:', (balancedTx as any).networkId);
console.log('Intents:', (balancedTx as any).intents?.length);
console.log('Dust inputs:', (balancedTx as any).dustInputs?.length);
console.log('Dust outputs:', (balancedTx as any).dustOutputs?.length);
console.log('Unshielded inputs:', (balancedTx as any).unshieldedInputs?.length);
console.log('Unshielded outputs:', (balancedTx as any).unshieldedOutputs?.length);
console.log('Identifiers:', (balancedTx as any).identifiers?.());

await walletCtx.wallet.stop();
console.log('Done test inspection!');
