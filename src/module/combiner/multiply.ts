import CombinerModule from "./CombinerModule";

class Multiply extends CombinerModule {
  public getValue(x: number, y: number, z: number) {
    return this.sourceModuleA.getValue(x, y, z) * this.sourceModuleB.getValue(x, y, z);
  }
}

export default Multiply;
