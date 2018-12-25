import MathConsts from '@app/mathconsts';
import NoiseGen from '@app/noisegen';

class Voronoi {
  public static DEFAULT_VORONOI_DISPLACEMENT = 1.0;
  public static DEFAULT_VORONOI_FREQUENCY = 1.0;
  public static DEFAULT_VORONOI_SEED = 0;

  private frequency: number;
  private displacement: number;
  private distance: boolean;
  private seed: number;

  constructor(frequency?: number, displacement?: number, distance?: boolean, seed?: number) {
    this.frequency = frequency || Voronoi.DEFAULT_VORONOI_FREQUENCY;
    this.displacement = displacement || Voronoi.DEFAULT_VORONOI_DISPLACEMENT;
    this.distance = distance || false;
    this.seed = seed || Voronoi.DEFAULT_VORONOI_SEED;
  }

  public getValue(x: number, y: number, z: number) {
    // This method could be more efficient by caching the seed values.
    x = (x * this.frequency);
    y = (y * this.frequency);
    z = (z * this.frequency);

    let xPos, yPos, zPos, xDist, yDist, zDist, dist;

    let xi = (x);
    let yi = (y);
    let zi = (z);
    let xInt = (x > 0.0 ? xi : xi - 1);
    let yInt = (y > 0.0 ? yi : yi - 1);
    let zInt = (z > 0.0 ? zi : zi - 1);
    let minDist = 2147483647.0;
    let xCandidate = 0;
    let yCandidate = 0;
    let zCandidate = 0;
    let value = 0.0;

    // Inside each unit cube, there is a seed point at a random position.  Go
    // through each of the nearby cubes until we find a cube with a seed point
    // that is closest to the specified position.
    for (let zCur = zInt - 2; zCur <= zInt + 2; zCur++) {

      for (let yCur = yInt - 2; yCur <= yInt + 2; yCur++) {

        for (let xCur = xInt - 2; xCur <= xInt + 2; xCur++) {
          // Calculate the position and distance to the seed point inside of
          // this unit cube.
          xPos = (xCur + NoiseGen.valueNoise3D(xCur, yCur, zCur, this.seed));
          yPos = (yCur + NoiseGen.valueNoise3D(xCur, yCur, zCur, this.seed + 1));
          zPos = (zCur + NoiseGen.valueNoise3D(xCur, yCur, zCur, this.seed + 2));
          xDist = (xPos - x);
          yDist = (yPos - y);
          zDist = (zPos - z);
          dist = (xDist * xDist + yDist * yDist + zDist * zDist);

          if (dist < minDist) {

            // This seed point is closer to any others found so far, so record
            // this seed point.
            minDist = dist;
            xCandidate = xPos;
            yCandidate = yPos;
            zCandidate = zPos;

          }

        }

      }

    }

    if (this.distance) {

      // Determine the distance to the nearest seed point.
      xDist = xCandidate - x;
      yDist = yCandidate - y;
      zDist = zCandidate - z;
      value = (Math.sqrt(xDist * xDist + yDist * yDist + zDist * zDist)) * MathConsts.SQRT_3 - 1.0;

    }

    // Return the calculated distance with the displacement value applied.
    return value + (
      this.displacement * NoiseGen.valueNoise3D(
        (Math.floor(xCandidate)),
        (Math.floor(yCandidate)),
        (Math.floor(zCandidate)),
      )
    );

  }
}

export default Voronoi;
