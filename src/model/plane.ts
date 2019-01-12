import Model from './Model';

/**
 * Model that defines the surface of a plane.
 *
 * This model returns an output value from a noise module given the
 * coordinates of an input value located on the surface of an ( x,
 * z ) plane.
 *
 * To generate an output value, pass the ( x, z ) coordinates of
 * an input value to the getValue() method.
 *
 * This model is useful for creating:
 * - two-dimensional textures
 * - terrain height maps for local areas
 *
 * This plane extends infinitely in both directions.
 */
class Plane extends Model {
  /**
   * Returns the output value from the noise module given the
   * ( x, z ) coordinates of the specified input value located
   * on the surface of the plane.
   *
   * This output value is generated by the noise module passed to the
   * setModule() method.
   *
   * @param x The x coordinate of the input value.
   * @param z The z coordinate of the input value.
   *
   * @returns The output value from the noise module.
   */
  public getValue(x: number, z: number): number {
    return this.sourceModule.getValue(x, 0, z);
  }
}

export default Plane;
