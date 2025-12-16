const fs = require('fs');
const path = require('path');

const companiesDir = './src/pages/companies';

fs.readdirSync(companiesDir).forEach(file => {
  if (file.endsWith('.astro')) {
    const filePath = path.join(companiesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Step 1: Remove all backslash escapes before single quotes (fixing over-escaping)
    content = content.replace(/\\'/g, "'");
    
    // Step 2: Replace curly apostrophes with escaped straight apostrophes
    content = content.replace(/'/g, "\\'");
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${file}`);
  }
});

console.log('Done!');
