import Interpolation from '@app/interpolation';
import Misc from '@app/misc';
import Module from '@app/module';
import ModifierModule from './ModifierModule';

class Terrace extends ModifierModule {
  private controlPoints: number[];
  private invert: boolean;

  constructor(sourceModule: Module, controlPoints?: number[], invert?: boolean) {
    super(sourceModule);

    this.controlPoints = controlPoints || [];
    this.invert = invert || false;
  }

  private findInsertionPos(value: number): number {
    // Iterate through list to find first controlPoint larger than new value
    //  and insert right before that
    for (let i = 0; i < this.controlPoints.length; i++) {
      const controlPoint = this.controlPoints[i];
      if (controlPoint === value) {
        // Inserting control point that already exists
        throw new Error(`Cannot insert control point ${value}: control point already exists`);
      } else if (controlPoint > value) {
        // We've found our insertion pos
        return i;
      }
    }

    // Did not find any points greater than the new one, insert this last
    return this.controlPoints.length;
  }

  private insertAtPos(insertionPos: number, value: number): void {
    insertionPos = Math.floor(insertionPos);

    // Make room for the new control point at the specified position within
    // the control point array.  The position is determined by the value of
    // the control point; the control points must be sorted by value within
    // that array.
    let newControlPoints = [];

    for (let i = 0; i < this.controlPoints.length; i++) {
      if (i < insertionPos) {
        newControlPoints[i] = this.controlPoints[i];
      } else {
        newControlPoints[i + 1] = this.controlPoints[i];
      }
    }

    this.controlPoints = newControlPoints;

    // Now that we've made room for the new control point within the array,
    // add the new control point.
    this.controlPoints[insertionPos] = value;
  }

  public addControlPoint(value: number): void {
    // Find the insertion point for the new control point and insert the new
    // point at that position.  The control point array will remain sorted by
    // value.
    this.insertAtPos(this.findInsertionPos(value), value);
  }

  public getValue(x: number, y: number, z: number): number {
    // Get the output value from the source module.
    let sourceModuleValue = this.sourceModule.getValue(x, y, z);

    // Find the first element in the control point array that has a value
    // larger than the output value from the source module.
    let indexPos: number;
    for (indexPos = 0; indexPos < this.controlPoints.length; indexPos++) {
      if (sourceModuleValue < this.controlPoints[indexPos]) {
        break;
      }
    }

    // Find the two nearest control points so that we can map their values
    // onto a quadratic curve.
    let index0 = Misc.clampValue(indexPos - 1, 0, this.controlPoints.length - 1);
    let index1 = Misc.clampValue(indexPos, 0, this.controlPoints.length - 1);

    // If some control points are missing (which occurs if the output value from
    // the source module is greater than the largest value or less than the
    // smallest value of the control point array), get the value of the nearest
    // control point and exit now.
    if (index0 === index1) {
      return this.controlPoints[index1];
    }

    // Compute the alpha value used for linear interpolation.
    let value0 = this.controlPoints[index0];
    let value1 = this.controlPoints[index1];
    let alpha = (sourceModuleValue - value0) / (value1 - value0);

    if (this.invert) {
      alpha -= 1.0;
      let swap = value0;
      value0 = value1;
      value1 = swap;
    }

    // Squaring the alpha produces the terrace effect.
    alpha *= alpha;

    // Now perform the linear interpolation given the alpha value.
    return Interpolation.linear(value0, value1, alpha);
  }
}

export default Terrace;
