const fs = require('fs');
const filepath = 'd:/VS Workspace/daily-linkedin-posts-pipeline/daily-linkedin-posts/SKILL.md';
let content = fs.readFileSync(filepath, 'utf8');

const targetIndex = content.indexOf('## STEP 8');
if (targetIndex !== -1) {
    content = content.substring(0, targetIndex);
    
    const replacement = `## STEP 8 — Send text posts to Slack (via Slack MCP tool)

Read the \`SLACK_CHANNEL_ID\` from the \`.env\` file.
Use \`slack_send_message\` (channel_id: \`$SLACK_CHANNEL_ID\`) for these messages in order:

**Section A — Reddit-based posts (4 posts):**
1. Header: \`🚀 *LinkedIn Content Drop — {DATE}*\n16 posts ready (4 Reddit-based + 7 AI News + 5 performance-driven). Carousel PDFs and infographics attached below.\`
2. Full COLLABORATIVE ARTICLE text
3. Full POLL text with all 4 options

**Section B — AI News plain-text posts (7 posts):**
4. Section header: \`📰 *AI News Posts — {DATE}*\n7 plain-text posts from the linkedin-ai-news-engine:\`
5. POST 1 — Tool Spotlight (full text)
6. POST 2 — Weekly Roundup (full text)
7. POST 3 — Plain English Breakdown (full text)
8. POST 4 — Unfair Advantage (full text)
9. POST 5 — Career/Income Angle (full text)
10. POST 6 — Hot Take (full text)
11. POST 7 — Steal This (full text)

**Section C — Performance-driven posts (5 posts, from linkedin-performance-engine):**
12. Section header: \`📈 *Performance Posts — {DATE}*\n5 posts modeled on your own top-performing analytics (Receptralink report):\`
13. PERF 1 — Founder Psychology Contrarian (full text)
14. PERF 2 — Loaded Poll (full text with all 4 options)
15. PERF 3 — AI News + Implications (full text)
16. PERF 4 — Story Carousel caption (the PDF + slides upload in STEP 9)
17. PERF 5 — Data Visual caption (the PNG uploads in STEP 9)

Send each post as a separate Slack message so they are individually copyable.

---

## STEP 9 — Upload files to Slack (via API)

\`\`\`bash
# Read tokens from .env
SLACK_TOKEN=$(grep '^SLACK_BOT_TOKEN=' .env | cut -d'=' -f2 | tr -d '\r')
CHANNEL=$(grep '^SLACK_CHANNEL_ID=' .env | cut -d'=' -f2 | tr -d '\r')

upload_to_slack() {
  local FILE_PATH="\\$1"
  local FILE_NAME="\\$2"
  local CAPTION="\\$3"
  local FILE_SIZE=$(wc -c < "\\$FILE_PATH" | tr -d ' ')

  UPLOAD_RESP=$(curl -s -X POST "https://slack.com/api/files.getUploadURLExternal" \\
    -H "Authorization: Bearer \\$SLACK_TOKEN" \\
    -F "filename=\\$FILE_NAME" \\
    -F "length=\\$FILE_SIZE")
  local UPLOAD_URL=$(echo "\\$UPLOAD_RESP" | node -e "const fs=require('fs'); console.log(JSON.parse(fs.readFileSync(0, 'utf-8')).upload_url || '')")
  local FILE_ID=$(echo "\\$UPLOAD_RESP" | node -e "const fs=require('fs'); console.log(JSON.parse(fs.readFileSync(0, 'utf-8')).file_id || '')")

  curl -s -X POST "\\$UPLOAD_URL" -F "filename=@\\$FILE_PATH" > /dev/null

  # Write payload to temp file to avoid shell-escaping issues with captions
  node -e "
const fs = require('fs');
const payload = JSON.stringify({
  files: [{id: process.argv[1], title: process.argv[2]}],
  channel_id: process.argv[3],
  initial_comment: process.argv[4]
});
fs.writeFileSync('./slack_upload_payload.json', payload);
" "\\$FILE_ID" "\\$FILE_NAME" "\\$CHANNEL" "\\$CAPTION"

  curl -s -X POST "https://slack.com/api/files.completeUploadExternal" \\
    -H "Authorization: Bearer \\$SLACK_TOKEN" \\
    -H "Content-Type: application/json" \\
    -d @./slack_upload_payload.json | node -e "const fs=require('fs'); const d=JSON.parse(fs.readFileSync(0,'utf-8')); console.log(process.argv[1] + (d.ok ? '  OK' : '  ERROR: ' + JSON.stringify(d.error||d)))" "\\$FILE_NAME"
}

YDATE=$(date +%Y-%m-%d)
DATE=$(date +%Y%m%d)
PDF=$(ls ./carousel-routine/output/\\$YDATE/carousel-branded/*.pdf 2>/dev/null | head -1)

if [ -n "\\$PDF" ]; then
  upload_to_slack "\\$PDF" "\\$(basename \\$PDF)" "📕 CAROUSEL PDF 📕\\n\\n[CAROUSEL_CAPTION]"
fi

upload_to_slack "./linkedin-infographic-\\$DATE.png" "linkedin-infographic.png" "📊 INFOGRAPHIC 📊\\n\\n[INFOGRAPHIC_CAPTION]"

# --- Performance-engine visuals (from STEP 7) ---
PERF_PDF=$(ls ./carousel-routine/output/\\$YDATE/carousel-performance/*.pdf 2>/dev/null | head -1)
if [ -n "\\$PERF_PDF" ]; then
  upload_to_slack "\\$PERF_PDF" "\\$(basename \\$PERF_PDF)" "📕 PERFORMANCE CAROUSEL 📕\\n\\n[PERF_CAROUSEL_CAPTION]"
fi

if [ -f "./linkedin-performance-infographic-\\$DATE.png" ]; then
  upload_to_slack "./linkedin-performance-infographic-\\$DATE.png" "linkedin-performance-infographic.png" "📊 PERFORMANCE DATA VISUAL 📊\\n\\n[PERF_INFOGRAPHIC_CAPTION]"
fi

# Run daily newspaper HTML compiler
node -e "const { execSync } = require('child_process'); execSync('python3 generate_daily_paper.py \\$DATE', {stdio: 'inherit'});" || python3 generate_daily_paper.py "\\$DATE"
\`\`\`

Replace \`[CAROUSEL_CAPTION]\` and \`[INFOGRAPHIC_CAPTION]\` with the actual captions from Step 3, and \`[PERF_CAROUSEL_CAPTION]\` and \`[PERF_INFOGRAPHIC_CAPTION]\` with the performance captions from Step 7.

---

## STEP 10 — Print completion report

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Daily LinkedIn Content — {DATE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reddit-based posts (4):
...
✓ Interactive Newspaper HTML → Generated (Downloads)
✓ Carousel → Slack (PDF uploaded)
✓ Infographic → Slack (PNG uploaded)
Performance-driven posts (5):
✓ Contrarian + Loaded Poll + AI-news (text) → Slack
✓ Story carousel → Slack (PDF uploaded)
✓ Data visual → Slack (PNG uploaded)
...
\`\`\`
`;
    content += replacement;
    fs.writeFileSync(filepath, content, 'utf8');
    console.log("Successfully updated Step 8-10 with Slack support in SKILL.md");
} else {
    console.log("Could not find ## STEP 8 in SKILL.md");
}
