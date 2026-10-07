const fs = require('fs');
let p = './skills/branded-carousel/SKILL.md';
let text = fs.readFileSync(p, 'utf8');
text = text.replace(
  '.bottom-area { position: absolute; bottom: 70px; left: 70px; right: 70px; display: flex; justify-content: space-between; align-items: center; z-index: 5; }',
  '.bottom-area { position: absolute; bottom: 70px; left: 70px; right: 70px; display: flex; justify-content: space-between; align-items: flex-end; z-index: 5; }'
);
fs.writeFileSync(p, text);
