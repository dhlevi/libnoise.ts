import MathFuncs from '@app/mathfuncs';
import NoiseGen from '@app/noisegen';
import GeneratorModule from './GeneratorModule';

class Perlin extends GeneratorModule {
  public static DEFAULT_PERLIN_FREQUENCY = 1.0;
  public static DEFAULT_PERLIN_LACUNARITY = 2.0;
  public static DEFAULT_PERLIN_OCTAVE_COUNT = 6;
  public static DEFAULT_PERLIN_PERSISTENCE = 0.5;
  public static DEFAULT_PERLIN_SEED = 0;
  public static PERLIN_MAX_OCTAVE = 30;

  public frequency: number;
  public lacunarity: number;
  public octaves: number;
  public persist: number;
  public seed: number;
  public quality: number;

  constructor(frequency?: number, lacunarity?: number, octaves?: number, persist?: number, seed?: number, quality?: number) {
    super();

    this.frequency = frequency || Perlin.DEFAULT_PERLIN_FREQUENCY;
    this.lacunarity = lacunarity || Perlin.DEFAULT_PERLIN_LACUNARITY;
    this.octaves = octaves || Perlin.DEFAULT_PERLIN_OCTAVE_COUNT;
    this.persist = persist || Perlin.DEFAULT_PERLIN_PERSISTENCE;
    this.seed = seed || Perlin.DEFAULT_PERLIN_SEED;
    this.quality = quality || NoiseGen.QUALITY_STD;
  }

  public getValue(x: number, y: number, z: number) {
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
      nx = MathFuncs.makeInt32Range(x);
      ny = MathFuncs.makeInt32Range(y);
      nz = MathFuncs.makeInt32Range(z);

      // Get the coherent-noise value from the input value and add it to the final result.
      signal = NoiseGen.gradientCoherentNoise3D(nx, ny, nz, ((this.seed + octave) & 0xffffffff), this.quality);
      value += signal * persist;

      // Prepare the next octave.
      x *= this.lacunarity;
      y *= this.lacunarity;
      z *= this.lacunarity;
      persist *= this.persist;
    }

    return value;
  }
}

export default Perlin;
