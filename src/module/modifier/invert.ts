class Invert {
  private sourceModule: any;

  constructor(sourceModule) {
    this.sourceModule = sourceModule || null;
  }

  public getValue(x, y, z) {
    if (!this.sourceModule) {

      throw new Error('Invalid or missing source module!');

    }

    return -this.sourceModule.getValue(x, y, z);
  }
}

export default Invert;
