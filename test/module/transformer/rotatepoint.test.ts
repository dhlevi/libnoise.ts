import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Const } from '@app/module/generator';
import { RotatePoint } from '@app/module/transformer';

describe('module/transformer/rotatepoint', () => {
  it("can construct successfully", () => {
    // Setup
    const sourceValue = 2;
    const sourceModule = new Const(sourceValue);
    const xAngle = 10;
    const yAngle = 20;
    const zAngle = 30;

    // Test
    const testFunc = () => {
      new RotatePoint(sourceModule, xAngle, yAngle, zAngle);
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

  it("setting xAngle updates correctly", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = 20;

    // Test
    mockModule.xAngle = newValue;
    const updatedValue = mockModule.xAngle;

    // Assert
    expect(updatedValue).to.equal(newValue);
  });

  it("setting yAngle updates correctly", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = 20;

    // Test
    mockModule.yAngle = newValue;
    const updatedValue = mockModule.yAngle;

    // Assert
    expect(updatedValue).to.equal(newValue);
  });

  it("setting zAngle updates correctly", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = 20;

    // Test
    mockModule.zAngle = newValue;
    const updatedValue = mockModule.zAngle;

    // Assert
    expect(updatedValue).to.equal(newValue);
  });

  it("calling setAngles updates correctly", () => {
    // Setup
    const mockModule = createMockModule();
    const newXValue = 20;
    const newYValue = 30;
    const newZValue = 40;


    // Test
    mockModule.setAngles(newXValue, newYValue, newZValue);
    const updatedXValue = mockModule.xAngle;
    const updatedYValue = mockModule.yAngle;
    const updatedZValue = mockModule.zAngle;

    // Assert
    expect(updatedXValue).to.equal(newXValue);
    expect(updatedYValue).to.equal(newYValue);
    expect(updatedZValue).to.equal(newZValue);
  });
});

function createMockModule(): RotatePoint {
  // Setup
  const sourceValue = 2;
  const sourceModule = new Const(sourceValue);
  const xAngle = 10;
  const yAngle = 20;
  const zAngle = 30;

  // Test
  return new RotatePoint(sourceModule, xAngle, yAngle, zAngle);
}
