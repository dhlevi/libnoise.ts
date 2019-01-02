import Module from '@app/module/Module';
import NoiseMap from '@app/noisemap';

export default abstract class Builder {
  public sourceModule: Module;
  public noiseMap: NoiseMap;

  public constructor(sourceModule: Module, width: number, height: number) {
    this.sourceModule = sourceModule;
    this.noiseMap = new NoiseMap(width, height);
  }

  // Functions
  public abstract build(): NoiseMap;

  public setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  // Properties
  public get width(): number {
    return this.noiseMap.width;
  }
  public set width(width: number) {
    this.noiseMap.width = width;
  }

  public get height(): number {
    return this.noiseMap.height;
  }
  public set height(height: number) {
    this.noiseMap.height = height;
  }
}