const fs = require('fs');
const filePath = process.argv[2];
let data = '';
process.stdin.on('data', chunk => data += chunk);
process.stdin.on('end', () => {
  fs.writeFileSync(filePath, data, 'utf8');
  console.log(`Successfully wrote to ${filePath}`);
});
