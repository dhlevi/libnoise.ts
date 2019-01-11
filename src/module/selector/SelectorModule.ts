import Module from '@app/module/Module';

/**
 * Selector modules use the output value from a *control module*
 * to specify how to combine the output values from its source modules.
 */
export default abstract class SelectorModule extends Module {
  public sourceModuleA: Module;
  public sourceModuleB: Module;

  /**
   * @param sourceModuleA Noise module that is used to generate the output values.
   * @param sourceModuleB Noise module that is used to generate the output values.
   */
  public constructor(sourceModuleA: Module, sourceModuleB: Module) {
    super();

    this.sourceModuleA = sourceModuleA;
    this.sourceModuleB = sourceModuleB;
  }
}