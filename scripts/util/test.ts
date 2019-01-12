import { execAsync } from '.';

export default async function test() {
  // Run mocha
  try {
    console.log(await execAsync(`TS_NODE_CACHE=false nyc mocha "test/**/*.test.{ts,js}"`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}