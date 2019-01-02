class NoiseMap {
  public static readonly DEFAULT_NOISEMAP_HEIGHT = 1;
  public static readonly DEFAULT_NOISEMAP_WIDTH = 1;

  private map: number[];
  private _height: number = NoiseMap.DEFAULT_NOISEMAP_HEIGHT;
  private _width: number = NoiseMap.DEFAULT_NOISEMAP_WIDTH;

  constructor(w?: number, h?: number) {
    this.width = w || NoiseMap.DEFAULT_NOISEMAP_WIDTH;
    this.height = h || NoiseMap.DEFAULT_NOISEMAP_HEIGHT;
    this.map = [];
  }

  public get height() {
    return this._height;
  }
  public set height(v: number) {
    if (v <= 0) {
      throw new Error('Height must be greater than zero.');
    }

    this._height = v;
  }

  public get width() {
    return this._width;
  }
  public set width(v: number) {
    if (v <= 0) {
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
