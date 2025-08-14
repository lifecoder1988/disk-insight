export interface DiskspdResults {
  Results: {
    System: {
      ComputerName: string;
      Tool: {
        Version: string;
        VersionDate: string;
      };
      RunTime: string;
      PowerScheme: {
        Name: string;
        Guid: string;
      };
      ProcessorTopology: {
        Heterogeneous: string;
        Group: {
          Group: string;
          MaximumProcessors: string;
          ActiveProcessors: string;
          ActiveProcessorMask: string;
        };
        Node: {
          Node: string;
          Group: {
            Group: string;
            Mask: string;
          };
        };
        Socket: {
          Socket: string;
          Group: {
            Group: string;
            Mask: string;
          };
        };
        Core: {
          Group: string;
          Core: string;
          Mask: string;
          EfficiencyClass: string;
        }[];
      };
    };
    Profile: {
      Progress: string;
      ResultFormat: string;
      Verbose: string;
      TimeSpans: {
        TimeSpan: {
          CompletionRoutines: string;
          MeasureLatency: string;
          CalculateIopsStdDev: string;
          DisableAffinity: string;
          Duration: string;
          Warmup: string;
          Cooldown: string;
          ThreadCount: string;
          RequestCount: string;
          IoBucketDuration: string;
          RandSeed: string;
          Targets: {
            Target: {
              Path: string;
              BlockSize: string;
              BaseFileOffset: string;
              SequentialScan: string;
              RandomAccess: string;
              TemporaryFile: string;
              UseLargePages: string;
              DisableOSCache: string;
              WriteThrough: string;
              WriteBufferContent?: {
                Pattern: string;
              };
              ParallelAsyncIO: string;
              StrideSize: string;
              InterlockedSequential: string;
              ThreadStride: string;
              MaxFileSize: string;
              RequestCount: string;
              WriteRatio: string;
              Throughput: string;
              ThreadsPerFile: string;
              IOPriority: string;
              Weight: string;
            };
          };
        };
      };
    };
    TimeSpan: {
      TestTimeSeconds: string;
      ThreadCount: string;
      RequestCount: string;
      ProcCount: string;
      CpuUtilization: {
        CPU: {
          Socket: string;
          Node: string;
          Group: string;
          Core: string;
          EfficiencyClass: string;
          Id: string;
          UsagePercent: string;
          UserPercent: string;
          KernelPercent: string;
          IdlePercent: string;
        }[];
        Average: {
          UsagePercent: string;
          UserPercent: string;
          KernelPercent: string;
          IdlePercent: string;
        };
      };
      Thread: {
        Id: string;
        Target: {
          Path: string;
          BytesCount: string;
          FileSize: string;
          IOCount: string;
          ReadBytes: string;
          ReadCount: string;
          WriteBytes: string;
          WriteCount: string;
        };
      }[];
    };
  };
}

export interface ProcessedData {
  fileName: string;
  testName: string;
  testType: 'READ' | 'WRITE';
  blockSize: number;
  duration: number;
  totalIOPS: number;
  totalThroughputMBps: number;
  avgCpuUsage: number;
  systemInfo: {
    computerName: string;
    toolVersion: string;
    toolVersionDate: string;
    runTime: string;
    powerScheme: string;
    processorInfo: {
      maxProcessors: number;
      activeProcessors: number;
      coreCount: number;
    };
  };
  profileInfo: {
    progress: number;
    resultFormat: string;
    verbose: boolean;
    measureLatency: boolean;
    disableAffinity: boolean;
    warmup: number;
    cooldown: number;
    ioBucketDuration: number;
    randSeed: number;
    target: {
      path: string;
      baseFileOffset: number;
      sequentialScan: boolean;
      randomAccess: boolean;
      temporaryFile: boolean;
      useLargePages: boolean;
      disableOSCache: boolean;
      writeThrough: boolean;
      writeBufferPattern: string;
      parallelAsyncIO: boolean;
      threadStride: number;
      maxFileSize: number;
      requestCount: number;
      writeRatio: number;
      throughput: number;
      threadsPerFile: number;
      ioPriority: number;
      weight: number;
    };
  };
  timeSpanInfo: {
    testTimeSeconds: number;
    threadCount: number;
    requestCount: number;
    procCount: number;
  };
  cpuUtilization: {
    individual: {
      socket: number;
      node: number;
      group: number;
      core: number;
      efficiencyClass: number;
      id: number;
      usagePercent: number;
      userPercent: number;
      kernelPercent: number;
      idlePercent: number;
    }[];
    average: {
      usagePercent: number;
      userPercent: number;
      kernelPercent: number;
      idlePercent: number;
    };
  };
  threads: {
    id: number;
    target: {
      path: string;
      bytesCount: number;
      fileSize: number;
      ioCount: number;
      readBytes: number;
      readCount: number;
      writeBytes: number;
      writeCount: number;
    };
  }[];
  cpuCores: {
    id: number;
    usage: number;
    user: number;
    kernel: number;
    idle: number;
  }[];
}