import fs from 'node:fs';
import * as ledger from '@midnight-ntwrk/ledger-v8';

const log = fs.readFileSync('C:\\\\Users\\\\Renz Jericho Buday\\\\.gemini\\\\antigravity-ide\\\\brain\\\\176f3a98-2436-48b7-ac60-020116e827af\\\\.system_generated\\\\tasks\\\\task-2849.log', 'utf8');
const match = log.match(/"params":\["(0x[0-9a-fA-F]+)"\]/);
const hex = match[1];

const tag = Buffer.from('midnight:transaction');
const buf = Buffer.from(hex.slice(2), 'hex');
const idx = buf.indexOf(tag);
console.log('Found tag at index:', idx);
const txBytes = buf.subarray(idx);

try {
  const tx = ledger.Transaction.deserialize(new Uint8Array(txBytes));
  console.log('Transaction deserialized successfully!');
  console.log('Intents length:', tx.intents.length);
  for (const intent of tx.intents) {
    console.log('Intent:', intent.toString());
  }
} catch (e) {
  console.error('Deserialize error:', e);
}
