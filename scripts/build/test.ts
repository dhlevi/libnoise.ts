import { spawnAsync } from "../util";
import ERROR_CODES from './errorCodes';

(async () => {
  try {
    // Invoke test command
    await spawnAsync('npm test');

    console.log("Success! All tests executed without error.");
  } catch (e) {
    console.error(e);
    console.error("Testing failed.");
    // @FAILURE
    process.exit(ERROR_CODES.TEST_FAILED);
  }
})();