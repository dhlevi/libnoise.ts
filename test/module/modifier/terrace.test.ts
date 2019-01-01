import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Const } from '@app/module/generator';
import { Terrace } from '@app/module/modifier';

describe('module/modifier/terrace', () => {
  it("can construct successfully", () => {
    // Setup
    const value = 2;
    const sourceModule = new Const(value);
    const controlPoints: number[] = [1, 2, 3, 4];
    const invert = false;

    // Test
    const testFunc = () => {
      new Terrace(sourceModule, controlPoints, invert);
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

  it("adding a new control point throws no errors", () => {
    // Setup
    const mockModule = createMockModule();

    // Test
    const testFunc = () => {
      mockModule.addControlPoint(5);
    };

    // Assert
    expect(testFunc).not.to.throw();
  });

  it("adding an existing control point throws an error", () => {
    // Setup
    const value = 2;
    const sourceModule = new Const(value);
    const mockControlPoint = 4;
    const controlPoints: number[] = [1, 2, 3, mockControlPoint];
    const invert = false;

    const mockModule = new Terrace(sourceModule, controlPoints, invert);

    // Test
    const testFunc = () => {
      mockModule.addControlPoint(mockControlPoint);
    };

    // Assert
    expect(testFunc).to.throw();
  });
});

function createMockModule() {
  // Setup
  const value = 2;
  const sourceModule = new Const(value);
  const controlPoints: number[] = [1, 2, 3, 4];
  const invert = false;

  // Test
  return new Terrace(sourceModule, controlPoints, invert);
}
