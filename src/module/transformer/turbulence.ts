import Perlin from '@app/module/generator/perlin';
import Module from '@app/module/Module';
import TransformerModule from './TransformerModule';

/**
 * Noise module that randomly displaces the input value before
 * returning the output value from a source module.
 *
 * Turbulence is the pseudo-random displacement of the input value.
 * The getValue() method randomly displaces the ( x, y, z )
 * coordinates of the input value before retrieving the output value from
 * the source module.  To control the turbulence, an application can
 * modify its frequency, its power, and its roughness.
 *
 * The frequency of the turbulence determines how rapidly the
 * displacement amount changes.
 *
 * The power of the turbulence determines the scaling factor that is
 * applied to the displacement amount.
 *
 * The roughness of the turbulence determines the roughness of the
 * changes to the displacement amount.  Low values smoothly change the
 * displacement amount.  High values roughly change the displacement
 * amount, which produces more "kinky" changes.
 *
 * Use of this noise module may require some trial and error.  Assuming
 * that you are using a generator module as the source module, you
 * should first:
 * - Set the frequency to the same frequency as the source module.
 * - Set the power to the reciprocal of the frequency.
 *
 * From these initial frequency and power values, modify these values
 * until this noise module produce the desired changes in your terrain or
 * texture.  For example:
 * - Low frequency (1/8 initial frequency) and low power (1/8 initial
 *   power) produces very minor, almost unnoticeable changes.
 * - Low frequency (1/8 initial frequency) and high power (8 times
 *   initial power) produces "ropey" lava-like terrain or marble-like
 *   textures.
 * - High frequency (8 times initial frequency) and low power (1/8
 *   initial power) produces a noisy version of the initial terrain or
 *   texture.
 * - High frequency (8 times initial frequency) and high power (8 times
 *   initial power) produces nearly pure noise, which isn't entirely
 *   useful.
 *
 * Displacing the input values result in more realistic terrain and
 * textures.  If you are generating elevations for terrain height maps,
 * you can use this noise module to produce more realistic mountain
 * ranges or terrain features that look like flowing lava rock.  If you
 * are generating values for textures, you can use this noise module to
 * produce realistic marble-like or "oily" textures.
 *
 * Internally, there are three Perlin noise modules
 * that displace the input value; one for the x, one for the y,
 * and one for the z coordinate.
 *
 * This noise module requires one source module.
 */
class Turbulence extends TransformerModule {
  public static readonly DEFAULT_TURBULENCE_POWER = 1.0;
  public static readonly DEFAULT_TURBULENCE_ROUGHNESS = 3;

  private xDistortModule: Perlin;
  private yDistortModule: Perlin;
  private zDistortModule: Perlin;

  /**
   * The power (scale) of the displacement.
   */
  public power: number;

  /**
   *
   * @param sourceModule The noise module that is used to generate the output values.
   * @param frequency
   * @param power
   * @param roughness
   * @param seed
   */
  constructor(sourceModule: Module, frequency?: number, power?: number, roughness?: number, seed?: number) {
    super(sourceModule);

    this.xDistortModule = new Perlin();
    this.yDistortModule = new Perlin();
    this.zDistortModule = new Perlin();
    this.sourceModule = sourceModule || null;
    this.frequency = frequency || Perlin.DEFAULT_PERLIN_FREQUENCY;
    this.power = power || Turbulence.DEFAULT_TURBULENCE_POWER;
    this.roughness = roughness || Turbulence.DEFAULT_TURBULENCE_ROUGHNESS;
    this.seed = seed || Perlin.DEFAULT_PERLIN_SEED;
  }

  /**
   * The frequency of the turbulence.
   *
   * The frequency of the turbulence determines how rapidly the
   * displacement amount changes.
   */
  public get frequency(): number {
    return this.xDistortModule.frequency;
  }
  public set frequency(v: number) {
    this.xDistortModule.frequency = v;
    this.yDistortModule.frequency = v;
    this.zDistortModule.frequency = v;
  }

  /**
   * The roughness of the turbulence.
   *
   * The roughness of the turbulence determines the roughness of the
   * changes to the displacement amount.  Low values smoothly change
   * the displacement amount.  High values roughly change the
   * displacement amount, which produces more "kinky" changes.
   */
  public get roughness(): number {
    return this.xDistortModule.octaves;
  }
  public set roughness(v: number) {
    this.xDistortModule.octaves = v;
    this.yDistortModule.octaves = v;
    this.zDistortModule.octaves = v;
  }

  /**
   * The seed value.
   *
   * Internally, there are three Perlin noise modules
   * that displace the input value; one for the x, one for the y,
   * and one for the z coordinate.  This noise module assigns the
   * following seed values to the Perlin noise modules:
   * - It assigns the seed value (seed + 0) to the x noise module.
   * - It assigns the seed value (seed + 1) to the y noise module.
   * - It assigns the seed value (seed + 2) to the z noise module.
   */
  public get seed(): number {
    return this.xDistortModule.seed;
  }
  public set seed(v: number) {
    this.xDistortModule.seed = v;
    this.yDistortModule.seed = v + 1;
    this.zDistortModule.seed = v + 2;
  }

  public getValue(x: number, y: number, z: number): number {
    // Get the values from the three Perlin noise modules and
    // add each value to each coordinate of the input value.  There are also
    // some offsets added to the coordinates of the input values.  This prevents
    // the distortion modules from returning zero if the (x, y, z) coordinates,
    // when multiplied by the frequency, are near an integer boundary.  This is
    // due to a property of gradient coherent noise, which returns zero at
    // integer boundaries.
    let x0 = (x + (12414.0 / 65536.0));
    let y0 = (y + (65124.0 / 65536.0));
    let z0 = (z + (31337.0 / 65536.0));
    let x1 = (x + (26519.0 / 65536.0));
    let y1 = (y + (18128.0 / 65536.0));
    let z1 = (z + (60493.0 / 65536.0));
    let x2 = (x + (53820.0 / 65536.0));
    let y2 = (y + (11213.0 / 65536.0));
    let z2 = (z + (44845.0 / 65536.0));

    // Retrieve the output value at the offsetted input value instead of the original input value.
    return this.sourceModule.getValue(
      (x + (this.xDistortModule.getValue(x0, y0, z0) * this.power)),
      (y + (this.yDistortModule.getValue(x1, y1, z1) * this.power)),
      (z + (this.zDistortModule.getValue(x2, y2, z2) * this.power)),
    );
  }
}

export default Turbulence;
