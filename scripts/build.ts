import { build, getBaseBuildConstants } from './util';

(async () => {
  const buildConstants = getBaseBuildConstants();
  await build(buildConstants);
})();