import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Const } from '@app/module/generator';
import { Curve } from '@app/module/modifier';

describe('module/modifier/curve', () => {
  it("can construct successfully", () => {
    // Setup
    const value = 2;
    const sourceModule = new Const(value);
    const controlPoints: number[][] = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ];

    // Test
    const testFunc = () => {
      new Curve(sourceModule, controlPoints);
    };

    // Assert
    expect(testFunc).not.to.throw();
  });

  it("calling getValue returns a number", () => {
    // Setup
    const x = 10;
    const y = 10;
    const z = 10;
    const mockModule = createMockModule();

    // Test
    const value = mockModule.getValue(x, y, z);

    // Assert
    expect(value).to.be.ok;
  });

  it("calling getValue with less than 4 control points throws an error", () => {
    // Setup
    const x = 10;
    const y = 10;
    const z = 10;
    const value = 2;
    const sourceModule = new Const(value);
    const controlPoints: number[][] = [
      [0, 0],
      [0, 1],
      [1, 0],
    ];

    const mockModule = new Curve(sourceModule, controlPoints);

    // Test
    const testFunc = () => {
      mockModule.getValue(x, y, z);
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("adding a new control point throws no errors", () => {
    // Setup
    const mockModule = createMockModule();

    // Test
    const testFunc = () => {
      mockModule.addControlPoint(2, 3);
    };

    // Assert
    expect(testFunc).not.to.throw();
  });

  it("adding an existing control point throws an error", () => {
    // Setup
    const value = 2;
    const sourceModule = new Const(value);
    const mockControlPoint = [1, 1];
    const controlPoints: number[][] = [
      [0, 0],
      [0, 1],
      [1, 0],
      mockControlPoint,
    ];

    const mockModule = new Curve(sourceModule, controlPoints);

    // Test
    const testFunc = () => {
      mockModule.addControlPoint(mockControlPoint[0], mockControlPoint[1]);
    };

    // Assert
    expect(testFunc).to.throw();
  });
});

function createMockModule() {
  const value = 2;
  const sourceModule = new Const(value);
  const controlPoints: number[][] = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ];

  return new Curve(sourceModule, controlPoints);
}
