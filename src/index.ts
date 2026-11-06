function big(value: bigint): bigint {
  if (typeof value !== 'bigint') throw new TypeError('Expected bigint');
  const limit = (1n << 4096n) - 1n;
  if (value > limit || value < -limit) throw new RangeError('4096-bit budget exceeded');
  return value;
}
export interface Congruence {
  residue: bigint;
  modulus: bigint;
}
export function modulo(value: bigint, modulus: bigint): bigint {
  big(value);
  big(modulus);
  if (modulus <= 0n) throw new RangeError('Positive modulus required');
  return ((value % modulus) + modulus) % modulus;
}
export function powMod(base: bigint, exponent: bigint, modulus: bigint): bigint {
  big(exponent);
  if (exponent < 0n) throw new RangeError('Negative exponent');
  let b = modulo(base, modulus),
    e = exponent,
    r = 1n % modulus;
  while (e) {
    if (e & 1n) r = modulo(big(r * b), modulus);
    e >>= 1n;
    if (e) b = modulo(big(b * b), modulus);
  }
  return r;
}
function egcd(a: bigint, b: bigint): { g: bigint; x: bigint } {
  let x = 1n,
    y = 0n;
  while (b) {
    const q = a / b;
    [a, b] = [b, a - q * b];
    [x, y] = [y, big(x - q * y)];
  }
  return { g: a, x };
}
export function inverseMod(value: bigint, modulus: bigint): bigint {
  const a = modulo(value, modulus);
  if (modulus === 1n) throw new RangeError('No inverse');
  const { g, x } = egcd(a, modulus);
  if (g !== 1n) throw new RangeError('Not invertible');
  return modulo(x, modulus);
}
export function solveCongruences(items: readonly Congruence[]): Congruence {
  if (!Array.isArray(items) || items.length > 128) throw new RangeError('Congruence budget');
  let r = 0n,
    m = 1n;
  for (const item of items) {
    if (!item) throw new TypeError('Expected congruence');
    const s = modulo(item.residue, item.modulus),
      n = item.modulus,
      { g, x } = egcd(m, n),
      delta = s - r;
    if (delta % g !== 0n) throw new RangeError('Inconsistent congruences');
    const k = modulo(big((delta / g) * x), n / g),
      next = big(m * (n / g));
    r = modulo(big(r + m * k), next);
    m = next;
  }
  return { residue: r, modulus: m };
}
