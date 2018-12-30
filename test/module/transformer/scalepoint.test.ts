import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Const } from '@app/module/generator';
import { ScalePoint } from '@app/module/transformer';

describe('module/transformer/scalepoint', () => {
  it("can construct successfully", () => {
    // Setup
    const sourceValue = 2;
    const sourceModule = new Const(sourceValue);
    const xScale = 10;
    const yScale = 20;
    const zScale = 30;

    // Test
    const testFunc = () => {
      new ScalePoint(sourceModule, xScale, yScale, zScale);
    };

    // Assert
    expect(testFunc).not.to.throw();
  });

  it("calling getValue without a sourceModule throws an error", () => {
    // Setup
    const x = 10;
    const y = 10;
    const z = 10;
    const xScale = 10;
    const yScale = 20;
    const zScale = 30;

    // Test
    const mockModule = new ScalePoint(null, xScale, yScale, zScale);

    // Test
    const testFunc = () => {
      mockModule.getValue(x, y, z);
    };

    // Assert
    expect(testFunc).to.throw();
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

  it("calling setScales updates correctly", () => {
    // Setup
    const mockModule = createMockModule();
    const newXValue = 20;
    const newYValue = 30;
    const newZValue = 40;


    // Test
    mockModule.setScales(newXValue, newYValue, newZValue);
    const updatedXValue = mockModule.xScale;
    const updatedYValue = mockModule.yScale;
    const updatedZValue = mockModule.zScale;

    // Assert
    expect(updatedXValue).to.equal(newXValue);
    expect(updatedYValue).to.equal(newYValue);
    expect(updatedZValue).to.equal(newZValue);
  });
});

function createMockModule() {
  // Setup
  const sourceValue = 2;
  const sourceModule = new Const(sourceValue);
  const xScale = 10;
  const yScale = 20;
  const zScale = 30;

  // Test
  return new ScalePoint(sourceModule, xScale, yScale, zScale);
}
