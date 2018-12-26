import Interpolation from '@app/interpolation';
import Plane from '@app/model/plane';
import NoiseMap from '@app/noisemap';

class NoiseMapBuilderPlane {
  private sourceModule: any;
  private width: number;
  private height: number;
  private seamless: boolean;
  private noiseMap: NoiseMap;
  private _lowerXBound: number;
  private _lowerYBound: number;
  private _upperXBound: number;
  private _upperYBound: number;

  constructor(sourceModule?: any, width?: number, height?: number, seamless?: boolean) {
    this.sourceModule = sourceModule || null;
    this.width = width || 256;
    this.height = height || 256;
    this.seamless = seamless || false;

    this.lowerXBound = 0.0;
    this.lowerYBound = 0.0;
    this.upperXBound = 1.0;
    this.upperYBound = 1.0;

    this.noiseMap = new NoiseMap(this.width, this.height);
  }

  public get lowerXBound() {
    return this._lowerXBound;
  }
  public set lowerXBound(v: number) {
    if (v >= this.upperXBound) {
      throw new Error('Lower X bound cannot be equal to or exceed upper X bound!');
    }

    this._lowerXBound = v;
  }

  public get lowerYBound() {
    return this._lowerYBound;
  }
  public set lowerYBound(v: number) {
    if (v >= this.upperYBound) {
      throw new Error('Lower Y bound cannot be equal to or exceed upper Y bound!');
    }

    this._lowerYBound = v;
  }

  public get upperXBound() {
    return this._upperXBound;
  }
  public set upperXBound(v: number) {
    if (v <= this.lowerXBound) {
      throw new Error('Upper X bound cannot be equal to or less than lower X bound!');
    }

    this._upperXBound = v;
  }

  public get upperYBound() {
    return this._upperYBound;
  }
  public set upperYBound(v: number) {
    if (v <= this.lowerYBound) {
      throw new Error('Upper Y bound cannot be equal to or less than lower Y bound!');
    }

    this._upperYBound = v;
  }

  public build() {
    let xExtent = this.upperXBound - this.lowerXBound;
    let yExtent = this.upperYBound - this.lowerYBound;

    if (xExtent < 0 || yExtent < 0) {

      throw new Error('Invalid bounds!');

    }

    if (!this.sourceModule) {

      throw new Error('Invalid or missing module!');

    }

    // Create the plane model.
    let plane = new Plane(this.sourceModule);
    let xDelta = xExtent / this.width;
    let yDelta = yExtent / this.height;
    let curX = this.lowerXBound;
    let curY = this.lowerYBound;
    let value;
    let xBlend;

    // Fill every point in the noise map with the output values from the model.
    for (let y = 0; y < this.height; y++) {

      curX = this.lowerXBound;

      for (let x = 0; x < this.width; x++) {

        if (!this.seamless) {

          value = plane.getValue(curX, curY);

        } else {

          xBlend = 1.0 - ((curX - this.lowerXBound) / xExtent);

          value = Interpolation.linear(
            Interpolation.linear(
              plane.getValue(curX, curY),
              plane.getValue(curX + xExtent, curY),
              xBlend,
            ),
            Interpolation.linear(
              plane.getValue(curX, curY + yExtent),
              plane.getValue(curX + xExtent, curY + yExtent),
              xBlend,
            ),
            1.0 - ((curY - this.lowerYBound) / yExtent),
          );
        }

        this.noiseMap.setValue(x, y, value);

        curX += xDelta;

      }

      curY += yDelta;

    }

    return this.noiseMap;
  }

  public setBounds(lowerXBound: number, lowerYBound: number, upperXBound: number, upperYBound: number) {
    this.upperXBound = upperXBound;
    this.upperYBound = upperYBound;
    this.lowerXBound = lowerXBound;
    this.lowerYBound = lowerYBound;
  }
}

export default NoiseMapBuilderPlane;
