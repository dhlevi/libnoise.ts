class Abs {
  sourceModule: any;

  constructor(sourceModule) {
    this.sourceModule = sourceModule || null;
  }

  getValue(x, y, z) {

    if (!this.sourceModule) {

      throw new Error('Invalid or missing source module!');

    }

    return Math.abs(this.sourceModule.getValue(x, y, z));
  }
}

export default Abs;
