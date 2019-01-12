import Module from '@app/module/Module';

/**
 * Modifier modules mathematically modify the output value from a
 * source module.
 */
export default abstract class ModifierModule extends Module {
  /**
   * The noise module that is used to generate the output values.
   */
  public sourceModule: Module;

  /**
   * @param sourceModule The noise module that is used to generate the output values.
   */
  public constructor(sourceModule: Module) {
    super();

    this.sourceModule = sourceModule;
  }
}