const fs = require('fs');

// Simple XML parser function
function parseXmlValue(xml, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([^<]*)</${tagName}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

// Read the XML file
const xmlContent = fs.readFileSync('./test/RND4K_Q32T16_READ.xml', 'utf8');

// Extract Results section
const resultsSection = xmlContent.match(/<Results>[\s\S]*?<\/Results>/i)?.[0] || '';
console.log('Results section found:', resultsSection ? 'YES' : 'NO');

// Extract TimeSpan section from Results (skip Profile section)
// First, remove the Profile section to avoid conflicts
const resultsWithoutProfile = resultsSection.replace(/<Profile>[\s\S]*?<\/Profile>/i, '');
const timeSpanSection = resultsWithoutProfile.match(/<TimeSpan>[\s\S]*?<\/TimeSpan>/i)?.[0] || '';
console.log('TimeSpan section found:', timeSpanSection ? 'YES' : 'NO');
console.log('TimeSpan section preview:', timeSpanSection.substring(0, 300));

// Extract TestTimeSeconds
const testTimeSecondsStr = parseXmlValue(timeSpanSection, 'TestTimeSeconds');
console.log('TestTimeSeconds string:', testTimeSecondsStr);
const testTimeSeconds = parseFloat(testTimeSecondsStr) || 0;
console.log('Parsed testTimeSeconds:', testTimeSeconds);

// Extract other values
const threadCount = parseInt(parseXmlValue(timeSpanSection, 'ThreadCount')) || 0;
const requestCount = parseInt(parseXmlValue(timeSpanSection, 'RequestCount')) || 0;
const procCount = parseInt(parseXmlValue(timeSpanSection, 'ProcCount')) || 0;

console.log('ThreadCount:', threadCount);
console.log('RequestCount:', requestCount);
console.log('ProcCount:', procCount);