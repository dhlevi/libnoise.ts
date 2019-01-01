import CombinerModule from "./CombinerModule";

class Power extends CombinerModule {
  public getValue(x: number, y: number, z: number) {
    return Math.pow(
      this.sourceModuleA.getValue(x, y, z),
      this.sourceModuleB.getValue(x, y, z),
    );
  }
}

export default Power;
