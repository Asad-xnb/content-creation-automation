const fs = require('fs');

function fixFile(f) {
  if (!fs.existsSync(f)) return;
  let code = fs.readFileSync(f, 'utf8');
  code = code.replace(/open\(([^,]+),\s*["']r["']\)/g, 'open($1, "r", encoding="utf-8")');
  code = code.replace(/open\(([^,]+),\s*["']w["']\)/g, 'open($1, "w", encoding="utf-8")');
  fs.writeFileSync(f, code);
}

fixFile('generate_carousel_today.py');
