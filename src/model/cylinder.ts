import MathConsts from '@app/mathconsts';

class Cylinder {
  private sourceModule: any;

  constructor(sourceModule?: any) {
    this.sourceModule = sourceModule || null;
  }

  // @TODO rename to `angleDegrees`
  public getValue(angle: number, y: number) {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing module!');
    }

    let i = angle * MathConsts.DEG_TO_RAD;

    return this.sourceModule.getValue(Math.cos(i), y, Math.sin(i));
  }
}

export default Cylinder;
