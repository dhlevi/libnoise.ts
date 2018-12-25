import Perlin from '@app/module/generator/perlin';

class Turbulence {
  public static DEFAULT_TURBULENCE_POWER = 1.0;
  public static DEFAULT_TURBULENCE_ROUGHNESS = 3;

  private sourceModule: any;
  private xDistortModule: Perlin;
  private yDistortModule: Perlin;
  private zDistortModule: Perlin;
  private power: number;

  constructor(sourceModule, frequency: number, power: number, roughness: number, seed: number) {
    this.xDistortModule = new Perlin();
    this.yDistortModule = new Perlin();
    this.zDistortModule = new Perlin();
    this.sourceModule = sourceModule || null;
    this.frequency = frequency || Perlin.DEFAULT_PERLIN_FREQUENCY;
    this.power = power || Turbulence.DEFAULT_TURBULENCE_POWER;
    this.roughness = roughness || Turbulence.DEFAULT_TURBULENCE_ROUGHNESS;
    this.seed = seed || Perlin.DEFAULT_PERLIN_SEED;
  }

  get frequency() {
    return this.xDistortModule.frequency;
  }
  set frequency(v) {
    this.xDistortModule.frequency = v;
    this.yDistortModule.frequency = v;
    this.zDistortModule.frequency = v;
  }

  get roughness() {
    return this.xDistortModule.octaves;
  }
  set roughness(v) {
    this.xDistortModule.octaves = v;
    this.yDistortModule.octaves = v;
    this.zDistortModule.octaves = v;
  }

  get seed() {
    return this.xDistortModule.seed;
  }
  set seed(v) {
    this.xDistortModule.seed = v;
    this.yDistortModule.seed = v + 1;
    this.zDistortModule.seed = v + 2;
  }

  getValue(x: number, y: number, z: number) {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing source module!');
    }

    // Get the values from the three Perlin noise modules and
    // add each value to each coordinate of the input value.  There are also
    // some offsets added to the coordinates of the input values.  This prevents
    // the distortion modules from returning zero if the (x, y, z) coordinates,
    // when multiplied by the frequency, are near an integer boundary.  This is
    // due to a property of gradient coherent noise, which returns zero at
    // integer boundaries.
    var x0 = (x + (12414.0 / 65536.0));
    var y0 = (y + (65124.0 / 65536.0));
    var z0 = (z + (31337.0 / 65536.0));
    var x1 = (x + (26519.0 / 65536.0));
    var y1 = (y + (18128.0 / 65536.0));
    var z1 = (z + (60493.0 / 65536.0));
    var x2 = (x + (53820.0 / 65536.0));
    var y2 = (y + (11213.0 / 65536.0));
    var z2 = (z + (44845.0 / 65536.0));

    // Retrieve the output value at the offsetted input value instead of the original input value.
    return this.sourceModule.getValue(
      (x + (this.xDistortModule.getValue(x0, y0, z0) * this.power)),
      (y + (this.yDistortModule.getValue(x1, y1, z1) * this.power)),
      (z + (this.zDistortModule.getValue(x2, y2, z2) * this.power))
    );
  }
}

export default Turbulence;
