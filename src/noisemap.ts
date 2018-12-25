class NoiseMap {
  private map: number[];
  private _height: number;
  private _width: number;

  constructor(w, h) {
    this.width = w || 1;
    this.height = h || 1;
    this.map = [];
  }

  get height() {
    return this._height;
  }
  set height(v: number) {
    if (v < 0) {
      throw new Error('Height must be greater than zero.');
    }

    this._height = v;
  }

  get width() {
    return this._width;
  }
  set width(v: number) {
    if (v < 0) {
      throw new Error('Width must be greater than zero.');
    }

    this._width = v;
  }

  addValue(x: number, y: number, v: number) {
    var value = this.getValue(x, y) || 0;

    this.setValue(x, y, value + v);
  }

  getValue(x: number, y: number) {
    return this.map[y * this.width + x];
  }

  setSize(w: number, h: number) {
    this.width = w;
    this.height = h;
  }

  setValue(x: number, y: number, v: number) {
    this.map[y * this.width + x] = v;
  }

  subtractValue(x: number, y: number, v: number) {
    var value = this.getValue(x, y) || 0;

    this.setValue(x, y, value - v);
  }
}

export default NoiseMap;
