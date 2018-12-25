class Spheres {
  public static DEFAULT_SPHERES_FREQUENCY = 4.0;

  public frequency: number;

  constructor(frequency) {
    this.frequency = frequency || Spheres.DEFAULT_SPHERES_FREQUENCY;
  }

  getValue(x, y, z) {

    x = (x * this.frequency);
    y = (y * this.frequency);
    z = (z * this.frequency);

    var distFromCenter = Math.sqrt(x * x + y * y + z * z);
    var distFromSmallerSphere = distFromCenter - Math.floor(distFromCenter);
    var distFromLargerSphere = 1.0 - distFromSmallerSphere;
    var nearestDist = Math.min(distFromSmallerSphere, distFromLargerSphere);

    return 1.0 - (nearestDist * 4.0); // Puts it in the -1.0 to +1.0 range.
  }
}

export default Spheres;
