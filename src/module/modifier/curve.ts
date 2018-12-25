import Interpolation from '@app/interpolation';
import Misc from '@app/misc';

class Curve {
  private sourceModule: any;
  private controlPoints: number[][]; // @TODO write a tuple interface - is an array of pairs

  constructor(sourceModule?: any, controlPoints?: number[][]) {
    this.sourceModule = sourceModule || null;
    this.controlPoints = controlPoints || [];
  }

  // @TODO dear lord, please no array comparison
  public findInsertionPos(value: number[] | number) {
    let position: number;
    for (position = 0; position < this.controlPoints.length; position++) {
      if (value < this.controlPoints[position]) {
        // We found the array index in which to insert the new control point.
        // Exit now.
        break;
      } else if (value === this.controlPoints[position]) {
        // Each control point is required to contain a unique value, so throw
        // an exception.
        throw new Error('Invalid parameter');
      }
    }

    return position;
  }

  private insertAtPos(position: number, input: number, output: number) {
    // Make room for the new control point at the specified position within
    // the control point array.  The position is determined by the value of
    // the control point; the control points must be sorted by value within
    // that array.
    let newControlPoints = [];

    for (let i = 0; i < this.controlPoints.length; i++) {

      if (i < position) {

        newControlPoints[i] = this.controlPoints[i];

      } else {

        newControlPoints[i + 1] = this.controlPoints[i];

      }

    }

    this.controlPoints = newControlPoints;

    // Now that we've made room for the new control point within the array,
    // add the new control point.
    this.controlPoints[position] = [input, output];
  }

  public addControlPoint(input: number, output: number) {
    // Find the insertion point for the new control point and insert the new
    // point at that position.  The control point array will remain sorted by
    // input value.
    this.insertAtPos(this.findInsertionPos(input), input, output);
  }

  public getValue(x: number, y: number, z: number) {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing source module!');
    }

    if (this.controlPoints.length < 4) {
      throw new Error('Insufficient number of control points!');
    }

    // Get the output value from the source module.
    let value = this.sourceModule.getValue(x, y, z);

    // Find the first element in the control point array that has an input value
    // larger than the output value from the source module.
    let indexPos: number;
    for (indexPos = 0; indexPos < this.controlPoints.length; indexPos++) {
      if (value < this.controlPoints[indexPos][0]) {
        break;
      }
    }

    // Find the four nearest control points so that we can perform cubic
    // interpolation.
    let index0 = Misc.clampValue(indexPos - 2, 0, this.controlPoints.length - 1);
    let index1 = Misc.clampValue(indexPos - 1, 0, this.controlPoints.length - 1);
    let index2 = Misc.clampValue(indexPos, 0, this.controlPoints.length - 1);
    let index3 = Misc.clampValue(indexPos + 1, 0, this.controlPoints.length - 1);

    // If some control points are missing (which occurs if the value from the
    // source module is greater than the largest input value or less than the
    // smallest input value of the control point array), get the corresponding
    // output value of the nearest control point and exit now.
    if (index1 === index2) {
      return this.controlPoints[index1][1];
    }

    // Compute the alpha value used for cubic interpolation.
    let input0 = this.controlPoints[index1][0];
    let input1 = this.controlPoints[index2][0];
    let alpha = (value - input0) / (input1 - input0);

    // Now perform the cubic interpolation given the alpha value.
    return Interpolation.cubic(
      this.controlPoints[index0][1],
      this.controlPoints[index1][1],
      this.controlPoints[index2][1],
      this.controlPoints[index3][1],
      alpha,
    );
  }
}

export default Curve;
