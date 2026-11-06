# @lp-labs/modular-arithmetic

Bounded bigint modular powers, inverses and generalized CRT.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/modular-arithmetic
```

## Working example

```js
import { powMod, inverseMod } from '@lp-labs/modular-arithmetic';
if (powMod(4n, 13n, 497n) !== 445n || inverseMod(3n, 11n) !== 4n) throw new Error('Modular');
```

CommonJS: `const api = require('@lp-labs/modular-arithmetic')`.

## Behavior, customization and limits

modulo requires positive modulus; powMod exponent nonnegative and uses repeated squaring. inverseMod throws when no multiplicative inverse exists, including modulus1. solveCongruences merges even noncoprime moduli, rejects inconsistent systems; empty system is residue0/modulus1. Maximum128 congruences and <=4096-bit inputs/intermediates. Not constant-time and NOT cryptography.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface Congruence {
  residue: bigint;
  modulus: bigint;
}
export declare function modulo(value: bigint, modulus: bigint): bigint;
export declare function powMod(base: bigint, exponent: bigint, modulus: bigint): bigint;
export declare function inverseMod(value: bigint, modulus: bigint): bigint;
export declare function solveCongruences(items: readonly Congruence[]): Congruence;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
