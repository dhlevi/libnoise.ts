import { execAsync } from '.';

export default async function test(): Promise<void> {
  // Run mocha
  try {
    console.log(await execAsync(`TS_NODE_CACHE=false nyc mocha "test/**/*.test.ts"`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}