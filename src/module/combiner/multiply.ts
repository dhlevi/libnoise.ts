import CombinerModule from './CombinerModule';

/**
 * Noise module that outputs the product of the two output values from
 * two source modules.
 *
 * This noise module requires two source modules.
 */
class Multiply extends CombinerModule {
  public getValue(x: number, y: number, z: number): number {
    return this.sourceModuleA.getValue(x, y, z) * this.sourceModuleB.getValue(x, y, z);
  }
}

export default Multiply;
