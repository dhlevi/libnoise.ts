import { Abs, Cache, Clamp, Curve, Exponent, Invert, ScaleBias, Terrace } from "./modifier";
import { Add, Max, Min, Multiply, Power } from "./combiner";
import { Blend, Select } from "./selector";
import { Tuple } from "@app/util";
import { Displace, RotatePoint, ScalePoint, TranslatePoint, Turbulence } from "./transformer";
import NoiseMapBuilderSphere from "@app/builders/sphere";
import NoiseMapBuilderPlane from "@app/builders/plane";
import NoiseMapBuilderCylinder from "@app/builders/cylinder";
import NoiseMap from "@app/noisemap";

export default abstract class Module {
  // Functions
  /**
   * Generates an output value given the coordinates of the specified
   * input value.
   *
   * @param x The x coordinate of the input value.
   * @param y The y coordinate of the input value.
   * @param z The z coordinate of the input value.
   *
   * @returns The output value.
   */
  public abstract getValue(x: number, y: number, z: number): number;

  sphericalModel(width: number, height: number, eastLonBound: number, northLatBound: number, southLatBound: number, westLonBound: number): NoiseMap {
    let map = new NoiseMapBuilderSphere(this, width, height);
    map.setBounds(southLatBound, northLatBound, westLonBound, eastLonBound);

    return map.build();
  }

  planarModel(width: number, height: number, lowerXBound: number = 0, lowerZBound: number = 0, upperXBound: number = 1, upperZBound: number = 1, isSeamless: boolean = false): NoiseMap {
    let map = new NoiseMapBuilderPlane(this, width, height, isSeamless);
    map.setBounds(lowerXBound, lowerZBound, upperXBound, upperZBound);
    return map.build();
  }

  cylindricalModel(width: number, height: number, lowerAngleBound: number = 0, lowerHeightBound: number = 0, upperAngleBound: number = 1, upperHeightBound: number = 1): NoiseMap {
    let map = new NoiseMapBuilderCylinder(this, width, height);
    map.setBounds(lowerAngleBound, lowerHeightBound, upperAngleBound, upperHeightBound);
    return map.build();
  }

  abs() {
    return new Abs(this);
  }

  add(sourceModuleB: Module) {
      return new Add(this, sourceModuleB);
  }

  blend(sourceModuleB: Module, controlModule: Module) {
    return new Blend(this, sourceModuleB, controlModule);
  }

  cache() {
    return new Cache(this);
  }

  clamp(lowerBound?: number, upperBound?: number) {
      return new Clamp(this, lowerBound, upperBound);
  }

  curve(controlPoints?: Tuple<number>[]) {
      return new Curve(this, controlPoints);
  }

  displace(xModule: Module, yModule: Module, zModule: Module) {
    return new Displace(this, xModule, yModule, zModule);
  }

  exponent(exponent?: number) {
      return new Exponent(this, exponent);
  }

  invert() {
      return new Invert(this);
  }

  max(sourceModuleB: Module) {
      return new Max(this, sourceModuleB);
  }

  min(sourceModuleB: Module) {
      return new Min(this, sourceModuleB);
  }

  multiply(sourceModuleB: Module) {
      return new Multiply(this, sourceModuleB);
  }

  power(sourceModuleB: Module) {
      return new Power(this, sourceModuleB);
  }

  rotate(xAngle?: number, yAngle?: number, zAngle?: number) {
    return new RotatePoint(this, xAngle, yAngle, zAngle);
  }

  select(sourceModuleB: Module, controlModule: Module, edge?: number, lowerBound?: number, upperBound?: number) {
    return new Select(this, sourceModuleB, controlModule, edge, lowerBound, upperBound);
  }

  scale(xScale?: number, yScale?: number, zScale?: number) {
    return new ScalePoint(this, xScale, yScale, zScale);
  }

  scaleBias(scale?: number, bias?: number) {
      return new ScaleBias(this, scale, bias);
  }

  terrace(controlPoints?: number[], invert?: boolean) {
      return new Terrace(this, controlPoints, invert);
  }

  translate(translateX?: number, translateY?: number, translateZ?: number) {
    return new TranslatePoint(this, translateX, translateY, translateZ);
  }

  turbulence(frequency?: number, power?: number, roughness?: number, seed?: number) {
    return new Turbulence(this, frequency, power, roughness, seed);
  }
}