import Module from '@app/module/Module';

export default abstract class Model {
  /**
   * The noise module that is used to generate the output values.
   */
  public sourceModule: Module;

  /**
   * @param sourceModule The noise module that is used to generate the output values.
   */
  public constructor(sourceModule: Module) {
    if (!sourceModule) {
      throw new Error("Cannot construct Model - sourceModule is required");
    }

    this.sourceModule = sourceModule;
  }
}