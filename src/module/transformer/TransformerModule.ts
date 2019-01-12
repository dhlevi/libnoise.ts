import Module from '@app/module/Module';

/**
 * Transformer modules apply a transformation to the coordinates of
 * the input value before retrieving the output value from the source
 * module.  A transformer module does not modify the output value.
 */
export default abstract class TransformerModule extends Module {
  public sourceModule: Module;

  public constructor(sourceModule: Module) {
    super();

    this.sourceModule = sourceModule;
  }
}