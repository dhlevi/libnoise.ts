import GeneratorModule from './GeneratorModule';

class Cylinders extends GeneratorModule {
  public static readonly DEFAULT_CYLINDERS_FREQUENCY = 1.0;

  private frequency: number;

  constructor(frequency?: number) {
    super();

    this.frequency = frequency || Cylinders.DEFAULT_CYLINDERS_FREQUENCY;
  }

  public getValue(x: number, y: number, z: number): number {
    x = (x * this.frequency);
    y = (y * this.frequency);
    z = (z);

    let distFromCenter = Math.sqrt(x * x + z * z);
    let distFromSmallerSphere = distFromCenter - Math.floor(distFromCenter);
    let distFromLargerSphere = 1.0 - distFromSmallerSphere;
    let nearestDist = Math.min(distFromSmallerSphere, distFromLargerSphere);

    return 1.0 - (nearestDist * 4.0); // Puts it in the -1.0 to +1.0 range.
  }
}

export default Cylinders;
