import Module from "@app/module";

export default abstract class Model {
  public sourceModule: Module;

  public constructor(sourceModule: Module) {
    this.sourceModule = sourceModule;
  }
}