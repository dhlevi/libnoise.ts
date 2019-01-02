import Module from '@app/module/Module';
import TransformerModule from './TransformerModule';

class Displace extends TransformerModule {
  private xModule: Module;
  private yModule: Module;
  private zModule: Module;

  constructor(sourceModule: Module, xModule: Module, yModule: Module, zModule: Module) {
    super(sourceModule);

    this.xModule = xModule;
    this.yModule = yModule;
    this.zModule = zModule;
  }

  public getValue(x: number, y: number, z: number): number {
    return this.sourceModule.getValue(
      x + this.xModule.getValue(x, y, z),
      y + this.yModule.getValue(x, y, z),
      z + this.zModule.getValue(x, y, z),
    );
  }
}

export default Displace;
