class Cylinders {
  public static DEFAULT_CYLINDERS_FREQUENCY = 1.0;
  frequency: any;

  constructor(frequency) {
    this.frequency = frequency || Cylinders.DEFAULT_CYLINDERS_FREQUENCY;
  }

  getValue(x, y, z) {
    x = (x * this.frequency);
    y = (y * this.frequency);
    z = (z);

    var distFromCenter = Math.sqrt(x * x + z * z);
    var distFromSmallerSphere = distFromCenter - Math.floor(distFromCenter);
    var distFromLargerSphere = 1.0 - distFromSmallerSphere;
    var nearestDist = Math.min(distFromSmallerSphere, distFromLargerSphere);

    return 1.0 - (nearestDist * 4.0); // Puts it in the -1.0 to +1.0 range.
  }
}

export default Cylinders;
