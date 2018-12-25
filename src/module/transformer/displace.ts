class Displace {
  private sourceModule: any;
  private xModule: any;
  private yModule: any;
  private zModule: any;

  constructor(sourceModule?: any, xModule?: any, yModule?: any, zModule?: any) {
    this.sourceModule = sourceModule || null;
    this.xModule = xModule || null;
    this.yModule = yModule || null;
    this.zModule = zModule || null;
  }

  public getValue(x: number, y: number, z: number) {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing source module!');
    }

    if (!this.xModule || !this.yModule || !this.zModule) {
      throw new Error('Invalid or missing displacement module(s)!');
    }

    return this.sourceModule.getValue(
      x + this.xModule.getValue(x, y, z),
      y + this.yModule.getValue(x, y, z),
      z + this.zModule.getValue(x, y, z),
    );
  }
}

export default Displace;
