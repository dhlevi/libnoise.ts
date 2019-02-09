import { spawn } from 'child_process';

/**
 * Invoke a command in child process asynchronously
 *
 * @async
 * @param {string} shellCommand Command to invoke
 * @param {boolean} logCommand Whether to log the invoked command to the stdout or not
 * @returns {string}
 */
export default function spawnAsync(shellCommand: string, logCommand: boolean = false): Promise<void> {
  // Split command into tokens e.g. `ember -v` => ['ember', '-v'];
  const tokens: string[] = shellCommand.split(/\s+/g);
  const command: string = tokens[0];
  const args: string[] = tokens.slice(1);

  // Log command if requested
  if (logCommand) {
    console.log(`Invoking shell command '${shellCommand}'`);
  }

  return new Promise((resolve, reject) => {
    // Spawn sub process
    const childProcess = spawn(command, args, {
      stdio: "inherit",
      shell: true,
    });

    // Resolve promise on process termination
    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
}
