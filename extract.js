const fs = require('fs');
const lines = fs.readFileSync('C:\\Users\\SUBHASH B\\.gemini\\antigravity-ide\\brain\\9b8b4158-51d7-453c-a3e9-38033725b2df\\.system_generated\\logs\\transcript.jsonl', 'utf-8').split('\n');
for (const line of lines) {
  if (line.includes('job-scraper.js') && line.includes('parseJobUrl') && line.includes('JSDOM')) {
    try {
      const obj = JSON.parse(line);
      if (obj.tool_calls) {
        for (const tc of obj.tool_calls) {
          if (tc.function.name === 'write_to_file' || tc.function.name === 'replace_file_content') {
            const args = JSON.parse(tc.function.arguments);
            if (args.TargetFile && args.TargetFile.includes('job-scraper.js') && args.CodeContent) {
              fs.writeFileSync('d:\\pathhfinder\\pathfinder-ai\\actions\\job-scraper.js', args.CodeContent);
              console.log('Restored job-scraper.js');
              return;
            }
          }
        }
      }
    } catch(e) {}
  }
}
console.log('Not found');
