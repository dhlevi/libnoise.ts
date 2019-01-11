import Module from '@app/module/Module';

/**
 * Base class for combiner modules.
 * Combiner modules mathematically combine the output values from two
 * or more source modules together.
 */
export default abstract class CombinerModule extends Module {
  public sourceModuleA: Module;
  public sourceModuleB: Module;

  public constructor(sourceModuleA: Module, sourceModuleB: Module) {
    super();

    this.sourceModuleA = sourceModuleA;
    this.sourceModuleB = sourceModuleB;
  }
}