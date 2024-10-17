import { exec } from 'child_process';
import fs from 'fs';

const buildCommand = 'rimraf dist && tsc';

exec(buildCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Build error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Build stderr: ${stderr}`);
    return;
  }
  console.log(`Build stdout: ${stdout}`);

  // Check if dist directory and main file exist
  if (!fs.existsSync('./dist') || !fs.existsSync('./dist/index.js')) {
    console.error('Build failed: dist directory or index.js not found');
    process.exit(1);
  }

  console.log('Build completed successfully');
});