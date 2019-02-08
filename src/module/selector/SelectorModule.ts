import Module from '@app/module/Module';

/**
 * Selector modules use the output value from a *control module*
 * to specify how to combine the output values from its source modules.
 */
export default abstract class SelectorModule extends Module {
  /**
   * Noise module that determines how this Selector module should
   * combine the output from the two source modules.
   */
  public controlModule: Module;
  /**
   * Noise module that is used to generate the output values.
   */
  public sourceModuleA: Module;
  /**
   * Noise module that is used to generate the output values.
   */
  public sourceModuleB: Module;

  /**
   * @param sourceModuleA Noise module that is used to generate the output values.
   * @param sourceModuleB Noise module that is used to generate the output values.
   */
  public constructor(sourceModuleA: Module, sourceModuleB: Module, controlModule: Module) {
    super();

    this.controlModule = controlModule;
    this.sourceModuleA = sourceModuleA;
    this.sourceModuleB = sourceModuleB;
  }
}