import CombinerModule from "./CombinerModule";

class Max extends CombinerModule {
  public getValue(x: number, y: number, z: number) {
    return Math.max(
      this.sourceModuleA.getValue(x, y, z),
      this.sourceModuleB.getValue(x, y, z),
    );
  }
}

export default Max;
