'use client';

import { ProcessedData } from '@/types/diskspd';

interface TestExecutionSectionProps {
  data: ProcessedData;
}

export default function TestExecutionSection({ data }: TestExecutionSectionProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Test Execution Details
      </h2>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        {/* Basic Test Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Test Parameters</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 mb-1">Test Duration</h4>
              <p className="text-2xl font-bold text-blue-600">{data.timeSpanInfo.testTimeSeconds.toFixed(2)}s</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 mb-1">Thread Count</h4>
              <p className="text-2xl font-bold text-green-600">{data.timeSpanInfo.threadCount}</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 mb-1">Request Count</h4>
              <p className="text-2xl font-bold text-purple-600">{(data.timeSpanInfo.requestCount || 0).toLocaleString()}</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 mb-1">Processor Count</h4>
              <p className="text-2xl font-bold text-orange-600">{data.timeSpanInfo.procCount}</p>
            </div>
          </div>
        </div>

        {/* CPU Utilization */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">CPU Utilization</h3>
          
          {/* Average CPU Usage */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">Average CPU Usage</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <h5 className="font-medium text-gray-600 mb-1">Total Usage</h5>
                <p className="text-xl font-bold text-red-600">{data.cpuUtilization.average.usagePercent.toFixed(2)}%</p>
              </div>
              <div className="text-center">
                <h5 className="font-medium text-gray-600 mb-1">User Mode</h5>
                <p className="text-xl font-bold text-blue-600">{data.cpuUtilization.average.userPercent.toFixed(2)}%</p>
              </div>
              <div className="text-center">
                <h5 className="font-medium text-gray-600 mb-1">Kernel Mode</h5>
                <p className="text-xl font-bold text-orange-600">{data.cpuUtilization.average.kernelPercent.toFixed(2)}%</p>
              </div>
              <div className="text-center">
                <h5 className="font-medium text-gray-600 mb-1">Idle</h5>
                <p className="text-xl font-bold text-green-600">{data.cpuUtilization.average.idlePercent.toFixed(2)}%</p>
              </div>
            </div>
          </div>

          {/* Individual CPU Cores */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">Individual CPU Cores</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">CPU ID</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Core</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Usage %</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">User %</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Kernel %</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Idle %</th>
                  </tr>
                </thead>
                <tbody>
                  {data.cpuUtilization.individual.map((cpu, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 text-sm text-gray-900">{cpu.id}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{cpu.core}</td>
                      <td className="px-4 py-2 text-sm font-medium text-red-600">{cpu.usagePercent.toFixed(2)}%</td>
                      <td className="px-4 py-2 text-sm text-blue-600">{cpu.userPercent.toFixed(2)}%</td>
                      <td className="px-4 py-2 text-sm text-orange-600">{cpu.kernelPercent.toFixed(2)}%</td>
                      <td className="px-4 py-2 text-sm text-green-600">{cpu.idlePercent.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Thread Performance */}
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Thread Performance</h4>
            {data.threads && data.threads.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Thread ID</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">File Path</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">IO Count</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Bytes Count</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Read Bytes</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Write Bytes</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Read Count</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Write Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.threads.map((thread, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-2 text-sm text-gray-900">{thread.id}</td>
                        <td className="px-4 py-2 text-sm text-gray-900 truncate max-w-xs" title={thread.target.path}>
                          {thread.target.path.split('\\').pop() || thread.target.path}
                        </td>
                        <td className="px-4 py-2 text-sm font-medium text-blue-600">{(thread.target.ioCount || 0).toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-purple-600">{((thread.target.bytesCount || 0) / (1024 * 1024)).toFixed(2)} MB</td>
                        <td className="px-4 py-2 text-sm text-green-600">{((thread.target.readBytes || 0) / (1024 * 1024)).toFixed(2)} MB</td>
                        <td className="px-4 py-2 text-sm text-red-600">{((thread.target.writeBytes || 0) / (1024 * 1024)).toFixed(2)} MB</td>
                        <td className="px-4 py-2 text-sm text-green-700">{(thread.target.readCount || 0).toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-red-700">{(thread.target.writeCount || 0).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p>No thread data available. Thread count: {data.threads ? data.threads.length : 'undefined'}</p>
                <p className="text-xs mt-1">Debug: {JSON.stringify(data.threads?.slice(0, 1) || 'no threads')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}