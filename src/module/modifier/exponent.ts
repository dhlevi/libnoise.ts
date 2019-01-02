import Module from '@app/module/Module';
import ModifierModule from './ModifierModule';

class Exponent extends ModifierModule {
  private exponent: number;

  constructor(sourceModule: Module, exponent?: number) {
    super(sourceModule);

    this.exponent = exponent || 1;
  }

  public getValue(x: number, y: number, z: number): number {
    return Math.pow(Math.abs((this.sourceModule.getValue(x, y, z) + 1.0) / 2.0), this.exponent) * 2.0 - 1.0;
  }
}

export default Exponent;
