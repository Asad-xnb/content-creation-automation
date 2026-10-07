const fs = require('fs');

function fixPrompt(file) {
    if (!fs.existsSync(file)) return;
    let c = fs.readFileSync(file, 'utf8');
    c = c.replace(/You are Prithal Bhardwaj's AI copywriter/g, "You are the AI copywriter for ReceptraLink");
    c = c.replace(/Select a startup growth loop, marketing experiment, paywall\/onboarding optimization, or product design shift/g, "Select a highly engaging topic about marketing solutions, operational growth, inbound call handling, or AI automation that hooks the reader");
    c = c.replace(/Select one hot startup\/platform risk, security issue, or developer operations failure/g, "Select an operational failure, a marketing bottleneck, or a customer service disaster to break down informatively");
    c = c.replace(/Select a workplace, remote work, or developer lifestyle dilemma/g, "Select a business operations, staffing, or customer service dilemma");
    c = c.replace(/Select a sector failure rate, market budget data, or startup stats/g, "Select stats about missed calls, customer service response times, or staffing costs");
    fs.writeFileSync(file, c);
}

fixPrompt('generate_posts_via_openrouter.py');
fixPrompt('generate_posts_via_anthropic.py');
fixPrompt('generate_ai_news.py');
fixPrompt('generate_ai_news_part2.py');
