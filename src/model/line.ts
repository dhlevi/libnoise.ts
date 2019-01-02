import Module from '@app/module/Module';
import Model from './Model';

class Line extends Model {
  private attenuate: boolean;
  // @TODO convert to a matrix
  private x0: number;
  private x1: number;
  private y0: number;
  private y1: number;
  private z0: number;
  private z1: number;

  constructor(sourceModule: Module) {
    super(sourceModule);

    this.attenuate = true;
    this.x0 = 0.0;
    this.x1 = 1.0;
    this.y0 = 0.0;
    this.y1 = 1.0;
    this.z0 = 0.0;
    this.z1 = 1.0;
  }

  public getValue(p: number): number {
    // @TODO probably validate 0 < p < 1

    let value = this.sourceModule.getValue(
      (this.x1 - this.x0) * p + this.x0,
      (this.y1 - this.y0) * p + this.y0,
      (this.z1 - this.z0) * p + this.z0,
    );

    return this.attenuate ? (p * (1.0 - p) * 4 * value) : value;
  }
}

export default Line;
