const { execSync } = require('child_process');
const fs = require('fs');
require('dotenv').config();

const TOKEN = process.env.SLACK_BOT_TOKEN;
const CHANNEL = process.env.SLACK_CHANNEL_ID;

const args = process.argv.slice(2);
const filePath = args[0];
const caption = args[1];

async function uploadFile() {
  const stat = fs.statSync(filePath);
  const fileName = filePath.split(/[\\/]/).pop();
  
  // get URL
  const getUrlCmd = `curl.exe -s -X POST "https://slack.com/api/files.getUploadURLExternal" -H "Authorization: Bearer ${TOKEN}" -d "filename=${fileName}&length=${stat.size}"`;
  const getUrlRes = JSON.parse(execSync(getUrlCmd).toString());
  
  if (!getUrlRes.ok) throw new Error("Failed get URL: " + getUrlRes.error);
  
  const uploadUrl = getUrlRes.upload_url;
  const fileId = getUrlRes.file_id;

  // upload file
  execSync(`curl.exe -s -F "file=@${filePath}" "${uploadUrl}"`);

  // complete
  const payload = JSON.stringify({
    files: [{ id: fileId, title: fileName }],
    channel_id: CHANNEL,
    initial_comment: caption
  });
  
  fs.writeFileSync('slack_payload.json', payload);
  
  const completeCmd = `curl.exe -s -X POST "https://slack.com/api/files.completeUploadExternal" -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json" -d @slack_payload.json`;
  const completeRes = JSON.parse(execSync(completeCmd).toString());
  
  if (!completeRes.ok) throw new Error("Failed complete: " + JSON.stringify(completeRes.error));
  
  console.log("Successfully uploaded to Slack!");
}

uploadFile().catch(console.error);
