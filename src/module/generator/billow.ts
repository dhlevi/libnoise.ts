import NoiseGen from '@app/noisegen';
import { makeInt32Range } from '@app/util';
import GeneratorModule from './GeneratorModule';

/**
 * Noise module that outputs three-dimensional "billowy" noise.
 *
 * This noise module generates "billowy" noise suitable for clouds and
 * rocks.
 *
 * This noise module is nearly identical to Perlin except this noise module
 * modifies each octave with an absolute-value function.  See the
 * documentation of Perlin for more information.
 */
class Billow extends GeneratorModule {
  public static readonly DEFAULT_BILLOW_FREQUENCY = 1.0;
  public static readonly DEFAULT_BILLOW_LACUNARITY = 2.0;
  public static readonly DEFAULT_BILLOW_OCTAVE_COUNT = 6;
  public static readonly DEFAULT_BILLOW_PERSISTENCE = 0.5;
  public static readonly DEFAULT_BILLOW_QUALITY = NoiseGen.QUALITY_STD;
  public static readonly DEFAULT_BILLOW_SEED = 0;

  // @TODO enforce by throwing an error or something
  public static readonly BILLOW_MAX_OCTAVE = 30;

  /**
   * Frequency of the first octave.
   */
  public frequency: number;
  /**
   * Frequency multiplier between successive octaves.
   */
  public lacunarity: number;
  /**
   * Quality of the billowy noise.
   */
  public quality: number;
  /**
   * Total number of octaves that generate the billowy noise.
   */
  public octaves: number;
  /**
   * Persistence value of the billowy noise.
   */
  public persistence: number;
  /**
   * Seed value used by the billowy-noise function.
   */
  public seed: number;

  /**
   * @param frequency Frequency of the first octave.
   * @param lacunarity Frequency multiplier between successive octaves.
   * @param octaves Total number of octaves that generate the billowy noise.
   * @param persistence Persistence value of the billowy noise.
   * @param seed Seed value used by the billowy-noise function.
   * @param quality Quality of the billowy noise.
   */
  constructor(frequency?: number, lacunarity?: number, octaves?: number, persistence?: number, seed?: number, quality?: number) {
    super();

    this.frequency = frequency || Billow.DEFAULT_BILLOW_FREQUENCY;
    this.lacunarity = lacunarity || Billow.DEFAULT_BILLOW_LACUNARITY;
    this.octaves = octaves || Billow.DEFAULT_BILLOW_OCTAVE_COUNT;
    this.persistence = persistence || Billow.DEFAULT_BILLOW_PERSISTENCE;
    this.seed = seed || Billow.DEFAULT_BILLOW_SEED;
    this.quality = quality || Billow.DEFAULT_BILLOW_QUALITY;
  }

  public getValue(x: number, y: number, z: number): number {
    let nx;
    let ny;
    let nz;
    let value = 0.0;
    let signal = 0.0;
    let persist = 1.0;

    x = (x * this.frequency);
    y = (y * this.frequency);
    z = (z * this.frequency);

    for (let octave = 0; octave < this.octaves; octave++) {
      // Make sure that these floating-point values have the same range as a 32-
      // bit integer so that we can pass them to the coherent-noise functions.
      nx = makeInt32Range(x);
      ny = makeInt32Range(y);
      nz = makeInt32Range(z);

      // Get the coherent-noise value from the input value and add it to the final result.
      signal = 2.0 * Math.abs(NoiseGen.gradientCoherentNoise3D(nx, ny, nz, ((this.seed + octave) & 0xffffffff), this.quality)) - 1.0;
      value += signal * persist;

      // Prepare the next octave.
      x *= this.lacunarity;
      y *= this.lacunarity;
      z *= this.lacunarity;
      persist *= this.persistence;
    }

    return value + 0.5;
  }
}

export default Billow;
