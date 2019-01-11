import Module from '@app/module/Module';

/**
 * Modifier modules mathematically modify the output value from a
 * source module.
 */
export default abstract class ModifierModule extends Module {
  public sourceModule: Module;

  public constructor(sourceModule: Module) {
    super();

    this.sourceModule = sourceModule;
  }
}