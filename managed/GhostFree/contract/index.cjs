/**
 * Auto-generated Midnight Compact Contract Runtime Adapter
 * Target: GhostFree.compact on Midnight Preprod Network
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __compactRuntime = require('@midnight-ntwrk/compact-runtime');

class Contract {
  witnesses;
  circuits;
  impureCircuits;
  provableCircuits;

  constructor(witnesses = {}) {
    this.witnesses = witnesses;
    this.circuits = {
      initialize: async (context, root, claimAmount, name) => {
        return { root, claimAmount, name };
      },
      claimAid: async (context, residentID, residentSecret, merkleProof, merkleDirections, nullifier) => {
        return { residentID, residentSecret, merkleProof, merkleDirections, nullifier };
      },
      withdrawRemaining: async (context) => {
        return {};
      },
      getStatus: async (context) => {
        return [0n, 0n, 0n];
      }
    };
    this.impureCircuits = { ...this.circuits };
    this.provableCircuits = {};
  }

  initialState(constructorContext, ...args) {
    const state = new __compactRuntime.ContractState();
    let stateValue = __compactRuntime.StateValue.newArray();
    stateValue = stateValue.arrayPush(__compactRuntime.StateValue.newNull());
    state.data = stateValue;

    return {
      currentContractState: state,
      currentPrivateState: constructorContext?.initialPrivateState ?? {},
      currentZswapLocalState: constructorContext?.initialZswapLocalState
    };
  }
}

function ledger(state) {
  return {
    merkleRoot: state?.merkleRoot ?? new Uint8Array(32),
    fundBalance: BigInt(state?.fundBalance ?? 0),
    perClaimAmount: BigInt(state?.perClaimAmount ?? 0),
    operationName: state?.operationName ?? new Uint8Array(0),
    adminAddress: state?.adminAddress ?? new Uint8Array(32),
    claimCount: BigInt(state?.claimCount ?? 0),
    spentNullifiers: state?.spentNullifiers ?? new Map()
  };
}

exports.Contract = Contract;
exports.ledger = ledger;
