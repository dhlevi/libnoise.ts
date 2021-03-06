import Interpolation from '@app/interpolation';
import VectorTable from '@app/vectortable';

// Type definitions
type CoherentNoiseCallback = (x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, xs: number, ys: number, zs: number) => number;

export enum Quality {
  /**
   * Generates coherent noise quickly.  When a coherent-noise function with
   * NoiseGen.prototype quality setting is used to generate a bump-map image, there are
   * noticeable "creasing" artifacts in the resulting image.  This is
   * because the derivative of that function is discontinuous at integer
   * boundaries.
   */
  Fast = 0,
  /**
   * Generates standard-quality coherent noise.  When a coherent-noise
   * function with NoiseGen.prototype quality setting is used to generate a bump-map
   * image, there are some minor "creasing" artifacts in the resulting
   * image.  This is because the second derivative of that function is
   * discontinuous at integer boundaries.
   */
  Standard = 1,
  /**
   * Generates the best-quality coherent noise.  When a coherent-noise
   * function with NoiseGen.prototype quality setting is used to generate a bump-map
   * image, there are no "creasing" artifacts in the resulting image.  This
   * is because the first and second derivatives of that function are
   * continuous at integer boundaries.
   */
  Best = 2,
}

export default class NoiseGen {
  // Constants
  private static readonly X_NOISE_GEN = 1619;
  private static readonly Y_NOISE_GEN = 31337;
  private static readonly Z_NOISE_GEN = 6971;
  private static readonly SEED_NOISE_GEN = 1013;
  private static readonly SHIFT_NOISE_GEN = 8;

  /**
   * Generates an integer-noise value from the coordinates of a
   * three-dimensional input value.
   *
   * @param x The integer x coordinate of the input value.
   * @param y The integer y coordinate of the input value.
   * @param z The integer z coordinate of the input value.
   * @param seed A random number seed.
   *
   * @returns The generated integer-noise value.
   *
   * The return value ranges from 0 to 2147483647.
   *
   * A noise function differs from a random-number generator because it
   * always returns the same output value if the same input value is passed
   * to it.
   */
  public static intValueNoise3D(x: number, y: number, z: number, seed: number): number {
    x = Math.floor(x);
    y = Math.floor(y);
    z = Math.floor(z);
    seed = Math.floor(seed);

    // All constants are primes and must remain prime in order for this noise
    // function to work correctly.
    let n = Math.floor((
      NoiseGen.X_NOISE_GEN * x
      + NoiseGen.Y_NOISE_GEN * y
      + NoiseGen.Z_NOISE_GEN * z
      + NoiseGen.SEED_NOISE_GEN * seed)
      & 0x7fffffff);

    n = (n >> 13) ^ n;

    return ((n * (n * n * 60493 + 19990303) + 1376312589) & 0x7fffffff);
  }

  /**
   * Generates a value-noise value from the coordinates of a
   * three-dimensional input value.
   *
   * @param x The x coordinate of the input value.
   * @param y The y coordinate of the input value.
   * @param z The z coordinate of the input value.
   * @param seed A random number seed.
   *
   * @returns The generated value-noise value.
   *
   * The return value ranges from -1.0 to +1.0.
   *
   * A noise function differs from a random-number generator because it
   * always returns the same output value if the same input value is passed
   * to it.
   */
  public static valueNoise3D(x: number, y: number, z: number, seed: number = 0): number {
    return 1.0 - (NoiseGen.intValueNoise3D(Math.floor(x), Math.floor(y), Math.floor(z), Math.floor(seed)) / 1073741824.0);
  }

  /**
   * Generates a gradient-noise value from the coordinates of a
   * three-dimensional input value and the integer coordinates of a
   * nearby three-dimensional value.
   *
   * @param fx The floating-point x coordinate of the input value.
   * @param fy The floating-point y coordinate of the input value.
   * @param fz The floating-point z coordinate of the input value.
   * @param ix The integer x coordinate of a nearby value.
   * @param iy The integer y coordinate of a nearby value.
   * @param iz The integer z coordinate of a nearby value.
   * @param seed The random number seed.
   *
   * @returns The generated gradient-noise value.
   *
   * The difference between fx and ix must be less than or equal
   * to one.
   *
   * The difference between fy and iy must be less than or equal
   * to one.
   *
   * The difference between fz and iz must be less than or equal
   * to one.
   *
   * A *gradient*-noise function generates better-quality noise than a
   * *value*-noise function.  Most noise modules use gradient noise for
   * this reason, although it takes much longer to calculate.
   *
   * The return value ranges from -1.0 to +1.0.
   *
   * This function generates a gradient-noise value by performing the
   * following steps:
   * - It first calculates a random normalized vector based on the
   *   nearby integer value passed to this function.
   * - It then calculates a new value by adding this vector to the
   *   nearby integer value passed to this function.
   * - It then calculates the dot product of the above-generated value
   *   and the floating-point input value passed to this function.
   *
   * A noise function differs from a random-number generator because it
   * always returns the same output value if the same input value is passed
   * to it.
   */
  public static gradientNoise3D(fx: number, fy: number, fz: number, ix: number, iy: number, iz: number, seed: number = 1): number {
    // Randomly generate a gradient vector given the integer coordinates of the
    // input value.  This implementation generates a random number and uses it
    // as an index into a normalized-vector lookup table.
    let vectorIndex = Math.floor(
      NoiseGen.X_NOISE_GEN * ix +
      NoiseGen.Y_NOISE_GEN * iy +
      NoiseGen.Z_NOISE_GEN * iz +
      NoiseGen.SEED_NOISE_GEN * seed,
    ) & 0xffffffff;

    vectorIndex ^= (vectorIndex >> NoiseGen.SHIFT_NOISE_GEN);
    vectorIndex &= 0xff;

    let xvGradient = VectorTable[(vectorIndex << 2)];
    let yvGradient = VectorTable[(vectorIndex << 2) + 1];
    let zvGradient = VectorTable[(vectorIndex << 2) + 2];

    // Set up us another vector equal to the distance between the two vectors
    // passed to this function.
    let xvPoint = (fx - ix);
    let yvPoint = (fy - iy);
    let zvPoint = (fz - iz);

    // Now compute the dot product of the gradient vector with the distance
    // vector.  The resulting value is gradient noise.  Apply a scaling value
    // so that this noise value ranges from -1.0 to 1.0.
    return (
      (xvGradient * xvPoint) +
      (yvGradient * yvPoint) +
      (zvGradient * zvPoint)
    ) * 2.12;
  }

  // @TODO remove `seed` param, it is not used. Or maybe it should be?
  private static coherentNoise3D(x: number, y: number, z: number, seed?: number, quality?: number, func?: CoherentNoiseCallback): number {
    if (!func) {
      throw new Error('Must provide proper interpolation function!');
    }

    if (!seed) {
      seed = 1;
    } else {
      seed = Math.floor(seed);
    }

    if (!quality) {
      quality = Quality.Standard;
    } else {
      quality = Math.floor(quality);
    }

    let xi = Math.floor(x);
    let yi = Math.floor(y);
    let zi = Math.floor(z);

    // Create a unit-length cube aligned along an integer boundary.  This cube
    // surrounds the input point.
    let x0 = (x > 0.0 ? xi : x - 1);
    let x1 = x0 + 1;
    let y0 = (y > 0.0 ? yi : y - 1);
    let y1 = y0 + 1;
    let z0 = (z > 0.0 ? zi : z - 1);
    let z1 = z0 + 1;

    // Map the difference between the coordinates of the input value and the
    // coordinates of the cube's outer-lower-left vertex onto an S-curve.
    let xs = 0, ys = 0, zs = 0;

    switch (quality) {
      case Quality.Best:
        xs = Interpolation.quinticSCurve(x - x0);
        ys = Interpolation.quinticSCurve(y - y0);
        zs = Interpolation.quinticSCurve(z - z0);
        break;

      case Quality.Standard:
        xs = Interpolation.cubicSCurve(x - x0);
        ys = Interpolation.cubicSCurve(y - y0);
        zs = Interpolation.cubicSCurve(z - z0);
        break;

      default:
      case Quality.Fast:
        xs = x - x0;
        ys = y - y0;
        zs = z - z0;
        break;
    }

    // use provided function to interpolate
    return func(x0, y0, z0, x1, y1, z1, xs, ys, zs);
  }

  /**
   * Generates a value-coherent-noise value from the coordinates of a
   * three-dimensional input value.
   *
   * @param x The x coordinate of the input value.
   * @param y The y coordinate of the input value.
   * @param z The z coordinate of the input value.
   * @param seed The random number seed.
   * @param quality The quality of the coherent-noise.
   *
   * @returns The generated value-coherent-noise value.
   *
   * The return value ranges from -1.0 to +1.0.
   *
   * For an explanation of the difference between *gradient* noise and
   * *value* noise, see the comments for the gradientNoise3D() function.
   */
  public static valueCoherentNoise3D(x: number, y: number, z: number, seed: number, quality: number): number {
    return NoiseGen.coherentNoise3D(x, y, z, seed, quality, (x0, y0, z0, x1, y1, z1, xs, ys, zs) => {

      // Now calculate the noise values at each vertex of the cube.  To generate
      // the coherent-noise value at the input point, interpolate these eight
      // noise values using the S-curve value as the interpolant (trilinear
      // interpolation.)
      let n0, n1, ix0, ix1, iy0, iy1;

      n0 = NoiseGen.valueNoise3D(x0, y0, z0, seed);
      n1 = NoiseGen.valueNoise3D(x1, y0, z0, seed);
      ix0 = Interpolation.linear(n0, n1, xs);
      n0 = NoiseGen.valueNoise3D(x0, y1, z0, seed);
      n1 = NoiseGen.valueNoise3D(x1, y1, z0, seed);
      ix1 = Interpolation.linear(n0, n1, xs);
      iy0 = Interpolation.linear(ix0, ix1, ys);
      n0 = NoiseGen.valueNoise3D(x0, y0, z1, seed);
      n1 = NoiseGen.valueNoise3D(x1, y0, z1, seed);
      ix0 = Interpolation.linear(n0, n1, xs);
      n0 = NoiseGen.valueNoise3D(x0, y1, z1, seed);
      n1 = NoiseGen.valueNoise3D(x1, y1, z1, seed);
      ix1 = Interpolation.linear(n0, n1, xs);
      iy1 = Interpolation.linear(ix0, ix1, ys);

      return Interpolation.linear(iy0, iy1, zs);

    });
  }

  /**
   * Generates a gradient-coherent-noise value from the coordinates of a
   * three-dimensional input value.
   *
   * @param x The x coordinate of the input value.
   * @param y The y coordinate of the input value.
   * @param z The z coordinate of the input value.
   * @param seed The random number seed.
   * @param quality The quality of the coherent-noise.
   *
   * @returns The generated gradient-coherent-noise value.
   *
   * The return value ranges from -1.0 to +1.0.
   *
   * For an explanation of the difference between *gradient* noise and
   * *value* noise, see the comments for the gradientNoise3D() function.
   */
  public static gradientCoherentNoise3D(x: number, y: number, z: number, seed: number, quality: number): number {
    return NoiseGen.coherentNoise3D(x, y, z, seed, quality, (x0, y0, z0, x1, y1, z1, xs, ys, zs) => {

      // Now calculate the noise values at each vertex of the cube.  To generate
      // the coherent-noise value at the input point, interpolate these eight
      // noise values using the S-curve value as the interpolant (trilinear
      // interpolation.)
      let n0, n1, ix0, ix1, iy0, iy1;

      n0 = NoiseGen.gradientNoise3D(x, y, z, x0, y0, z0, seed);
      n1 = NoiseGen.gradientNoise3D(x, y, z, x1, y0, z0, seed);
      ix0 = Interpolation.linear(n0, n1, xs);
      n0 = NoiseGen.gradientNoise3D(x, y, z, x0, y1, z0, seed);
      n1 = NoiseGen.gradientNoise3D(x, y, z, x1, y1, z0, seed);
      ix1 = Interpolation.linear(n0, n1, xs);
      iy0 = Interpolation.linear(ix0, ix1, ys);
      n0 = NoiseGen.gradientNoise3D(x, y, z, x0, y0, z1, seed);
      n1 = NoiseGen.gradientNoise3D(x, y, z, x1, y0, z1, seed);
      ix0 = Interpolation.linear(n0, n1, xs);
      n0 = NoiseGen.gradientNoise3D(x, y, z, x0, y1, z1, seed);
      n1 = NoiseGen.gradientNoise3D(x, y, z, x1, y1, z1, seed);
      ix1 = Interpolation.linear(n0, n1, xs);
      iy1 = Interpolation.linear(ix0, ix1, ys);

      return Interpolation.linear(iy0, iy1, zs);
    });
  }
}
