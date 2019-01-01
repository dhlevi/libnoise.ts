import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Sphere } from '@app/model';
import { Const } from '@app/module/generator';

describe('model/sphere', () => {
  it("can construct successfully", () => {
    // Setup
    const value = 2;
    const sourceModule = new Const(value);

    // Test
    const testFunc = () => {
      new Sphere(sourceModule);
    };

    // Assert
    expect(testFunc).not.to.throw();
  });

  it("calling getValue returns a number", () => {
    // Setup
    const lat = 10;
    const lon = 10;
    const mockModule = createMockSphere();

    // Test
    const value = mockModule.getValue(lat, lon);

    // Assert
    expect(value).to.be.ok;
  });
});

function createMockSphere() {
  // Setup
  const value = 2;
  const sourceModule = new Const(value);

  // Test
  return new Sphere(sourceModule);
}
