import Module from '@app/module/Module';

/**
 * Transformer modules apply a transformation to the coordinates of
 * the input value before retrieving the output value from the source
 * module.  A transformer module does not modify the output value.
 */
export default abstract class TransformerModule extends Module {
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