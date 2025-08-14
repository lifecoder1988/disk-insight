'use client';

import { ProcessedData } from '@/types/diskspd';

interface TestConfigSectionProps {
  data: ProcessedData;
}

export default function TestConfigSection({ data }: TestConfigSectionProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Test Configuration
      </h2>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">General Settings</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Progress: {data.profileInfo.progress}%</p>
              <p>Result Format: {data.profileInfo.resultFormat}</p>
              <p>Verbose: {data.profileInfo.verbose ? 'Yes' : 'No'}</p>
              <p>Measure Latency: {data.profileInfo.measureLatency ? 'Yes' : 'No'}</p>
              <p>Disable Affinity: {data.profileInfo.disableAffinity ? 'Yes' : 'No'}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Timing Settings</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Warmup: {data.profileInfo.warmup}s</p>
              <p>Cooldown: {data.profileInfo.cooldown}s</p>
              <p>IO Bucket Duration: {data.profileInfo.ioBucketDuration}ms</p>
              <p>Random Seed: {data.profileInfo.randSeed}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Target Settings</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Path: {data.profileInfo.target.path}</p>
              <p>Request Count: {data.profileInfo.target.requestCount}</p>
              <p>Threads Per File: {data.profileInfo.target.threadsPerFile}</p>
              <p>Write Ratio: {data.profileInfo.target.writeRatio}%</p>
              <p>IO Priority: {data.profileInfo.target.ioPriority}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-2">Advanced Options</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${data.profileInfo.target.disableOSCache ? 'bg-green-500' : 'bg-red-500'}`}></span>
              Disable OS Cache
            </div>
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${data.profileInfo.target.writeThrough ? 'bg-green-500' : 'bg-red-500'}`}></span>
              Write Through
            </div>
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${data.profileInfo.target.useLargePages ? 'bg-green-500' : 'bg-red-500'}`}></span>
              Use Large Pages
            </div>
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${data.profileInfo.target.temporaryFile ? 'bg-green-500' : 'bg-red-500'}`}></span>
              Temporary File
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}