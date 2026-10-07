const fs = require('fs');
let code = fs.readFileSync('build_carousel.cjs', 'utf8');
code = code.replace(/execSync\('node generate_carousel_today\.py'\);/g, "execSync('python3 generate_carousel_today.py');");
fs.writeFileSync('build_carousel.cjs', code);
