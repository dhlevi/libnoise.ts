class ScaleBias {
  public static DEFAULT_BIAS = 0.0;
  public static DEFAULT_SCALE = 1.0;

  private sourceModule: any;
  private scale: number;
  private bias: number;

  constructor(sourceModule, scale, bias) {
    this.sourceModule = sourceModule || null;
    this.scale = scale || ScaleBias.DEFAULT_SCALE;
    this.bias = bias || ScaleBias.DEFAULT_BIAS;
  }

  getValue(x, y, z) {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing source module!');
    }

    return this.sourceModule.getValue(x, y, z) * this.scale + this.bias;
  }
}

export default ScaleBias;
