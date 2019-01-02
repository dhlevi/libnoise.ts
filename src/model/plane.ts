import Model from './Model';

class Plane extends Model {
  public getValue(x: number, y: number): number {
    return this.sourceModule.getValue(x, 0, y);
  }
}

export default Plane;
