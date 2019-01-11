export default abstract class Module {
  // Functions
  /**
   * Generates an output value given the coordinates of the specified
   * input value.
   *
   * @param x The x coordinate of the input value.
   * @param y The y coordinate of the input value.
   * @param z The z coordinate of the input value.
   *
   * @returns The output value.
   */
  public abstract getValue(x: number, y: number, z: number): number;
}