// @TODO I'm not sure this is necessary in JavaScript.
//  How can we test that removing this is safe?
export default function makeInt32Range(n: number): number {
  if (n >= 1073741824.0) {
    return (2.0 * (n % 1073741824.0)) - 1073741824.0;
  } else if (n <= -1073741824.0) {
    return (2.0 * (n % 1073741824.0)) + 1073741824.0;
  }

  return n;
}
