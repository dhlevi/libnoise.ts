import MathConsts from '@app/mathconsts';
import Model from './Model';

/**
 * Model that defines the surface of a cylinder.
 *
 * This model returns an output value from a noise module given the
 * coordinates of an input value located on the surface of a cylinder.
 *
 * To generate an output value, pass the (angle, y) coordinates of
 * an input value to the getValue() method.
 *
 * This model is useful for creating:
 * - seamless textures that can be mapped onto a cylinder
 *
 * This cylinder has a radius of 1.0 unit and has infinite height.  It is
 * oriented along the y axis.  Its center is located at the origin.
 */
class Cylinder extends Model {
  /**
   * Returns the output value from the noise module given the
   * (angle, height) coordinates of the specified input value located
   * on the surface of the cylinder.
   *
   * This cylinder has a radius of 1.0 unit and has infinite height.
   * It is oriented along the y axis.  Its center is located at the
   * origin.
   *
   * @param angleDegrees The angle around the cylinder's center, in degrees.
   * @param height The height along the y axis.
   *
   * @returns The output value from the noise module.
   */
  public getValue(angleDegrees: number, height: number): number {
    let i = angleDegrees * MathConsts.DEG_TO_RAD;

    return this.sourceModule.getValue(Math.cos(i), height, Math.sin(i));
  }
}

export default Cylinder;
