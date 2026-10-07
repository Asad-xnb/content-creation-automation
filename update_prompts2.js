const fs = require('fs');

function fixPrompt(file) {
    if (!fs.existsSync(file)) return;
    let c = fs.readFileSync(file, 'utf8');
    c = c.replace(/Select a topic about inbound call handling, front-desk efficiency, AI voice receptionists, or customer service automation/g, "Select a highly engaging topic about marketing solutions, operational growth, inbound call handling, or AI automation that hooks the reader");
    c = c.replace(/Select an operational failure, customer service disaster, or business inefficiency related to phone support/g, "Select an operational failure, a marketing bottleneck, or a customer service disaster to break down informatively");
    fs.writeFileSync(file, c);
}

fixPrompt('generate_posts_via_openrouter.py');
fixPrompt('generate_posts_via_anthropic.py');
fixPrompt('generate_ai_news.py');
fixPrompt('generate_ai_news_part2.py');
