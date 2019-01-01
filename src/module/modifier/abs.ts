import ModifierModule from './ModifierModule';

class Abs extends ModifierModule {
  public getValue(x: number, y: number, z: number): number {
    return Math.abs(this.sourceModule.getValue(x, y, z));
  }
}

export default Abs;
