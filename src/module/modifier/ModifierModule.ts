import Module from "@app/module";

export default abstract class ModifierModule extends Module {
  public sourceModule: Module;

  public constructor(sourceModule: Module) {
    super();

    this.sourceModule = sourceModule;
  }
}