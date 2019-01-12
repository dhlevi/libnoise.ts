export default class MathConsts {
  /**
   * Pi. This is the ratio of the circumference of a circle to its diameter.
   */
  public static readonly PI = Math.PI;
  /**
   * The square root of 2.
   */
  public static readonly SQRT_2 = Math.SQRT2;
  /**
   * The square root of 3.
   */
  public static readonly SQRT_3 = 1.7320508075688772935;
  /**
   * Convert degrees to radians by multiplying by this constant.
   */
  public static readonly DEG_TO_RAD = Math.PI / 180.0;
  /**
   * Convert radians to degrees by multiplying by this constant.
   */
  public static readonly RAD_TO_DEG = 1.0 / (Math.PI / 180.0);
}
