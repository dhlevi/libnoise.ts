import { execAsync } from '.';

export default async function test() {
  // Run mocha
  try {
    console.log(await execAsync(`nyc mocha "test/**/*.test.ts"`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}