import {
  getBaseBuildConstants,
  rewriteImports,
  spawnAsync,
} from './util';

(async () => {
  const buildConstants = getBaseBuildConstants();

  // Subscribe to SIGINT for this process
  process.on('SIGINT', safeExit);
  process.on('exit', safeExit);

  try {
    // Clean previous build before building
    await spawnAsync(`npm run build:clean`);

    // Compile typescript
    await spawnAsync(`tsc --project .`, true);

    // Enter build folder
    process.chdir(buildConstants.tsBuildFolder);

    console.log("Rewriting import statements");
    rewriteImports('./', buildConstants);
  } catch (err) {
    console.error(err);
    process.exit(-1);
  }
})();

function safeExit(): void {
  // Exit
  process.exit();
}