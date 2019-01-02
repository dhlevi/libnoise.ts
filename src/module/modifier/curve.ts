import Interpolation from '@app/interpolation';
import Misc from '@app/misc';
import Module from '@app/module';
import ModifierModule from './ModifierModule';

class Curve extends ModifierModule {
  private controlPoints: number[][]; // @TODO write a tuple interface - is an array of pairs

  constructor(sourceModule: Module, controlPoints?: number[][]) {
    super(sourceModule);

    this.sourceModule = sourceModule || null;
    this.controlPoints = controlPoints || [];
  }

  private findInsertionPos(value: number[]) {
    // Iterate through list to find first controlPoint larger than new value
    //  and insert right before that
    for (let i = 0; i < this.controlPoints.length; i++) {
      const controlPoint = this.controlPoints[i];
      if (controlPoint[0] === value[0] && controlPoint[1] === value[1]) {
        // Inserting control point that already exists
        throw new Error(`Cannot insert control point [${value.join(',')}]: control point already exists`);
      } else if (controlPoint[0] > value[0] || (controlPoint[0] === value[0] && controlPoint[1] > value[1])) {
        // We've found our insertion pos
        return i;
      }
    }

    // Did not find any points greater than the new one, insert this last
    return this.controlPoints.length;
  }

  private insertAtPos(position: number, input: number, output: number) {
    position = Math.floor(position);

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
    this.insertAtPos(this.findInsertionPos([input, output]), input, output);
  }

  public getValue(x: number, y: number, z: number) {
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
