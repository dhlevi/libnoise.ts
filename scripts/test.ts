import { spawnAsync } from './util';

(async () => {
  // Run mocha
  try {
    await spawnAsync(`TS_NODE_CACHE=false nyc mocha "test/**/*.test.ts"`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();