const fs = require('fs');

// Read the XML file
const xmlContent = fs.readFileSync('./test/RND4K_Q32T16_READ.xml', 'utf8');

// Function to parse XML values
function parseXmlValue(xml, tagName) {
  const regex = new RegExp(`<${tagName}>(.*?)</${tagName}>`, 's');
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

// Function to parse XML arrays
function parseXmlArray(xml, tagName) {
  const regex = new RegExp(`<${tagName}>(.*?)</${tagName}>`, 'gs');
  const matches = [];
  let match;
  while ((match = regex.exec(xml)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

// Extract Results section
const resultsMatch = xmlContent.match(/<Results>(.*?)<\/Results>/s);
if (!resultsMatch) {
  console.log('Results section not found');
  process.exit(1);
}

let resultsSection = resultsMatch[1];
console.log('Results section found: YES');

// Remove Profile section from Results
const profileMatch = resultsSection.match(/<Profile>.*?<\/Profile>/s);
if (profileMatch) {
  resultsSection = resultsSection.replace(profileMatch[0], '');
  console.log('Profile section removed from Results');
}

// Extract Thread sections
const threadSections = parseXmlArray(resultsSection, 'Thread');
console.log(`Found ${threadSections.length} threads`);

if (threadSections.length > 0) {
  console.log('\nFirst thread data:');
  const firstThread = threadSections[0];
  
  const threadId = parseXmlValue(firstThread, 'Id');
  const path = parseXmlValue(firstThread, 'Path');
  const bytesCount = parseXmlValue(firstThread, 'BytesCount');
  const fileSize = parseXmlValue(firstThread, 'FileSize');
  const ioCount = parseXmlValue(firstThread, 'IOCount');
  const readBytes = parseXmlValue(firstThread, 'ReadBytes');
  const readCount = parseXmlValue(firstThread, 'ReadCount');
  const writeBytes = parseXmlValue(firstThread, 'WriteBytes');
  const writeCount = parseXmlValue(firstThread, 'WriteCount');
  
  console.log('Thread ID:', threadId);
  console.log('Path:', path);
  console.log('Bytes Count:', bytesCount);
  console.log('File Size:', fileSize);
  console.log('IO Count:', ioCount);
  console.log('Read Bytes:', readBytes);
  console.log('Read Count:', readCount);
  console.log('Write Bytes:', writeBytes);
  console.log('Write Count:', writeCount);
  
  console.log('\nParsed thread object:');
  const threadObj = {
    id: parseInt(threadId) || 0,
    target: {
      path,
      bytesCount: parseInt(bytesCount) || 0,
      fileSize: parseInt(fileSize) || 0,
      ioCount: parseInt(ioCount) || 0,
      readBytes: parseInt(readBytes) || 0,
      readCount: parseInt(readCount) || 0,
      writeBytes: parseInt(writeBytes) || 0,
      writeCount: parseInt(writeCount) || 0
    }
  };
  console.log(JSON.stringify(threadObj, null, 2));
} else {
  console.log('No threads found!');
}