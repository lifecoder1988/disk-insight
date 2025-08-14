'use client';

import { ProcessedData } from '@/types/diskspd';

interface FileInfoSectionProps {
  data: ProcessedData;
}

export default function FileInfoSection({ data }: FileInfoSectionProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        DiskSpd分析报告
      </h2>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="text-center">
          <p className="text-lg font-medium text-blue-600">{data.fileName}</p>
        </div>
      </div>
    </div>
  );
}