import Module from '@app/module/Module';

/**
 * Base class for combiner modules.
 * Combiner modules mathematically combine the output values from two
 * or more source modules together.
 */
export default abstract class CombinerModule extends Module {
  /**
   * The first noise module that is used to generate output values.
   */
  public sourceModuleA: Module;
  /**
   * The second noise module that is used to generate output values.
   */
  public sourceModuleB: Module;

  /**
   * @param sourceModuleA The first noise module that is used to generate the output values.
   * @param sourceModuleB The second noise module that is used to generate the output values.
   */
  public constructor(sourceModuleA: Module, sourceModuleB: Module) {
    super();

    if (!sourceModuleA) {
      throw new Error("Cannot construct Model - sourceModuleA is required");
    } else if (!sourceModuleB) {
      throw new Error("Cannot construct Model - sourceModuleB is required");
    }

    this.sourceModuleA = sourceModuleA;
    this.sourceModuleB = sourceModuleB;
  }
}