import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Line } from '@app/model';
import { Const } from '@app/module/generator';

describe('model/line', () => {
  it("can construct successfully", () => {
    // Setup
    const value = 2;
    const sourceModule = new Const(value);

    // Test
    const testFunc = () => {
      new Line(sourceModule);
    };

    // Assert
    expect(testFunc).not.to.throw();
  });

  it("calling getValue returns a number", () => {
    // Setup
    const p = 0.6;
    const mockModule = createMockModule();

    // Test
    const value = mockModule.getValue(p);

    // Assert
    expect(value).to.be.ok;
  });
});

function createMockModule(): Line {
  const value = 2;
  const sourceModule = new Const(value);

  return new Line(sourceModule);
}
