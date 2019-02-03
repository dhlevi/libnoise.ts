import CombinerModule from './CombinerModule';

/**
 * Noise module that raises the output value from a first source module
 * to the power of the output value from a second source module.
 *
 * This noise module requires two source modules.
 */
class Power extends CombinerModule {
  public getValue(x: number, y: number, z: number): number {
    return Math.pow(
      this.sourceModuleA.getValue(x, y, z),
      this.sourceModuleB.getValue(x, y, z),
    );
  }
}

export default Power;
