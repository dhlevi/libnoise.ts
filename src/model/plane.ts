class Plane {
  private sourceModule: any;

  constructor(sourceModule?: any) {
    this.sourceModule = sourceModule || null;
  }

  public getValue(x: number, y: number) {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing module!');
    }

    return this.sourceModule.getValue(x, 0, y);
  }
}

export default Plane;
