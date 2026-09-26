import { Buffer } from 'buffer';
import { getOrCreateWallet } from './network';
import { setNetworkId, getNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { HDWallet, Roles, createKeystore } from '@midnight-ntwrk/wallet-sdk';

function deriveKeys(seed: string) {
  const hdWallet = HDWallet.fromSeed(Buffer.from(seed, 'hex'));
  if (hdWallet.type !== 'seedOk') throw new Error('Invalid seed');
  const result = hdWallet.hdWallet
    .selectAccount(0)
    .selectRoles([Roles.Zswap, Roles.NightExternal, Roles.Dust])
    .deriveKeysAt(0);
  if (result.type !== 'keysDerived') throw new Error('Key derivation failed');
  hdWallet.hdWallet.clear();
  return result.keys;
}

function main() {
  const network = 'preprod';
  setNetworkId(network);
  const networkId = getNetworkId();
  
  const walletCreds = getOrCreateWallet(network);
  const keys = deriveKeys(walletCreds.seed);
  const unshieldedKeystore = createKeystore(keys[Roles.NightExternal], networkId);
  const address = unshieldedKeystore.getBech32Address();

  console.log('\n================================================================');
  console.log('       GHOSTFREE MIDNIGHT PREPROD DEPLOYER WALLET               ');
  console.log('================================================================\n');

  if (walletCreds.mnemonic) {
    console.log('Recovery Phrase (24 words):');
    console.log(walletCreds.mnemonic + '\n');
  }

  console.log('Deployer Bech32 Address:');
  console.log(address + '\n');

  console.log('Faucet URL to request free testnet tDUST / tNIGHT:');
  console.log('👉 https://midnight-tmnight-preprod.nethermind.dev');
  console.log('================================================================\n');
}

main();
