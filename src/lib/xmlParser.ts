// XML parser for diskspd results using DOMParser
import { ProcessedData } from '@/types/diskspd';

// Helper function to get text content from an element
function getElementText(element: Element | null): string {
  return element?.textContent?.trim() || '';
}

// Helper function to get attribute value from an element
function getElementAttribute(element: Element | null, attributeName: string): string {
  return element?.getAttribute(attributeName) || '';
}

// Helper function to get first child element by tag name
function getFirstElement(parent: Element | Document | null, tagName: string): Element | null {
  return parent?.querySelector(tagName) || null;
}

// Helper function to get all child elements by tag name
function getAllElements(parent: Element | Document | null, tagName: string): Element[] {
  return parent ? Array.from(parent.querySelectorAll(tagName)) : [];
}

export function processDiskspdXml(xmlContent: string, fileName: string): ProcessedData {
  // Parse XML using DOMParser
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
  
  // Check for parsing errors
  const parseError = xmlDoc.querySelector('parsererror');
  if (parseError) {
    throw new Error('XML parsing failed: ' + parseError.textContent);
  }
  
  // Extract basic test information
  const testName = fileName.replace('.xml', '');
  const testType = fileName.includes('WRITE') ? 'WRITE' : 'READ';
  
  // Extract system information
  const systemElement = getFirstElement(xmlDoc, 'System');
  const computerName = getElementText(getFirstElement(systemElement, 'ComputerName'));
  const toolElement = getFirstElement(systemElement, 'Tool');
  const toolVersion = getElementText(getFirstElement(toolElement, 'Version'));
  const toolVersionDate = getElementText(getFirstElement(toolElement, 'VersionDate'));
  const runTime = getElementText(getFirstElement(systemElement, 'RunTime'));
  const powerSchemeElement = getFirstElement(systemElement, 'PowerScheme');
  const powerScheme = getElementAttribute(powerSchemeElement, 'Name');
  
  // Extract processor topology information
  const processorTopologyElement = getFirstElement(systemElement, 'ProcessorTopology');
  const groupElement = getFirstElement(processorTopologyElement, 'Group');
  const maxProcessors = parseInt(getElementAttribute(groupElement, 'MaximumProcessors')) || 0;
  const activeProcessors = parseInt(getElementAttribute(groupElement, 'ActiveProcessors')) || 0;
  const coreElements = getAllElements(processorTopologyElement, 'Core');
  const coreCount = coreElements.length;
  
  // Extract profile information
  const profileElement = getFirstElement(xmlDoc, 'Profile');
  const progress = parseInt(getElementText(getFirstElement(profileElement, 'Progress'))) || 0;
  const resultFormat = getElementText(getFirstElement(profileElement, 'ResultFormat'));
  const verbose = getElementText(getFirstElement(profileElement, 'Verbose')) === 'true';
  const timeSpansElement = getFirstElement(profileElement, 'TimeSpans');
  const profileTimeSpanElement = getFirstElement(timeSpansElement, 'TimeSpan');
  const measureLatency = getElementText(getFirstElement(profileTimeSpanElement, 'MeasureLatency')) === 'true';
  const disableAffinity = getElementText(getFirstElement(profileTimeSpanElement, 'DisableAffinity')) === 'true';
  const warmup = parseInt(getElementText(getFirstElement(profileTimeSpanElement, 'Warmup'))) || 0;
  const cooldown = parseInt(getElementText(getFirstElement(profileTimeSpanElement, 'Cooldown'))) || 0;
  const ioBucketDuration = parseInt(getElementText(getFirstElement(profileTimeSpanElement, 'IoBucketDuration'))) || 0;
  const randSeed = parseInt(getElementText(getFirstElement(profileTimeSpanElement, 'RandSeed'))) || 0;
  
  // Extract target information
  const targetsElement = getFirstElement(profileTimeSpanElement, 'Targets');
  const targetElement = getFirstElement(targetsElement, 'Target');
  const path = getElementText(getFirstElement(targetElement, 'Path'));
  const blockSize = parseInt(getElementText(getFirstElement(targetElement, 'BlockSize'))) || 4096;
  const baseFileOffset = parseInt(getElementText(getFirstElement(targetElement, 'BaseFileOffset'))) || 0;
  const sequentialScan = getElementText(getFirstElement(targetElement, 'SequentialScan')) === 'true';
  const randomAccess = getElementText(getFirstElement(targetElement, 'RandomAccess')) === 'true';
  const temporaryFile = getElementText(getFirstElement(targetElement, 'TemporaryFile')) === 'true';
  const useLargePages = getElementText(getFirstElement(targetElement, 'UseLargePages')) === 'true';
  const disableOSCache = getElementText(getFirstElement(targetElement, 'DisableOSCache')) === 'true';
  const writeThrough = getElementText(getFirstElement(targetElement, 'WriteThrough')) === 'true';
  const writeBufferContentElement = getFirstElement(targetElement, 'WriteBufferContent');
  const writeBufferPattern = getElementText(getFirstElement(writeBufferContentElement, 'Pattern'));
  const parallelAsyncIO = getElementText(getFirstElement(targetElement, 'ParallelAsyncIO')) === 'true';
  const threadStride = parseInt(getElementText(getFirstElement(targetElement, 'ThreadStride'))) || 0;
  const maxFileSize = parseInt(getElementText(getFirstElement(targetElement, 'MaxFileSize'))) || 0;
  const targetRequestCount = parseInt(getElementText(getFirstElement(targetElement, 'RequestCount'))) || 0;
  const writeRatio = parseInt(getElementText(getFirstElement(targetElement, 'WriteRatio'))) || 0;
  const throughput = parseInt(getElementText(getFirstElement(targetElement, 'Throughput'))) || 0;
  const threadsPerFile = parseInt(getElementText(getFirstElement(targetElement, 'ThreadsPerFile'))) || 0;
  const ioPriority = parseInt(getElementText(getFirstElement(targetElement, 'IOPriority'))) || 0;
  const weight = parseInt(getElementText(getFirstElement(targetElement, 'Weight'))) || 0;
  
  // Extract TimeSpan information from Results section (not Profile section)
  // There are two TimeSpan elements: one in Profile, one in Results
  // We need the second one (Results TimeSpan)
  const allTimeSpanElements = getAllElements(xmlDoc, 'TimeSpan');
  const timeSpanElement = allTimeSpanElements.length > 1 ? allTimeSpanElements[1] : allTimeSpanElements[0];
  
  const testTimeSeconds = parseFloat(getElementText(getFirstElement(timeSpanElement, 'TestTimeSeconds'))) || 0;
  const duration = testTimeSeconds;
  const timeSpanThreadCount = parseInt(getElementText(getFirstElement(timeSpanElement, 'ThreadCount'))) || 0;
  const timeSpanRequestCount = parseInt(getElementText(getFirstElement(timeSpanElement, 'RequestCount'))) || 0;
  const procCount = parseInt(getElementText(getFirstElement(timeSpanElement, 'ProcCount'))) || 0;
  
  // Extract CPU utilization data
  const cpuUtilizationElement = getFirstElement(timeSpanElement, 'CpuUtilization');
  
  // Extract individual CPU data
  const cpuElements = getAllElements(cpuUtilizationElement, 'CPU');
  const individualCpus = cpuElements.map(cpuElement => ({
    socket: parseInt(getElementText(getFirstElement(cpuElement, 'Socket'))) || 0,
    node: parseInt(getElementText(getFirstElement(cpuElement, 'Node'))) || 0,
    group: parseInt(getElementText(getFirstElement(cpuElement, 'Group'))) || 0,
    core: parseInt(getElementText(getFirstElement(cpuElement, 'Core'))) || 0,
    efficiencyClass: parseInt(getElementText(getFirstElement(cpuElement, 'EfficiencyClass'))) || 0,
    id: parseInt(getElementText(getFirstElement(cpuElement, 'Id'))) || 0,
    usagePercent: parseFloat(getElementText(getFirstElement(cpuElement, 'UsagePercent'))) || 0,
    userPercent: parseFloat(getElementText(getFirstElement(cpuElement, 'UserPercent'))) || 0,
    kernelPercent: parseFloat(getElementText(getFirstElement(cpuElement, 'KernelPercent'))) || 0,
    idlePercent: parseFloat(getElementText(getFirstElement(cpuElement, 'IdlePercent'))) || 0
  }));
  
  // Extract average CPU data
  const averageElement = getFirstElement(cpuUtilizationElement, 'Average');
  const averageCpu = {
    usagePercent: parseFloat(getElementText(getFirstElement(averageElement, 'UsagePercent'))) || 0,
    userPercent: parseFloat(getElementText(getFirstElement(averageElement, 'UserPercent'))) || 0,
    kernelPercent: parseFloat(getElementText(getFirstElement(averageElement, 'KernelPercent'))) || 0,
    idlePercent: parseFloat(getElementText(getFirstElement(averageElement, 'IdlePercent'))) || 0
  };
  
  // Extract CPU average usage (for backward compatibility)
  const avgCpuUsage = averageCpu.usagePercent;
  
  // Extract thread data from TimeSpan section
  const threadElements = getAllElements(timeSpanElement, 'Thread');
  const threads = threadElements.map((threadElement) => {
    const threadId = parseInt(getElementText(getFirstElement(threadElement, 'Id'))) || 0;
    const threadTargetElement = getFirstElement(threadElement, 'Target');
    const threadPath = getElementText(getFirstElement(threadTargetElement, 'Path')) || '';
    const bytesCount = parseInt(getElementText(getFirstElement(threadTargetElement, 'BytesCount'))) || 0;
    const fileSize = parseInt(getElementText(getFirstElement(threadTargetElement, 'FileSize'))) || 0;
    const ioCount = parseInt(getElementText(getFirstElement(threadTargetElement, 'IOCount'))) || 0;
    const readBytes = parseInt(getElementText(getFirstElement(threadTargetElement, 'ReadBytes'))) || 0;
    const readCount = parseInt(getElementText(getFirstElement(threadTargetElement, 'ReadCount'))) || 0;
    const writeBytes = parseInt(getElementText(getFirstElement(threadTargetElement, 'WriteBytes'))) || 0;
    const writeCount = parseInt(getElementText(getFirstElement(threadTargetElement, 'WriteCount'))) || 0;
    
    return {
      id: threadId,
      target: {
        path: threadPath,
        bytesCount,
        fileSize,
        ioCount,
        readBytes,
        readCount,
        writeBytes,
        writeCount
      }
    };
  });
  
  // Extract CPU core data (using the same CPU elements from utilization)
  const cpuCores = individualCpus.map((cpu, index) => ({
    id: index,
    usage: cpu.usagePercent,
    user: cpu.userPercent,
    kernel: cpu.kernelPercent,
    idle: cpu.idlePercent
  }));
  
  // Calculate totals
  const totalIOPS = threads.reduce((sum, thread) => sum + Math.round(thread.target.ioCount / duration), 0);
  const totalThroughputMBps = threads.reduce((sum, thread) => sum + Math.round((thread.target.bytesCount / (1024 * 1024)) / duration * 100) / 100, 0);
  
  return {
    fileName,
    testName,
    testType,
    blockSize,
    duration,
    totalIOPS,
    totalThroughputMBps,
    avgCpuUsage,
    systemInfo: {
      computerName,
      toolVersion,
      toolVersionDate,
      runTime,
      powerScheme,
      processorInfo: {
        maxProcessors,
        activeProcessors,
        coreCount
      }
    },
    profileInfo: {
      progress,
      resultFormat,
      verbose,
      measureLatency,
      disableAffinity,
      warmup,
      cooldown,
      ioBucketDuration,
      randSeed,
      target: {
        path,
        baseFileOffset,
        sequentialScan,
        randomAccess,
        temporaryFile,
        useLargePages,
        disableOSCache,
        writeThrough,
        writeBufferPattern,
        parallelAsyncIO,
        threadStride,
        maxFileSize,
        requestCount: targetRequestCount,
        writeRatio,
        throughput,
        threadsPerFile,
        ioPriority,
        weight
      }
    },
    timeSpanInfo: {
      testTimeSeconds,
      threadCount: timeSpanThreadCount,
      requestCount: timeSpanRequestCount,
      procCount
    },
    cpuUtilization: {
      individual: individualCpus,
      average: averageCpu
    },
    threads,
    cpuCores
  };
}