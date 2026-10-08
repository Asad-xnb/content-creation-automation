const fs = require('fs');

function fixInfographic(f) {
  if (fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    // Replace the entire brand/handle div
    c = c.replace(/<div class="brand".*?<\/div>/gi, '<div class="brand" style="display: flex; align-items: center; gap: 10px; color: #16AA79;"><img src="receptralink-logo.png" style="height: 24px; vertical-align: middle;">ReceptraLink</div>');
    c = c.replace(/<div class="handle".*?<\/div>/gi, '<div class="handle" style="display: flex; align-items: center; gap: 10px; color: #16AA79;"><img src="receptralink-logo.png" style="height: 24px; vertical-align: middle;">ReceptraLink</div>');
    fs.writeFileSync(f, c);
  }
}

fixInfographic('linkedin-infographic-template.html');
fixInfographic('linkedin-performance-infographic.html');
fixInfographic('linkedin-infographic.html');
