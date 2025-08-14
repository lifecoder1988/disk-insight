const fs = require('fs');
const path = require('path');

// 模拟DOMParser环境
const { JSDOM } = require('jsdom');
const dom = new JSDOM();
global.DOMParser = dom.window.DOMParser;

// 复制XML解析器的辅助函数
function getElementText(element) {
  return element ? element.textContent || '' : '';
}

function getFirstElement(parent, tagName) {
  if (!parent) return null;
  if (parent.getElementsByTagName) {
    const elements = parent.getElementsByTagName(tagName);
    return elements.length > 0 ? elements[0] : null;
  }
  return null;
}

function getAllElements(parent, tagName) {
  if (!parent) return [];
  if (parent.getElementsByTagName) {
    return Array.from(parent.getElementsByTagName(tagName));
  }
  return [];
}

// 读取测试XML文件
const xmlPath = path.join(__dirname, 'test', 'RND4K_Q32T16_READ.xml');
const xmlContent = fs.readFileSync(xmlPath, 'utf8');

console.log('Testing XML Parser...');
console.log('XML file size:', xmlContent.length);

try {
  // 解析XML
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
  
  console.log('\n=== XML Document ===');
  console.log('Root element:', xmlDoc.documentElement.tagName);
  
  // 检查Results元素
  const resultsElement = getFirstElement(xmlDoc, 'Results');
  console.log('Results element found:', !!resultsElement);
  
  // 获取所有TimeSpan元素
  const allTimeSpanElements = getAllElements(xmlDoc, 'TimeSpan');
  console.log('Total TimeSpan elements found:', allTimeSpanElements.length);
  
  // 第一个TimeSpan是Profile中的，第二个是Results中的
  const timeSpanElement = allTimeSpanElements.length > 1 ? allTimeSpanElements[1] : allTimeSpanElements[0];
  console.log('Using TimeSpan element:', !!timeSpanElement);
  
  if (timeSpanElement) {
    console.log('TimeSpan children count:', timeSpanElement.children.length);
    console.log('TimeSpan child names:', Array.from(timeSpanElement.children).map(child => child.tagName));
    
    // 检查CPU利用率
    const cpuUtilizationElement = getFirstElement(timeSpanElement, 'CpuUtilization');
    console.log('CpuUtilization element found:', !!cpuUtilizationElement);
    
    if (cpuUtilizationElement) {
      const cpuElements = getAllElements(cpuUtilizationElement, 'CPU');
      console.log('CPU elements found:', cpuElements.length);
      
      if (cpuElements.length > 0) {
        const firstCpu = cpuElements[0];
        console.log('First CPU usage:', getElementText(getFirstElement(firstCpu, 'UsagePercent')));
      }
    }
    
    // 检查Thread元素
    const threadElements = getAllElements(timeSpanElement, 'Thread');
    console.log('Thread elements found:', threadElements.length);
    
    if (threadElements.length > 0) {
      const firstThread = threadElements[0];
      const threadId = getElementText(getFirstElement(firstThread, 'Id'));
      console.log('First Thread ID:', threadId);
      
      const threadTargetElement = getFirstElement(firstThread, 'Target');
      if (threadTargetElement) {
        const threadPath = getElementText(getFirstElement(threadTargetElement, 'Path'));
        console.log('First Thread Path:', threadPath);
      }
    }
  }
  
} catch (error) {
  console.error('Error parsing XML:', error);
}