import { spawnAsync } from "../util";
import ERROR_CODES from './errorCodes';

(async () => {
  try {
    // Invoke lint command
    await spawnAsync('npm run lint');

    console.log("Success! Linting returned no errors.");
  } catch (e) {
    console.error(e);
    console.error("Linting failed.");
    // @FAILURE
    process.exit(ERROR_CODES.LINT_FAILED);
  }
})();