import MathConsts from '@app/mathconsts';
import Model from './Model';

/**
 * Model that defines the surface of a sphere.
 *
 * This model returns an output value from a noise module given the
 * coordinates of an input value located on the surface of a sphere.
 *
 * To generate an output value, pass the (latitude, longitude)
 * coordinates of an input value to the getValue() method.
 *
 * This model is useful for creating:
 * - seamless textures that can be mapped onto a sphere
 * - terrain height maps for entire planets
 *
 * This sphere has a radius of 1.0 unit and its center is located at
 * the origin.
 */
class Sphere extends Model {
  /**
   * Returns the output value from the noise module given the
   * (latitude, longitude) coordinates of the specified input value
   * located on the surface of the sphere.
   *
   * This output value is generated by the noise module passed to the
   * SetModule() method.
   *
   * Use a negative latitude if the input value is located on the
   * southern hemisphere.
   *
   * Use a negative longitude if the input value is located on the
   * western hemisphere.
   *
   * @param lat The latitude of the input value, in degrees.
   * @param lon The longitude of the input value, in degrees.
   *
   * @returns The output value from the noise module.
   */
  public getValue(lat: number, lon: number): number {
    let r: number = Math.cos(MathConsts.DEG_TO_RAD * lat);

    return this.sourceModule.getValue(
      Math.cos(MathConsts.DEG_TO_RAD * lon) * r,
      Math.sin(MathConsts.DEG_TO_RAD * lat),
      Math.sin(MathConsts.DEG_TO_RAD * lon) * r,
    );
  }
}

export default Sphere;
