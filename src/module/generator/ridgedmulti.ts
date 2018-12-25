import NoiseGen from '@app/noisegen';
import MathFuncs from '@app/mathfuncs';
import Misc from '@app/misc';

class RidgedMulti {

  public static DEFAULT_RIDGED_FREQUENCY = 1.0;
  public static DEFAULT_RIDGED_LACUNARITY = 2.0;
  public static DEFAULT_RIDGED_OCTAVE_COUNT = 6;
  public static DEFAULT_RIDGED_SEED = 0;
  public static DEFAULT_RIDGED_OFFSET = 1.0;
  public static DEFAULT_RIDGED_GAIN = 2.0;
  public static RIDGED_MAX_OCTAVE = 30;

  public frequency: number;
  public octaves: number;
  public seed: number;
  public quality: number;
  public offset: number;
  public gain: number;
  public _lacunarity: number;
  public weights: number[];

  constructor(frequency, lacunarity, octaves, seed, quality, offset, gain) {

    this.frequency = frequency || RidgedMulti.DEFAULT_RIDGED_FREQUENCY;
    this.lacunarity = lacunarity || RidgedMulti.DEFAULT_RIDGED_LACUNARITY;
    this.octaves = octaves || RidgedMulti.DEFAULT_RIDGED_OCTAVE_COUNT;
    this.seed = seed || RidgedMulti.DEFAULT_RIDGED_SEED;
    this.quality = quality || NoiseGen.QUALITY_STD;
    this.offset = offset || RidgedMulti.DEFAULT_RIDGED_OFFSET;
    this.gain = gain || RidgedMulti.DEFAULT_RIDGED_GAIN;
  }


  get lacunarity() {
    return this._lacunarity;
  }

  set lacunarity(v) {
    this._lacunarity = v;

    var h = 1.0;
    var frequency = 1.0;

    this.weights = [];

    for (var i = 0; i < RidgedMulti.RIDGED_MAX_OCTAVE; i++) {

      // Compute weight for each frequency.
      this.weights[i] = Math.pow(frequency, -h);
      frequency *= this.lacunarity;

    }
  }

  getValue(x, y, z) {

    var nx, ny, nz, seed;

    var value = 0.0;
    var signal = 0.0;
    var weight = 1.0;

    x = (x * this.frequency);
    y = (y * this.frequency);
    z = (z * this.frequency);

    for (var octave = 0; octave < this.octaves; octave++) {

      // Make sure that these floating-point values have the same range as a 32-
      // bit integer so that we can pass them to the coherent-noise functions.
      nx = MathFuncs.makeInt32Range(x);
      ny = MathFuncs.makeInt32Range(y);
      nz = MathFuncs.makeInt32Range(z);

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
      weight = Misc.clampValue(weight, 0.0, 1.0);

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
