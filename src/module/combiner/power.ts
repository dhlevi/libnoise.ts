class Power {
  private sourceModules: any[];

  constructor(sourceModules?: any[]) {
    this.sourceModules = sourceModules || null;
  }

  public getValue(x: number, y: number, z: number) {
    if (this.sourceModules.length < 2) {
      throw new Error('Invalid or missing source module!');
    }

    return Math.pow(
      this.sourceModules[0].getValue(x, y, z),
      this.sourceModules[1].getValue(x, y, z),
    );
  }
}

export default Power;
