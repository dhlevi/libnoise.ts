class Abs {
  private sourceModule: any;

  constructor(sourceModule?: any) {
    this.sourceModule = sourceModule || null;
  }

  public getValue(x: number, y: number, z: number) {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing source module!');
    }

    return Math.abs(this.sourceModule.getValue(x, y, z));
  }
}

export default Abs;
