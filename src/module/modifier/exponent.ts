class Exponent {
  private sourceModule: any;
  private exponent: number;

  constructor(sourceModule?: any, exponent?: number) {
    this.sourceModule = sourceModule || null;
    this.exponent = exponent || 1;
  }

  public getValue(x: number, y: number, z: number) {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing source module!');
    }

    return Math.pow(Math.abs((this.sourceModule.getValue(x, y, z) + 1.0) / 2.0), this.exponent) * 2.0 - 1.0;
  }
}

export default Exponent;
