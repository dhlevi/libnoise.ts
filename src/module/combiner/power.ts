import CombinerModule from './CombinerModule';

/**
 * Noise module that raises the output value from a first source module
 * to the power of the output value from a second source module.
 *
 * This noise module requires two source modules.
 */
class Power extends CombinerModule {
  public getValue(x: number, y: number, z: number): number {
    if (!this.sourceModuleA) {
      throw new Error("Cannot call getValue on power combiner module, sourceModuleA is empty");
    } else if (!this.sourceModuleB) {
      throw new Error("Cannot call getValue on power combiner module, sourceModuleB is empty");
    }

    return Math.pow(
      this.sourceModuleA.getValue(x, y, z),
      this.sourceModuleB.getValue(x, y, z),
    );
  }
}

export default Power;
