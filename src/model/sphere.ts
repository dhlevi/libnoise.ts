import MathConsts from '@app/mathconsts';
import Model from './Model';

class Sphere extends Model {
  public getValue(lat: number, lon: number): number {
    let r: number = Math.cos(MathConsts.DEG_TO_RAD * lat);

    return this.sourceModule.getValue(
      Math.cos(MathConsts.DEG_TO_RAD * lon) * r,
      Math.sin(MathConsts.DEG_TO_RAD * lat),
      Math.sin(MathConsts.DEG_TO_RAD * lon) * r,
    );
  }
}

export default Sphere;
