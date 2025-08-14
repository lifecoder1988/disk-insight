'use client';

import { ProcessedData } from '@/types/diskspd';

interface PerformanceChartProps {
  data: ProcessedData[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  if (data.length === 0) return null;

  // Find max values for scaling
  const maxIOPS = Math.max(...data.map(d => d.totalIOPS));
  const maxThroughput = Math.max(...data.map(d => d.totalThroughputMBps));
  const maxCPU = Math.max(...data.map(d => d.avgCpuUsage));

  return (
    <div className="space-y-8">
      {/* Overall Performance Comparison */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Overall Performance Comparison</h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <h4 className="font-medium text-gray-700 mb-2">{item.testName}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* IOPS Bar */}
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>IOPS</span>
                    <span>{(item.totalIOPS || 0).toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${(item.totalIOPS / maxIOPS) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Throughput Bar */}
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Throughput (MB/s)</span>
                    <span>{item.totalThroughputMBps.toFixed(1)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-green-500 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${(item.totalThroughputMBps / maxThroughput) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* CPU Usage Bar */}
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>CPU Usage (%)</span>
                    <span>{item.avgCpuUsage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-yellow-500 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${(item.avgCpuUsage / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thread Performance Details */}
      {data.map((testData, testIndex) => (
        <div key={testIndex} className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            {testData.testName} - Thread Performance
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* IOPS per Thread */}
            <div>
              <h4 className="text-lg font-medium mb-3 text-gray-700">IOPS per Thread</h4>
              <div className="space-y-2">
                {testData.threads.map((thread, threadIndex) => {
                  const threadIOPS = Math.round((thread.target.ioCount || 0) / (testData.duration || 1));
                  const maxThreadIOPS = Math.max(...testData.threads.map(t => Math.round((t.target.ioCount || 0) / (testData.duration || 1))));
                  return (
                    <div key={threadIndex} className="flex items-center space-x-3">
                      <span className="w-16 text-sm text-gray-600">T{thread.id}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-purple-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${maxThreadIOPS > 0 ? (threadIOPS / maxThreadIOPS) * 100 : 0}%` }}
                        ></div>
                      </div>
                      <span className="w-20 text-sm text-gray-700 text-right">
                        {threadIOPS.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Throughput per Thread */}
            <div>
              <h4 className="text-lg font-medium mb-3 text-gray-700">Throughput per Thread (MB/s)</h4>
              <div className="space-y-2">
                {testData.threads.map((thread, threadIndex) => {
                  const threadThroughput = ((thread.target.bytesCount || 0) / (1024 * 1024)) / (testData.duration || 1);
                  const maxThreadThroughput = Math.max(...testData.threads.map(t => ((t.target.bytesCount || 0) / (1024 * 1024)) / (testData.duration || 1)));
                  return (
                    <div key={threadIndex} className="flex items-center space-x-3">
                      <span className="w-16 text-sm text-gray-600">T{thread.id}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-red-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${maxThreadThroughput > 0 ? (threadThroughput / maxThreadThroughput) * 100 : 0}%` }}
                        ></div>
                      </div>
                      <span className="w-20 text-sm text-gray-700 text-right">
                        {threadThroughput.toFixed(1)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* CPU Core Usage Details */}
      {data.map((testData, testIndex) => (
        <div key={testIndex} className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            {testData.testName} - CPU Core Usage
          </h3>
          <div className="space-y-3">
            {testData.cpuCores.map((core, coreIndex) => (
              <div key={coreIndex} className="">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Core {core.id}</span>
                  <span>{core.usage.toFixed(1)}% (User: {core.user.toFixed(1)}%, Kernel: {core.kernel.toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 flex overflow-hidden">
                  <div 
                    className="bg-cyan-500 h-4 transition-all duration-300"
                    style={{ width: `${core.user}%` }}
                    title={`User: ${core.user.toFixed(1)}%`}
                  ></div>
                  <div 
                    className="bg-purple-500 h-4 transition-all duration-300"
                    style={{ width: `${core.kernel}%` }}
                    title={`Kernel: ${core.kernel.toFixed(1)}%`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-cyan-500 rounded"></div>
              <span>User</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span>Kernel</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}