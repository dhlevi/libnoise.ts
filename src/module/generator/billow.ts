import NoiseGen from '@app/noisegen';
import MathFuncs from '@app/mathfuncs';

class Billow {
  public static DEFAULT_BILLOW_FREQUENCY = 1.0;
  public static DEFAULT_BILLOW_LACUNARITY = 2.0;
  public static DEFAULT_BILLOW_OCTAVE_COUNT = 6;
  public static DEFAULT_BILLOW_PERSISTENCE = 0.5;
  public static DEFAULT_BILLOW_SEED = 0;
  public static BILLOW_MAX_OCTAVE = 30;

  public frequency: number;
  public lacunarity: number;
  public octaves: number;
  public persist: number;
  public seed: number;
  public quality: number;

  constructor(frequency, lacunarity, octaves, persist, seed, quality) {
    this.frequency = frequency || Billow.DEFAULT_BILLOW_FREQUENCY;
    this.lacunarity = lacunarity || Billow.DEFAULT_BILLOW_LACUNARITY;
    this.octaves = octaves || Billow.DEFAULT_BILLOW_OCTAVE_COUNT;
    this.persist = persist || Billow.DEFAULT_BILLOW_PERSISTENCE;
    this.seed = seed || Billow.DEFAULT_BILLOW_SEED;
    this.quality = quality || NoiseGen.QUALITY_STD;
  }

  getValue(x, y, z) {

    var nx, ny, nz;
    var value = 0.0;
    var signal = 0.0;
    var persist = 1.0;

    x = (x * this.frequency);
    y = (y * this.frequency);
    z = (z * this.frequency);

    for (var octave = 0; octave < this.octaves; octave++) {

      // Make sure that these floating-point values have the same range as a 32-
      // bit integer so that we can pass them to the coherent-noise functions.
      nx = MathFuncs.makeInt32Range(x);
      ny = MathFuncs.makeInt32Range(y);
      nz = MathFuncs.makeInt32Range(z);

      // Get the coherent-noise value from the input value and add it to the final result.
      signal = 2.0 * Math.abs(NoiseGen.gradientCoherentNoise3D(nx, ny, nz, ((this.seed + octave) & 0xffffffff), this.quality)) - 1.0;
      value += signal * persist;

      // Prepare the next octave.
      x *= this.lacunarity;
      y *= this.lacunarity;
      z *= this.lacunarity;
      persist *= this.persist;

    }

    return value + 0.5;
  }
}


export default Billow;