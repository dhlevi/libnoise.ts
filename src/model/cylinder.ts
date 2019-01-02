import MathConsts from '@app/mathconsts';
import Model from './Model';

class Cylinder extends Model {
  // @TODO rename to `angleDegrees`
  public getValue(angle: number, y: number): number {
    let i = angle * MathConsts.DEG_TO_RAD;

    return this.sourceModule.getValue(Math.cos(i), y, Math.sin(i));
  }
}

export default Cylinder;
