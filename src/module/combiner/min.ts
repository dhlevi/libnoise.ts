import CombinerModule from './CombinerModule';

/**
 * Noise module that outputs the smaller of the two output values from
 * two source modules.
 *
 * This noise module requires two source modules.
 */
class Min extends CombinerModule {
  public getValue(x: number, y: number, z: number): number {
    if (!this.sourceModuleA) {
      throw new Error("Cannot call getValue on min combiner module, sourceModuleA is empty");
    } else if (!this.sourceModuleB) {
      throw new Error("Cannot call getValue on min combiner module, sourceModuleB is empty");
    }

    return Math.min(
      this.sourceModuleA.getValue(x, y, z),
      this.sourceModuleB.getValue(x, y, z),
    );
  }
}

export default Min;
