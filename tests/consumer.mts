import { powMod, inverseMod } from '@lp-labs/modular-arithmetic';
if (powMod(4n, 13n, 497n) !== 445n || inverseMod(3n, 11n) !== 4n) throw new Error('Modular');
// @ts-expect-error invalid argument must be rejected by declarations
powMod(2, 3n, 5n);
