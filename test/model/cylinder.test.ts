import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Cylinder } from '@app/model';
import { Const } from '@app/module/generator';

describe('model/cylinder', () => {
  it("can construct successfully", () => {
    // Setup
    const value = 2;
    const sourceModule = new Const(value);

    // Test
    const testFunc = () => {
      new Cylinder(sourceModule);
    };

    // Assert
    expect(testFunc).not.to.throw();
  });

  it("calling getValue returns a number", () => {
    // Setup
    const angle = 45;
    const y = 10;
    const mockModule = createMockCylinder();

    // Test
    const value = mockModule.getValue(angle, y);

    // Assert
    expect(value).to.be.ok;
  });
});

function createMockCylinder() {
  // Setup
  const value = 2;
  const sourceModule = new Const(value);

  // Test
  return new Cylinder(sourceModule);
}
