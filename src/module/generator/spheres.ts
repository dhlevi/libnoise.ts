import GeneratorModule from './GeneratorModule';

/**
 * Noise module that outputs concentric spheres.
 *
 * This noise module outputs concentric spheres centered on the origin
 * like the concentric rings of an onion.
 *
 * The first sphere has a radius of 1.0.  Each subsequent sphere has a
 * radius that is 1.0 unit larger than the previous sphere.
 *
 * The output value from this noise module is determined by the distance
 * between the input value and the the nearest spherical surface.  The
 * input values that are located on a spherical surface are given the
 * output value 1.0 and the input values that are equidistant from two
 * spherical surfaces are given the output value -1.0.
 *
 * An application can change the frequency of the concentric spheres.
 * Increasing the frequency reduces the distances between spheres.
 *
 * This noise module, modified with some low-frequency, low-power
 * turbulence, is useful for generating agate-like textures.
 *
 * This noise module does not require any source modules.
 */
class Spheres extends GeneratorModule {
  public static readonly DEFAULT_SPHERES_FREQUENCY = 4.0;

  /**
   * Frequency of the concentric spheres.
   */
  public frequency: number;

  /**
   * @param frequency Frequency of the concentric spheres.
   */
  constructor(frequency?: number) {
    super();

    this.frequency = frequency || Spheres.DEFAULT_SPHERES_FREQUENCY;
  }

  public getValue(x: number, y: number, z: number): number {
    x = (x * this.frequency);
    y = (y * this.frequency);
    z = (z * this.frequency);

    let distFromCenter = Math.sqrt(x * x + y * y + z * z);
    let distFromSmallerSphere = distFromCenter - Math.floor(distFromCenter);
    let distFromLargerSphere = 1.0 - distFromSmallerSphere;
    let nearestDist = Math.min(distFromSmallerSphere, distFromLargerSphere);

    return 1.0 - (nearestDist * 4.0); // Puts it in the -1.0 to +1.0 range.
  }
}

export default Spheres;
