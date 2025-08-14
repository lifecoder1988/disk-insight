'use client';

import { ProcessedData } from '@/types/diskspd';

interface SystemInfoSectionProps {
  data: ProcessedData;
}

export default function SystemInfoSection({ data }: SystemInfoSectionProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        System Information
      </h2>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Computer</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Name: {data.systemInfo.computerName}</p>
              <p>Run Time: {data.systemInfo.runTime}</p>
              <p>Power Scheme: {data.systemInfo.powerScheme}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Tool</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Version: {data.systemInfo.toolVersion}</p>
              <p>Date: {data.systemInfo.toolVersionDate}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Processor</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Max Processors: {data.systemInfo.processorInfo.maxProcessors}</p>
              <p>Active Processors: {data.systemInfo.processorInfo.activeProcessors}</p>
              <p>Core Count: {data.systemInfo.processorInfo.coreCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}