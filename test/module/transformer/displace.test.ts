import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Const } from '@app/module/generator';
import { Displace } from '@app/module/transformer';

describe('module/transformer/displace', () => {
  it("can construct successfully", () => {
    // Setup
    const sourceValue = 2;
    const sourceModule = new Const(sourceValue);
    const xValue = 1;
    const xModule = new Const(xValue);
    const yValue = 2;
    const yModule = new Const(yValue);
    const zValue = 3;
    const zModule = new Const(zValue);

    // Test
    const testFunc = () => {
      new Displace(sourceModule, xModule, yModule, zModule);
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
});

function createMockModule() {
  // Setup
  const sourceValue = 2;
  const sourceModule = new Const(sourceValue);
  const xValue = 1;
  const xModule = new Const(xValue);
  const yValue = 2;
  const yModule = new Const(yValue);
  const zValue = 3;
  const zModule = new Const(zValue);

  // Test
  return new Displace(sourceModule, xModule, yModule, zModule);
}
