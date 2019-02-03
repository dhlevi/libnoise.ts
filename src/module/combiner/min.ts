import CombinerModule from './CombinerModule';

/**
 * Noise module that outputs the smaller of the two output values from
 * two source modules.
 *
 * This noise module requires two source modules.
 */
class Min extends CombinerModule {
  public getValue(x: number, y: number, z: number): number {
    return Math.min(
      this.sourceModuleA.getValue(x, y, z),
      this.sourceModuleB.getValue(x, y, z),
    );
  }
}

export default Min;
