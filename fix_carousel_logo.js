const fs = require('fs');

let f = 'skills/branded-carousel/SKILL.md';
if (fs.existsSync(f)) {
  let c = fs.readFileSync(f, 'utf8');
  
  // Update header text in all templates
  c = c.replace(/<div class="fw-text">Receptralink \/ 2026<\/div>/gi, '<div class="fw-text" style="display: flex; align-items: center; gap: 8px;"><img src="../../receptralink-logo.png" style="height: 16px;">ReceptraLink</div>');
  
  // Update final pill
  c = c.replace(/<div class="s7-pill">follow Receptralink for daily <em>frameworks.<\/em><\/div>/gi, '<div class="s7-pill" style="display: flex; align-items: center; gap: 12px;"><img src="../../receptralink-logo.png" style="height: 24px;">follow ReceptraLink for daily <em>frameworks.</em></div>');

  fs.writeFileSync(f, c);
}
