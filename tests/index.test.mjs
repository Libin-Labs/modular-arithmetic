import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('power reference', () => {
  assert.equal(api.powMod(4n, 13n, 497n), 445n);
  assert.equal(api.powMod(-2n, 3n, 5n), 2n);
});
test('inverse reference', () => {
  assert.equal(api.inverseMod(3n, 11n), 4n);
  assert.throws(() => api.inverseMod(6n, 9n));
});
test('coprime CRT', () => {
  assert.deepEqual(
    api.solveCongruences([
      { residue: 2n, modulus: 3n },
      { residue: 3n, modulus: 5n },
      { residue: 2n, modulus: 7n },
    ]),
    { residue: 23n, modulus: 105n },
  );
});
test('noncoprime and inconsistent', () => {
  assert.deepEqual(
    api.solveCongruences([
      { residue: 2n, modulus: 4n },
      { residue: 6n, modulus: 8n },
    ]),
    { residue: 6n, modulus: 8n },
  );
  assert.throws(() =>
    api.solveCongruences([
      { residue: 1n, modulus: 2n },
      { residue: 0n, modulus: 4n },
    ]),
  );
});
test('edge and budget validation', () => {
  assert.deepEqual(api.solveCongruences([]), { residue: 0n, modulus: 1n });
  assert.equal(api.powMod(5n, 0n, 1n), 0n);
  assert.throws(() => api.modulo(1n, 0n));
  assert.throws(() => api.powMod(2n, -1n, 3n));
  assert.throws(() => api.modulo(1n << 4096n, 3n));
});
test('brute-force small powers', () => {
  for (let b = -4; b <= 4; b++)
    for (let e = 0; e <= 8; e++)
      for (let m = 1; m <= 12; m++) {
        const x = BigInt(b) ** BigInt(e),
          d = BigInt(m);
        assert.equal(api.powMod(BigInt(b), BigInt(e), d), ((x % d) + d) % d);
      }
});
