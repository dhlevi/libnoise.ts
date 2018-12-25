class NoiseMap {
  private map: number[];
  private _height: number;
  private _width: number;

  constructor(w?: number, h?: number) {
    this.width = w || 1;
    this.height = h || 1;
    this.map = [];
  }

  public get height() {
    return this._height;
  }
  public set height(v: number) {
    if (v < 0) {
      throw new Error('Height must be greater than zero.');
    }

    this._height = v;
  }

  public get width() {
    return this._width;
  }
  public set width(v: number) {
    if (v < 0) {
      throw new Error('Width must be greater than zero.');
    }

    this._width = v;
  }

  public addValue(x: number, y: number, v: number) {
    let value = this.getValue(x, y) || 0;

    this.setValue(x, y, value + v);
  }

  public getValue(x: number, y: number) {
    return this.map[y * this.width + x];
  }

  public setSize(w: number, h: number) {
    this.width = w;
    this.height = h;
  }

  public setValue(x: number, y: number, v: number) {
    this.map[y * this.width + x] = v;
  }

  public subtractValue(x: number, y: number, v: number) {
    let value = this.getValue(x, y) || 0;

    this.setValue(x, y, value - v);
  }
}

export default NoiseMap;
