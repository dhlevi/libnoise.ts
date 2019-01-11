import ModifierModule from './ModifierModule';

/**
 * Noise module that outputs the absolute value of the output value from
 * a source module.
 *
 * This noise module requires one source module.
 */
class Abs extends ModifierModule {
  public getValue(x: number, y: number, z: number): number {
    return Math.abs(this.sourceModule.getValue(x, y, z));
  }
}

export default Abs;
