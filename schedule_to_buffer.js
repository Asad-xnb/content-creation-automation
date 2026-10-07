const https = require('https');
const fs = require('fs');
require('dotenv').config();

const TOKEN = process.env.BUFFER_API_KEY;
const ORG_ID = '6a9fdda2a764a2a7703c5e76';

function createIdea(text) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      query: `mutation CreateIdea($orgId: String!, $text: String!) {
        createIdea(input: {
          organizationId: $orgId,
          content: {
            text: $text
          }
        }) {
          ... on Idea {
            id
          }
          ... on GenericError {
            message
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
  if (args.length === 0) {
    console.log("Usage: node schedule_to_buffer.js <file_with_text>");
    process.exit(1);
  }

  const file = args[0];
  if (!fs.existsSync(file)) {
    console.error("File not found:", file);
    process.exit(1);
  }

  const text = fs.readFileSync(file, 'utf8').trim();
  if (!text) {
    console.log("Empty file, skipping.");
    return;
  }

  console.log(`Scheduling to Buffer (${file})...`);
  try {
    const result = await createIdea(text);
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
