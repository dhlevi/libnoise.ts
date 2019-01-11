import ModifierModule from './ModifierModule';

/**
 * Noise module that inverts the output value from a source module.
 *
 * This noise module requires one source module.
 */
class Invert extends ModifierModule {
  public getValue(x: number, y: number, z: number): number {
    return -this.sourceModule.getValue(x, y, z);
  }
}

export default Invert;
