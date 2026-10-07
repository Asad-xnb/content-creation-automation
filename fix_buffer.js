const fs = require('fs');
let c = fs.readFileSync('schedule_to_buffer.js', 'utf8');
c = c.replace(/\$orgId: String!/g, '$orgId: ID!');
c = c.replace(/\.\.\. on BasicError \{\s*message\s*\}/g, '');
fs.writeFileSync('schedule_to_buffer.js', c);
