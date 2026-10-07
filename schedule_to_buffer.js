const https = require('https');
const fs = require('fs');
const { execSync } = require('child_process');
require('dotenv').config();

const TOKEN = process.env.BUFFER_API_KEY;
const ORG_ID = '6a9fdda2a764a2a7703c5e76';

function uploadToCatbox(filePath) {
  try {
    const output = execSync(`curl.exe -s -F "reqtype=fileupload" -F "fileToUpload=@${filePath}" https://catbox.moe/user/api.php`);
    return output.toString().trim();
  } catch (err) {
    console.error("Failed to upload to catbox.moe", err.message);
    return null;
  }
}

function createIdea(text, mediaFiles) {
  return new Promise((resolve, reject) => {
    let mediaInput = "";
    if (mediaFiles && mediaFiles.length > 0) {
      let items = mediaFiles.map(file => {
        const url = uploadToCatbox(file);
        if (!url) return null;
        
        let type = 'image';
        if (file.toLowerCase().endsWith('.pdf')) type = 'document';
        else if (file.toLowerCase().endsWith('.mp4')) type = 'video';
        
        return `{ type: ${type}, url: "${url}" }`;
      }).filter(item => item !== null);

      if (items.length > 0) {
        mediaInput = `, media: [${items.join(', ')}]`;
      }
    }

    const data = JSON.stringify({
      query: `mutation CreateIdea($orgId: ID!, $text: String!) {
        createIdea(input: {
          organizationId: $orgId,
          content: {
            text: $text
            ${mediaInput}
          }
        }) {
          ... on Idea {
            id
          }
          
        }
      }`,
      variables: {
        orgId: ORG_ID,
        text: text
      }
    });

    const req = https.request('https://api.buffer.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(d));
        } catch(e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  const args = process.argv.slice(2);
  let textFile = null;
  let mediaFiles = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--media') {
      mediaFiles.push(args[++i]);
    } else if (args[i] === '--text') {
      textFile = args[++i];
    } else {
      if (!textFile) textFile = args[i];
    }
  }

  if (!textFile) {
    console.log("Usage: node schedule_to_buffer.js <file_with_text> [--media <file.png>]");
    process.exit(1);
  }

  let text = '';
  if (fs.existsSync(textFile)) {
    text = fs.readFileSync(textFile, 'utf8').trim();
  } else {
    // maybe it's just raw text passed in
    text = textFile; 
  }

  if (!text) {
    console.log("Empty text, skipping.");
    return;
  }

  console.log(`Scheduling to Buffer...`);
  if (mediaFiles.length > 0) {
    console.log(`With media: ${mediaFiles.join(', ')}`);
  }

  try {
    const result = await createIdea(text, mediaFiles);
    if (result.errors || (result.data && result.data.createIdea && result.data.createIdea.message)) {
      console.error("Error creating idea:", JSON.stringify(result, null, 2));
    } else {
      console.log("Successfully created idea in Buffer! ID:", result.data.createIdea.id);
    }
  } catch (e) {
    console.error("Request failed:", e);
  }
}

main();
