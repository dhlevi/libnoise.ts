import NoiseGen, { Quality } from '@app/noisegen';
import { clamp, makeInt32Range } from '@app/util';
import GeneratorModule from './GeneratorModule';

/**
 * Noise module that outputs 3-dimensional ridged-multifractal noise.
 *
 * This noise module, heavily based on the Perlin-noise module, generates
 * ridged-multifractal noise.  Ridged-multifractal noise is generated in
 * much of the same way as Perlin noise, except the output of each octave
 * is modified by an absolute-value function.  Modifying the octave
 * values in this way produces ridge-like formations.
 *
 * Ridged-multifractal noise does not use a persistence value.  This is
 * because the persistence values of the octaves are based on the values
 * generated from from previous octaves, creating a feedback loop (or
 * that's what it looks like after reading the code.)
 *
 * This noise module outputs ridged-multifractal-noise values that
 * usually range from -1.0 to +1.0, but there are no guarantees that all
 * output values will exist within that range.
 *
 * @note For ridged-multifractal noise generated with only one octave,
 * the output value ranges from -1.0 to 0.0.
 *
 * Ridged-multifractal noise is often used to generate craggy mountainous
 * terrain or marble-like textures.
 *
 * This noise module does not require any source modules.
 *
 * ## Octaves
 *
 * The number of octaves control the *amount of detail* of the
 * ridged-multifractal noise.  Adding more octaves increases the detail
 * of the ridged-multifractal noise, but with the drawback of increasing
 * the calculation time.
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
 * ## References & Acknowledgments
 *
 * [F. Kenton "Doc Mojo" Musgrave's texturing page](http://www.texturingandmodeling.com/Musgrave.html) -
 * This page contains links to source code that generates ridged-multifractal noise, among
 * other types of noise.  The source file [fractal.c](http://www.texturingandmodeling.com/CODE/MUSGRAVE/CLOUD/fractal.c)
 * contains the code I used in my ridged-multifractal class (see the RidgedMultifractal() function.)
 * This code was written by F. Kenton Musgrave, the person who created [MojoWorld](http://www.pandromeda.com).
 * He is also one of the authors in *Texturing and Modeling: A Procedural Approach*
 * (Morgan Kaufmann, 2002. ISBN 1-55860-848-6.)
 */
class RidgedMulti extends GeneratorModule {
  public static readonly DEFAULT_RIDGED_FREQUENCY = 1.0;
  public static readonly DEFAULT_RIDGED_LACUNARITY = 2.0;
  public static readonly DEFAULT_RIDGED_OCTAVE_COUNT = 6;
  public static readonly DEFAULT_RIDGED_QUALITY = Quality.Standard;
  public static readonly DEFAULT_RIDGED_SEED = 0;
  public static readonly DEFAULT_RIDGED_OFFSET = 1.0;
  public static readonly DEFAULT_RIDGED_GAIN = 2.0;
  public static readonly RIDGED_MAX_OCTAVE = 30;

  /**
   * Frequency of the first octave.
   */
  public frequency: number;
  /**
   * Quality of the ridged-multifractal noise.
   */
  public quality: number;
  /**
   * Total number of octaves that generate the ridged-multifractal noise.
   */
  public octaves: number;
  /**
   * Seed value used by the ridged-multifractal-noise function.
   */
  public seed: number;
  /**
   * Offset used when generating ridged-multifractal noise.
   */
  public offset: number;
  /**
   * Gain used when generating ridged-multifractal noise.
   */
  public gain: number;

  private _lacunarity: number = RidgedMulti.DEFAULT_RIDGED_LACUNARITY;
  /**
   * Contains the spectral weights for each octave.
   */
  private weights: number[] = [];

  /**
   * @param frequency Frequency of the first octave.
   * @param lacunarity Frequency multiplier between successive octaves.
   * @param octaves Total number of octaves that generate the billowy noise.
   * @param seed Seed value used by the billowy-noise function.
   * @param quality Quality of the billowy noise.
   * @param offset Offset used when generating ridged-multifractal noise.
   * @param gain Gain used when generating ridged-multifractal noise.
   */
  constructor(frequency?: number, lacunarity?: number, octaves?: number, seed?: number, quality?: number, offset?: number, gain?: number) {
    super();

    this.frequency = frequency || RidgedMulti.DEFAULT_RIDGED_FREQUENCY;
    this.lacunarity = lacunarity || RidgedMulti.DEFAULT_RIDGED_LACUNARITY;
    this.octaves = octaves || RidgedMulti.DEFAULT_RIDGED_OCTAVE_COUNT;
    this.seed = seed || RidgedMulti.DEFAULT_RIDGED_SEED;
    this.quality = quality || RidgedMulti.DEFAULT_RIDGED_QUALITY;
    this.offset = offset || RidgedMulti.DEFAULT_RIDGED_OFFSET;
    this.gain = gain || RidgedMulti.DEFAULT_RIDGED_GAIN;
  }

  /**
   * Frequency multiplier between successive octaves.
   */
  public get lacunarity(): number {
    return this._lacunarity;
  }
  public set lacunarity(v: number) {
    this._lacunarity = v;

    let h = 1.0;
    let frequency = 1.0;

    this.weights = [];

    for (let i = 0; i < RidgedMulti.RIDGED_MAX_OCTAVE; i++) {
      // Compute weight for each frequency.
      this.weights[i] = Math.pow(frequency, -h);
      frequency *= this.lacunarity;
    }
  }

  public getValue(x: number, y: number, z: number): number {
    let nx;
    let ny;
    let nz;
    let seed;

    let value = 0.0;
    let signal = 0.0;
    let weight = 1.0;

    x = (x * this.frequency);
    y = (y * this.frequency);
    z = (z * this.frequency);

    for (let octave = 0; octave < this.octaves; octave++) {
      // Make sure that these floating-point values have the same range as a 32-
      // bit integer so that we can pass them to the coherent-noise functions.
      nx = makeInt32Range(x);
      ny = makeInt32Range(y);
      nz = makeInt32Range(z);

      // Get the coherent-noise value.
      seed = (this.seed + octave) & 0x7fffffff;
      signal = NoiseGen.gradientCoherentNoise3D(nx, ny, nz, seed, this.quality);

      // Make the ridges.
      signal = Math.abs(signal);
      signal = this.offset - signal;

      // Square the signal to increase the sharpness of the ridges.
      signal *= signal;

      // The weighting from the previous octave is applied to the signal.
      // Larger values have higher weights, producing sharp points along the
      // ridges.
      signal *= weight;

      // Weight successive contributions by the previous signal.
      weight = signal * this.gain;

      // Clamp value to within 0 and 1
      weight = clamp(weight, 0.0, 1.0);

      // Add the signal to the output value.
      value += (signal * this.weights[octave]);

      // Go to the next octave.
      x *= this.lacunarity;
      y *= this.lacunarity;
      z *= this.lacunarity;
    }

    return (value * 1.25) - 1.0;
  }
}

export default RidgedMulti;
