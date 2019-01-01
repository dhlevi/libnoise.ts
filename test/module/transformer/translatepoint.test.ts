import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Const } from '@app/module/generator';
import { TranslatePoint } from '@app/module/transformer';

describe('module/transformer/translatepoint', () => {
  it("can construct successfully", () => {
    // Setup
    const sourceValue = 2;
    const sourceModule = new Const(sourceValue);
    const xTranslate = 10;
    const yTranslate = 20;
    const zTranslate = 30;

    // Test
    const testFunc = () => {
      new TranslatePoint(sourceModule, xTranslate, yTranslate, zTranslate);
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

  it("calling setTranslation updates correctly", () => {
    // Setup
    const mockModule = createMockModule();
    const newXValue = 20;
    const newYValue = 30;
    const newZValue = 40;

    // Test
    mockModule.setTranslation(newXValue, newYValue, newZValue);
    const updatedXValue = mockModule.translateX;
    const updatedYValue = mockModule.translateY;
    const updatedZValue = mockModule.translateZ;

    // Assert
    expect(updatedXValue).to.equal(newXValue);
    expect(updatedYValue).to.equal(newYValue);
    expect(updatedZValue).to.equal(newZValue);
  });
});

function createMockModule() {
  const sourceValue = 2;
  const sourceModule = new Const(sourceValue);
  const xTranslate = 10;
  const yTranslate = 20;
  const zTranslate = 30;

  return new TranslatePoint(sourceModule, xTranslate, yTranslate, zTranslate);
}
