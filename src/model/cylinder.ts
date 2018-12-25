import MathConsts from '@app/mathconsts';

class Cylinder {
  private sourceModule: any;

  constructor(sourceModule) {
    this.sourceModule = sourceModule || null;
  }

  getValue(angle: number, y: number) {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing module!');
    }

    var i = angle * MathConsts.DEG_TO_RAD;

    return this.sourceModule.getValue(Math.cos(i), y, Math.sin(i));
  }
}

export default Cylinder;
