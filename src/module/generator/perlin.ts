import NoiseGen, { Quality } from '@app/noisegen';
import { makeInt32Range } from '@app/util';
import GeneratorModule from './GeneratorModule';

/**
 * Noise module that outputs 3-dimensional Perlin noise.
 *
 * Perlin noise is the sum of several coherent-noise functions of
 * ever-increasing frequencies and ever-decreasing amplitudes.
 *
 * An important property of Perlin noise is that a small change in the
 * input value will produce a small change in the output value, while a
 * large change in the input value will produce a random change in the
 * output value.
 *
 * This noise module outputs Perlin-noise values that usually range from
 * -1.0 to +1.0, but there are no guarantees that all output values will
 * exist within that range.
 *
 * This noise module does not require any source modules.
 *
 * ## Octaves
 *
 * The number of octaves control the amount of detail of the
 * Perlin noise.  Adding more octaves increases the detail of the Perlin
 * noise, but with the drawback of increasing the calculation time.
 *
 * An octave is one of the coherent-noise functions in a series of
 * coherent-noise functions that are added together to form Perlin
 * noise.
 *
 * These coherent-noise functions are called octaves because each octave
 * has, by default, double the frequency of the previous octave.  Musical
 * tones have this property as well; a musical C tone that is one octave
 * higher than the previous C tone has double its frequency.
 *
 * ## Persistence
 *
 * The persistence value controls the roughness of the Perlin
 * noise.  Larger values produce rougher noise.
 *
 * The persistence value determines how quickly the amplitudes diminish
 * for successive octaves.  The amplitude of the first octave is 1.0.
 * The amplitude of each subsequent octave is equal to the product of the
 * previous octave's amplitude and the persistence value.  So a
 * persistence value of 0.5 sets the amplitude of the first octave to
 * 1.0; the second, 0.5; the third, 0.25; etc.
 *
 * ## Lacunarity
 *
 * The lacunarity specifies the frequency multiplier between successive
 * octaves.
 *
 * The effect of modifying the lacunarity is subtle; you may need to play
 * with the lacunarity value to determine the effects.  For best results,
 * set the lacunarity to a number between 1.5 and 3.5.
 *
 * ## References & acknowledgements
 *
 * [The Noise Machine](http://www.noisemachine.com/talk1) -
 * From the master, Ken Perlin himself.  This page contains a
 * presentation that describes Perlin noise and some of its variants.
 * He won an Oscar for creating the Perlin noise algorithm!
 *
 * [Perlin Noise](http://freespace.virgin.net/hugo.elias/models/m_perlin.htm) -
 * Hugo Elias's webpage contains a very good
 * description of Perlin noise and describes its many applications.  This
 * page gave me the inspiration to create libnoise in the first place.
 * Now that I know how to generate Perlin noise, I will never again use
 * cheesy subdivision algorithms to create terrain (unless I absolutely
 * need the speed.)
 *
 * [The Perlin noise math FAQ](http://www.robo-murito.net/code/perlin-noise-math-faq.html) -
 * A good page that describes Perlin noise in
 * plain English with only a minor amount of math.  During development of
 * libnoise, I noticed that my coherent-noise function generated terrain
 * with some "regularity" to the terrain features.  This page describes a
 * better coherent-noise function called gradient noise.  This
 * version of noise::module::Perlin uses gradient coherent noise to
 * generate Perlin noise.
 */
class Perlin extends GeneratorModule {
  public static readonly DEFAULT_PERLIN_FREQUENCY = 1.0;
  public static readonly DEFAULT_PERLIN_LACUNARITY = 2.0;
  public static readonly DEFAULT_PERLIN_OCTAVE_COUNT = 6;
  public static readonly DEFAULT_PERLIN_PERSISTENCE = 0.5;
  public static readonly DEFAULT_PERLIN_QUALITY = Quality.Standard;
  public static readonly DEFAULT_PERLIN_SEED = 0;
  public static readonly PERLIN_MAX_OCTAVE = 30;

  /**
   * Frequency of the first octave.
   */
  public frequency: number;
  /**
   * Frequency multiplier between successive octaves.
   */
  public lacunarity: number;
  /**
   * Quality of the Perlin noise.
   */
  public quality: number;

  /**
   * Persistence of the Perlin noise.
   */
  public persistence: number;
  /**
   * Seed value used by the Perlin-noise function.
   */
  public seed: number;

  private _octaves: number = Perlin.DEFAULT_PERLIN_OCTAVE_COUNT;

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

    this.frequency = frequency || Perlin.DEFAULT_PERLIN_FREQUENCY;
    this.lacunarity = lacunarity || Perlin.DEFAULT_PERLIN_LACUNARITY;
    this.octaves = octaves || Perlin.DEFAULT_PERLIN_OCTAVE_COUNT;
    this.persistence = persistence || Perlin.DEFAULT_PERLIN_PERSISTENCE;
    this.seed = seed || Perlin.DEFAULT_PERLIN_SEED;
    this.quality = quality || Perlin.DEFAULT_PERLIN_QUALITY;
  }

  /**
   * Total number of octaves that generate the billowy noise.
   */
  public get octaves(): number {
    return this._octaves;
  }
  public set octaves(value: number) {
    if (value > Perlin.PERLIN_MAX_OCTAVE) {
      throw new Error(`Cannot set octaves greater than maximum of ${Perlin.PERLIN_MAX_OCTAVE}`);
    }

    this._octaves = value;
  }

  public getValue(x: number, y: number, z: number): number {
    let nx, ny, nz;
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
      signal = NoiseGen.gradientCoherentNoise3D(nx, ny, nz, ((this.seed + octave) & 0xffffffff), this.quality);
      value += signal * persist;

      // Prepare the next octave.
      x *= this.lacunarity;
      y *= this.lacunarity;
      z *= this.lacunarity;
      persist *= this.persistence;
    }

    return value;
  }
}

export default Perlin;
