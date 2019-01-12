import {
  deploy,
  getBaseBuildConstants,
} from './util';

(async () => {
  let buildConstants = getBaseBuildConstants();

  await deploy(buildConstants);
})();