export default class Interpolation {
  /**
   * Performs cubic interpolation between two values bound between two other
   * values.
   *
   * The alpha value should range from 0.0 to 1.0.  If the alpha value is
   * 0.0, this function returns n1.  If the alpha value is 1.0, this
   * function returns n2.
   *
   * @param n0 The value before the first value.
   * @param n1 The first value.
   * @param n2 The second value.
   * @param n3 The value after the second value.
   * @param a The alpha value.
   *
   * @returns The interpolated value.
   *
   */
  public static cubic(n0: number, n1: number, n2: number, n3: number, a: number): number {
    let p = ((n3 - n2) - (n0 - n1));
    let q = ((n0 - n1) - p);
    let r = (n2 - n0);
    let s = (n1);
    return (p * a * a * a + q * a * a + r * a + s);
  }

  /**
   * Performs linear interpolation between two values.
   *
   * The alpha value should range from 0.0 to 1.0.  If the alpha value is
   * 0.0, this function returns n0.  If the alpha value is 1.0, this
   * function returns n1.
   *
   * @param n0 The first value.
   * @param n1 The second value.
   * @param a The alpha value.
   *
   * @returns The interpolated value.
   */
  public static linear(n0: number, n1: number, a: number): number {
    return ((1.0 - a) * (n0)) + (a * (n1));
  }

  /**
   * Maps a value onto a cubic S-curve.
   * The derivative of a cubic S-curve is zero at `a = 0.0` and `a = 1.0`
   *
   * @param a The value to map onto a cubic S-curve. Should range from 0.0 to 1.0.
   *
   * @returns The mapped value.
   */
  public static cubicSCurve(a: number): number {
    return (a * a * (3.0 - 2.0 * a));
  }

  /**
   * Maps a value onto a quintic S-curve.
   * The first derivative of a quintic S-curve is zero at `a = 0.0` and `a = 1.0`
   *
   * The second derivative of a quintic S-curve is zero at `a = 0.0` and `a = 1.0`
   *
   * @param a The value to map onto a quintic S-curve. Should range from 0.0 to 1.0.
   *
   * @returns The mapped value.
   */
  public static quinticSCurve(a: number): number {
    let a3 = (a * a * a);
    let a4 = (a3 * a);
    let a5 = (a4 * a);
    return ((6.0 * a5) - (15.0 * a4) + (10.0 * a3));
  }
}
