import MathConsts from '@app/mathconsts';

class Sphere {
  private sourceModule: any;

  constructor(sourceModule?: any) {
    this.sourceModule = sourceModule || null;
  }

  public getValue(lat: number, lon: number) {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing module!');
    }

    let r: number = Math.cos(MathConsts.DEG_TO_RAD * lat);

    return this.sourceModule.getValue(
      Math.cos(MathConsts.DEG_TO_RAD * lon) * r,
      Math.sin(MathConsts.DEG_TO_RAD * lat),
      Math.sin(MathConsts.DEG_TO_RAD * lon) * r,
    );
  }
}

export default Sphere;
