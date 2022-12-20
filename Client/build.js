const { execSync } = require('child_process');

execSync('npm run build', { cwd: './Client', stdio: 'inherit' });