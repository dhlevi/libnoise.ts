/**
 * Modifies a floating-point value so that it can be stored in a
 * int32 variable.
 *
 * @param n A floating-point number.
 *
 * @returns The modified floating-point number.
 *
 * In libnoise, the noise-generating algorithms are all integer-based;
 * they use variables of type int32.  Before calling a noise
 * function, pass the x, y, and z coordinates to this function to
 * ensure that these coordinates can be cast to a int32 value.
 *
 * Although you could do a straight cast from double to int32, the
 * resulting value may differ between platforms.  By using this function,
 * you ensure that the resulting value is identical between platforms.
 *
 * @TODO I'm not sure this is necessary in JavaScript.
 *  How can we test that removing this is safe?
 */
export default function makeInt32Range(n: number): number {
  if (n >= 1073741824.0) {
    return (2.0 * (n % 1073741824.0)) - 1073741824.0;
  } else if (n <= -1073741824.0) {
    return (2.0 * (n % 1073741824.0)) + 1073741824.0;
  }

  return n;
}
