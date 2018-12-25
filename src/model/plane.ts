class Plane {
  private sourceModule: any;

  constructor(sourceModule) {
    this.sourceModule = sourceModule || null;
  }

  getValue(x, y) {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing module!');
    }

    return this.sourceModule.getValue(x, 0, y);
  }
}

export default Plane;
