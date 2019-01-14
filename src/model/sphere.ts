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
   * Use a negative latitude if the input value is located on the
   * southern hemisphere.
   *
   * Use a negative longitude if the input value is located on the
   * western hemisphere.
   *
   * @param latitude The latitude of the input value, in degrees.
   * @param longitude The longitude of the input value, in degrees.
   *
   * @returns The output value from the noise module.
   */
  public getValue(latitude: number, longitude: number): number {
    if (!this.sourceModule) {
      throw new Error("Cannot call getValue on sphere model, source module is empty");
    }

    let r: number = Math.cos(MathConsts.DEG_TO_RAD * latitude);

    return this.sourceModule.getValue(
      Math.cos(MathConsts.DEG_TO_RAD * longitude) * r,
      Math.sin(MathConsts.DEG_TO_RAD * latitude),
      Math.sin(MathConsts.DEG_TO_RAD * longitude) * r,
    );
  }
}

export default Sphere;
