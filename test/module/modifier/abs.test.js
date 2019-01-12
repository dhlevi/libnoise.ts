const { expect } = require('chai');
const { describe, xit } = require('mocha');

const { Const } = require('@app/module/generator');
const { Abs } = require('@app/module/modifier');

describe('JavaScript/module/modifier/abs', () => {
  xit("calling getValue without a sourceModule throws an error", () => {
    // Setup
    const x = 10;
    const y = 10;
    const z = 10;
    const mockModule = new Abs();

    // Test
    const testFunc = () => {
      mockModule.getValue(x, y, z);
    };

    // Assert
    expect(testFunc).to.not.throw();
  });
});

// function createMockModule() {
//   const value = 2;
//   const sourceModule = new Const(value);

//   return new Abs(sourceModule);
// }
