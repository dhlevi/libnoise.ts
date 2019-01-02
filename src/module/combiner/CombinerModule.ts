import Module from '@app/module/Module';

export default abstract class CombinerModule extends Module {
  public sourceModuleA: Module;
  public sourceModuleB: Module;

  public constructor(sourceModuleA: Module, sourceModuleB: Module) {
    super();

    this.sourceModuleA = sourceModuleA;
    this.sourceModuleB = sourceModuleB;
  }
}