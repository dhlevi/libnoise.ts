import Interpolation from '@app/interpolation';
import Module from '@app/module/Module';
import { clamp } from '@app/util';
import ModifierModule from './ModifierModule';

/**
 * Noise module that maps the output value from a source module onto a
 * terrace-forming curve.
 *
 * This noise module maps the output value from the source module onto a
 * terrace-forming curve.  The start of this curve has a slope of zero;
 * its slope then smoothly increases.  This curve also contains
 * *control points* which resets the slope to zero at that point,
 * producing a "terracing" effect.
 *
 * To add a control point to this noise module, call the
 * addControlPoint() method.
 *
 * An application must add a minimum of two control points to the curve.
 * If this is not done, the getValue() method fails.  The control points
 * can have any value, although no two control points can have the same
 * value.  There is no limit to the number of control points that can be
 * added to the curve.
 *
 * This noise module clamps the output value from the source module if
 * that value is less than the value of the lowest control point or
 * greater than the value of the highest control point.
 *
 * This noise module is often used to generate terrain features such as
 * your stereotypical desert canyon.
 *
 * This noise module requires one source module.
 */
class Terrace extends ModifierModule {
  /**
   * Whether the terrace-forming curve between all control points is inverted.
   */
  public inverted: boolean;

  /**
   * Array that stores the control points.
   */
  private controlPoints: number[];


  /**
   * @param sourceModule The noise module that is used to generate the output values.
   * @param controlPoints Initial control points array.
   * @param invert Whether the terrace-forming curve between all control points is inverted.
   */
  constructor(sourceModule: Module, controlPoints?: number[], invert?: boolean) {
    super(sourceModule);

    this.controlPoints = controlPoints || [];
    this.inverted = invert || false;
  }

  /**
   * Determines the array index in which to insert the control point
   * into the internal control point array.
   *
   * By inserting the control point at the returned array index, this
   * class ensures that the control point array is sorted by value.
   * The code that maps a value onto the curve requires a sorted
   * control point array.
   *
   * @param value The value of the control point.
   *
   * @returns The array index in which to insert the control point.
   */
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

  /**
   * Inserts the control point at the specified position in the
   * internal control point array.
   *
   * To make room for this new control point, this method reallocates
   * the control point array and shifts all control points occurring
   * after the insertion position up by one.
   *
   * Because the curve mapping algorithm in this noise module requires
   * that all control points in the array be sorted by value, the new
   * control point should be inserted at the position in which the
   * order is still preserved.
   *
   * @param insertionPos The zero-based array position in which to
   *  insert the control point.
   * @param value The value of the control point.
   *
   */
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

  /**
   * Adds a control point to the terrace-forming curve.
   *
   * Two or more control points define the terrace-forming curve.  The
   * start of this curve has a slope of zero; its slope then smoothly
   * increases.  At the control points, its slope resets to zero.
   *
   * It does not matter which order these points are added.
   *
   * @param value The value of the control point to add.
   */
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
    let index0 = clamp(indexPos - 1, 0, this.controlPoints.length - 1);
    let index1 = clamp(indexPos, 0, this.controlPoints.length - 1);

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

    if (this.inverted) {
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
