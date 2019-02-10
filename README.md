# libnoise.ts 

[![Build status](https://peabnuts123.visualstudio.com/libnoise.ts/_apis/build/status/libnoise.ts)](https://peabnuts123.visualstudio.com/libnoise.ts/_build/latest?definitionId=2)

A (mostly) direct port of C++ [libnoise](http://libnoise.sourceforge.net/index.html) (including noiseutils) designed to run in Node.js and on the web. This fork ports [the original code](https://github.com/jmcneese/libnoise.js) (written by jmcneese) to TypeScript and modernises things a bit. As this is a TypeScript library it is designed to be used primarily in a TypeScript environment. It will, of course, work perfectly fine in a JavaScript setting but no effort has been made to validate things the TypeScript compiler would otherwise catch (e.g. calling a constructor with no parameters will not throw an error).

## Installation

Simply install this module from npm:

```shell
  npm install libnoise-ts
```

The package comes with `.d.ts` definition files alongside the JavaScript so TypeScript works out of the box.

## Example

Use a Perlin generator module to generator a matrix of coherent noise values.

```TypeScript
import { Perlin } from "libnoise-ts/module/generator";

// Construct new Perlin generator
const perlin: Perlin = new Perlin();

for (let y: number = 0; y < 1; y += 0.1) {
  let rowOfValues: number[] = [];

  for (let x: number = 0; x < 1; x += 0.1) {
    // Get value from Perlin generator
    let value = perlin.getValue(x, y, 0);

    // Floor, scale and Abs value to produce nice positive integers
    value = Math.abs(Math.floor(value * 10));

    rowOfValues.push(value);
  }

  // Print out row of values
  console.log(rowOfValues.join(' '));
}

/* Outputs the following matrix of values

    0 3 3 3 2 3 3 0 0 1 0
    3 5 5 5 2 1 0 2 3 1 0
    2 3 3 4 2 2 1 2 2 1 2
    1 2 2 1 1 0 2 0 1 2 2
    1 0 0 0 0 2 2 3 0 1 3
    2 1 0 1 1 4 5 4 2 0 1
    0 1 0 1 4 7 8 4 4 2 2
    0 1 1 2 6 8 8 7 4 2 2
    3 2 1 2 3 5 7 9 6 4 2
    4 2 0 2 3 6 7 6 5 3 1
    0 3 3 3 5 6 7 7 6 2 0
*/
```

## Modules

The original C version of libnoise has [plenty of docs](http://libnoise.sourceforge.net/docs/modules.html) if you wish to read in depth but here is a brief overview of the different kinds of modules and what they do.

  - Combiner
    - Takes the output of 2 other modules and combines them in some way (e.g. by multiplying their result)
  - Generator
    - Pure modules that generate coherent noise based on configuration parameters (e.g. frequency, lacunarity, etc.)
  - Modifier
    - Takes the output of 1 other module and modifies it in some way (e.g. by taking the absolute value of it)
  - Selector
    - Takes the value of 2 other modules, and selects which value to output based on a third "control" module (e.g when the control module is above/below a certain value)
  - Transformer
    - Takes the value of 1 other module and transforms it in some way, usually geometrically. (e.g. rotate the value around a point in 3 dimensions, or scale it by a fixed value)

## Models

In addition to the set of modules are a small handful of model classes, generally designed to assist in mapping coherent noise onto geometric primitives. The set of models are as follows: 

  - Cylinder
  - Line
  - Plane
  - Sphere

These models take natural coordinate systems (e.g. Latitude, Longitude) and convert them into Euclidean coordinates (x,y,z), then return the value at that point in their source module.

The Cylinder, Plane and Sphere models also have equivalent Builder utility classes for generating a NoiseMap from their respective models. These classes are from the noiseutils library and handle the overhead of working with the Model classes in scenarios where you want to flatten the output values from one onto a plane in a logical manner (e.g. generating procedural textures for a Cylinder).

## Authors

- **Peabnuts123** - *TypeScript port and modernisation* - (this repo)
- **Joshua McNeese** - *Original JavaScript port* - [libnoise.js](https://github.com/jmcneese/libnoise.js)

## License

This project is licensed under the GNU Lesser General Public License - see the [LICENSE](LICENSE) file for details.
  