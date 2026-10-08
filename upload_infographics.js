const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
require('dotenv').config();

const TOKEN = process.env.SLACK_BOT_TOKEN;
const CHANNEL = process.env.SLACK_CHANNEL_ID;

if (!TOKEN || !CHANNEL) {
  console.error("Missing SLACK_BOT_TOKEN or SLACK_CHANNEL_ID in .env");
  process.exit(1);
}

const posts = [
  {
    type: 'RANKED_BARS',
    filePath: path.join(__dirname, 'output', 'infographics', '01_ranked_bars.png'),
    title: 'RANKED_BARS',
    comment: `*Type: RANKED_BARS*\n*Title:* Where missed calls hurt the most.\n\n*Description:* A ranked breakdown analyzing inbound call loss rates across high-ticket service industries. Real estate brokerages (44%) and medical/dental practices (38%) suffer the highest lead leakage during standard business hours when front desks are busy or short-staffed.`
  },
  {
    type: 'DONUT_BREAKDOWN',
    filePath: path.join(__dirname, 'output', 'infographics', '02_donut_breakdown.png'),
    title: 'DONUT_BREAKDOWN',
    comment: `*Type: DONUT_BREAKDOWN*\n*Title:* What happens when you miss the call.\n\n*Description:* A distribution breakdown mapping consumer dropoff behavior when an inbound call hits voicemail. 67% immediately hang up and dial the next competitor on Google, meaning unanswered calls directly fund rival businesses.`
  },
  {
    type: 'TIMELINE_SHIFT',
    filePath: path.join(__dirname, 'output', 'infographics', '03_timeline_shift.png'),
    title: 'TIMELINE_SHIFT',
    comment: `*Type: TIMELINE_SHIFT*\n*Title:* The speed gap is widening (2021 vs 2026).\n\n*Description:* A timeline shift illustrating how inbound response latency collapsed from a 4.2-hour voicemail backlog in 2021 down to 3 seconds with AI voice receptionists in 2026. Speed is retention.`
  },
  {
    type: 'COMPARISON_SPLIT',
    filePath: path.join(__dirname, 'output', 'infographics', '04_comparison_split.png'),
    title: 'COMPARISON_SPLIT',
    comment: `*Type: COMPARISON_SPLIT*\n*Title:* Legacy IVR vs AI Voice Agent.\n\n*Description:* A head-to-head operational breakdown comparing legacy push-button IVR phone trees against autonomous conversational AI receptionists across call abandonment, first-call resolution, hold times, and 24/7 coverage.`
  },
  {
    type: 'HERO_NUMBER',
    filePath: path.join(__dirname, 'output', 'infographics', '05_hero_number.png'),
    title: 'HERO_NUMBER',
    comment: `*Type: HERO_NUMBER*\n*Title:* $126k lost each year to missed inbound calls.\n\n*Description:* A single-stat hero breakdown highlighting the $126,000 in annual revenue that the average mid-market clinic or service practice loses silently to after-hours calls and unreturned voicemails.`
  }
];

async function uploadPost(post, index) {
  console.log(`\n[${index + 1}/5] Uploading ${post.type}...`);
  if (!fs.existsSync(post.filePath)) {
    throw new Error(`File not found: ${post.filePath}`);
  }

  const stat = fs.statSync(post.filePath);
  const fileName = path.basename(post.filePath);

  // 1. Get upload URL
  const getUrlCmd = `curl.exe -s -X POST "https://slack.com/api/files.getUploadURLExternal" -H "Authorization: Bearer ${TOKEN}" -d "filename=${encodeURIComponent(fileName)}&length=${stat.size}"`;
  const getUrlRes = JSON.parse(execSync(getUrlCmd).toString());

  if (!getUrlRes.ok) {
    throw new Error(`Failed getUploadURLExternal for ${post.type}: ${getUrlRes.error}`);
  }

  const uploadUrl = getUrlRes.upload_url;
  const fileId = getUrlRes.file_id;

  // 2. Upload the file to the presigned external URL
  execSync(`curl.exe -s -F "file=@${post.filePath}" "${uploadUrl}"`);

  // 3. Complete upload
  const payload = JSON.stringify({
    files: [{ id: fileId, title: post.title }],
    channel_id: CHANNEL,
    initial_comment: post.comment
  });

  const payloadFile = path.join(__dirname, `slack_payload_${post.type}.json`);
  fs.writeFileSync(payloadFile, payload, 'utf8');

  const completeCmd = `curl.exe -s -X POST "https://slack.com/api/files.completeUploadExternal" -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json; charset=utf-8" -d @"${payloadFile}"`;
  const completeRes = JSON.parse(execSync(completeCmd).toString());

  // Clean payload file
  try { fs.unlinkSync(payloadFile); } catch(e) {}

  if (!completeRes.ok) {
    throw new Error(`Failed completeUploadExternal for ${post.type}: ${JSON.stringify(completeRes)}`);
  }

  console.log(`✓ Successfully uploaded [${post.type}] to Slack!`);
}

async function main() {
  console.log(`Starting Slack upload for all 5 infographics to channel ${CHANNEL}...`);
  for (let i = 0; i < posts.length; i++) {
    await uploadPost(posts[i], i);
    // Brief 1s delay between uploads
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log('\nAll 5 infographics have been successfully posted to Slack!');
}

main().catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});
