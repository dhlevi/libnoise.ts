# libnoise.js

### Original project (by [jmcneese](https://github.com/jmcneese/libnoise.js)):
> A (mostly) direct port of C++ [libnoise](http://libnoise.sourceforge.net/index.html) for CommonJS/Node.js

This is a fork that ports the code to TypeScript and modernises things a bit. This library can be used with both Node.js and web projects.

## Backlog
  - Move all this common logic into an interface
  - Write some tests
  - Explicit return types of functions
  - Re-enable strict type checking
  - Make less constructor stuff optional
  - Audit npm
  - Reconcile public/private members against libnoise source
  - JSDOC public methods
  - Remove random // SETUP and // TEST comments from createMock___() functions
  - rename createMock___() functions to createMockModule()
  - go through and format code