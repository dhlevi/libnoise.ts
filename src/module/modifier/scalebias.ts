class ScaleBias {
  public static DEFAULT_BIAS = 0.0;
  public static DEFAULT_SCALE = 1.0;

  private sourceModule: any;
  private scale: number;
  private bias: number;

  constructor(sourceModule?: any, scale?: number, bias?: number) {
    this.sourceModule = sourceModule || null;
    this.scale = scale || ScaleBias.DEFAULT_SCALE;
    this.bias = bias || ScaleBias.DEFAULT_BIAS;
  }

  public getValue(x: number, y: number, z: number) {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing source module!');
    }

    return this.sourceModule.getValue(x, y, z) * this.scale + this.bias;
  }
}

export default ScaleBias;
