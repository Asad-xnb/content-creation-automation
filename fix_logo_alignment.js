const fs = require('fs');

function fixAlignment(f) {
  if (fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/<img src="receptralink-logo.png" style="height: 32px; margin-right: 12px; border-radius: 4px;">/gi, '<img src="receptralink-logo.png" style="height: 24px; margin-right: 8px; transform: translateY(2px);">');
    fs.writeFileSync(f, c);
  }
}

fixAlignment('linkedin-infographic-template.html');
fixAlignment('linkedin-performance-infographic.html');
fixAlignment('linkedin-infographic.html');
