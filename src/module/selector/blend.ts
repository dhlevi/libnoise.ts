import Interpolation from '@app/interpolation';
import Module from '@app/module/Module';
import SelectorModule from './SelectorModule';


class Blend extends SelectorModule {
  private controlModule: Module;

  constructor(sourceModuleA: Module, sourceModuleB: Module, controlModule: Module) {
    super(sourceModuleA, sourceModuleB);

    this.controlModule = controlModule;
  }

  public getValue(x: number, y: number, z: number): number {
    return Interpolation.linear(
      this.sourceModuleA.getValue(x, y, z),
      this.sourceModuleB.getValue(x, y, z),
      (this.controlModule.getValue(x, y, z) + 1.0) / 2.0,
    );
  }
}

export default Blend;
