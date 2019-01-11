import GeneratorModule from './GeneratorModule';

/**
 * Noise module that outputs concentric cylinders.
 *
 * This noise module outputs concentric cylinders centered on the origin.
 * These cylinders are oriented along the y axis similar to the
 * concentric rings of a tree.  Each cylinder extends infinitely along
 * the y axis.
 *
 * The first cylinder has a radius of 1.0.  Each subsequent cylinder has
 * a radius that is 1.0 unit larger than the previous cylinder.
 *
 * The output value from this noise module is determined by the distance
 * between the input value and the the nearest cylinder surface.  The
 * input values that are located on a cylinder surface are given the
 * output value 1.0 and the input values that are equidistant from two
 * cylinder surfaces are given the output value -1.0.
 *
 * An application can change the frequency of the concentric cylinders.
 * Increasing the frequency reduces the distances between cylinders.
 *
 * This noise module, modified with some low-frequency, low-power
 * turbulence, is useful for generating wood-like textures.
 *
 * This noise module does not require any source modules.
 */
class Cylinders extends GeneratorModule {
  public static readonly DEFAULT_CYLINDERS_FREQUENCY = 1.0;

  /**
   * The frequency of the concentric cylinders.
   */
  public frequency: number;

  /**
   * @param frequency The frequency of the concentric cylinders.
   */
  constructor(frequency?: number) {
    super();

    this.frequency = frequency || Cylinders.DEFAULT_CYLINDERS_FREQUENCY;
  }

  public getValue(x: number, y: number, z: number): number {
    x = (x * this.frequency);
    y = (y * this.frequency);
    z = (z);

    let distFromCenter = Math.sqrt(x * x + z * z);
    let distFromSmallerSphere = distFromCenter - Math.floor(distFromCenter);
    let distFromLargerSphere = 1.0 - distFromSmallerSphere;
    let nearestDist = Math.min(distFromSmallerSphere, distFromLargerSphere);

    return 1.0 - (nearestDist * 4.0); // Puts it in the -1.0 to +1.0 range.
  }
}

export default Cylinders;
