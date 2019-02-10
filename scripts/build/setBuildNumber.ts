import * as azdev from 'azure-devops-node-api';

import { getBaseBuildConstants } from "../util";
import ERROR_CODES from './errorCodes';


(async () => {
  try {

    const buildConstants = getBaseBuildConstants();
    const orgUrl = "https://dev.azure.com/peabnuts123";
    const token: string = process.env.AZURE_DEVOPS_TOKEN as string;
    const definitionId = parseInt(process.env.SYSTEM_DEFINITIONID as string, 10);
    const projectName = process.env.SYSTEM_TEAMPROJECT as string;
    const branchName = process.env.BUILD_SOURCEBRANCHNAME as string;
    const buildId = process.env.BUILD_BUILDID as string;

    const authHandler = azdev.getPersonalAccessTokenHandler(token);
    const connection = new azdev.WebApi(orgUrl, authHandler);
    const build = await connection.getBuildApi();
    const buildDefinition = await build.getDefinition(definitionId, projectName);

    let version = buildConstants.packageJson.version;
    if (branchName !== 'master') {
      version += `-${branchName}b${buildId}`;
    }

    buildDefinition.variables = {
      ...buildDefinition.variables,
      VERSION: {
        allowOverride: false,
        isSecret: false,
        value: version,
      },
    };

    await build.updateDefinition(buildDefinition, definitionId, projectName);
  } catch (e) {
    console.error(e);
    console.error("Failed to set build number. ");
    process.exit(ERROR_CODES.SET_BUILD_NUMBER_FAILED);
  }
})();