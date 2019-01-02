import CombinerModule from "./CombinerModule";

class Min extends CombinerModule {
  public getValue(x: number, y: number, z: number): number {
    return Math.min(
      this.sourceModuleA.getValue(x, y, z),
      this.sourceModuleB.getValue(x, y, z),
    );
  }
}

export default Min;
