'use client';

import { ProcessedData } from '@/types/diskspd';

interface ThroughputStatsSectionProps {
  data: ProcessedData;
}

export default function ThroughputStatsSection({ data }: ThroughputStatsSectionProps) {
  if (!data.threads || data.threads.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        整体读写吞吐量统计
      </h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h5 className="font-medium text-green-700 mb-1">总读取吞吐量</h5>
              <p className="text-xl font-bold text-green-600">
                {(data.threads.reduce((sum, thread) => sum + ((thread.target.readBytes || 0) / (1024 * 1024)), 0) / (data.duration || 1)).toFixed(2)} MB/s
              </p>
              <p className="text-xs text-gray-500">
                总计: {(data.threads.reduce((sum, thread) => sum + ((thread.target.readBytes || 0) / (1024 * 1024)), 0)).toFixed(2)} MB
              </p>
            </div>
            <div className="text-center">
              <h5 className="font-medium text-red-700 mb-1">总写入吞吐量</h5>
              <p className="text-xl font-bold text-red-600">
                {(data.threads.reduce((sum, thread) => sum + ((thread.target.writeBytes || 0) / (1024 * 1024)), 0) / (data.duration || 1)).toFixed(2)} MB/s
              </p>
              <p className="text-xs text-gray-500">
                总计: {(data.threads.reduce((sum, thread) => sum + ((thread.target.writeBytes || 0) / (1024 * 1024)), 0)).toFixed(2)} MB
              </p>
            </div>
            <div className="text-center">
              <h5 className="font-medium text-blue-700 mb-1">总体吞吐量</h5>
              <p className="text-xl font-bold text-blue-600">
                {(data.threads.reduce((sum, thread) => sum + ((thread.target.bytesCount || 0) / (1024 * 1024)), 0) / (data.duration || 1)).toFixed(2)} MB/s
              </p>
              <p className="text-xs text-gray-500">
                总计: {(data.threads.reduce((sum, thread) => sum + ((thread.target.bytesCount || 0) / (1024 * 1024)), 0)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">总IO操作数:</span> {data.threads.reduce((sum, thread) => sum + (thread.target.ioCount || 0), 0).toLocaleString()}
              </div>
              <div>
                <span className="font-medium">平均IOPS:</span> {Math.round(data.threads.reduce((sum, thread) => sum + (thread.target.ioCount || 0), 0) / (data.duration || 1)).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}