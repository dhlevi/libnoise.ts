import ModifierModule from './ModifierModule';

class Invert extends ModifierModule {
  public getValue(x: number, y: number, z: number): number {
    return -this.sourceModule.getValue(x, y, z);
  }
}

export default Invert;
