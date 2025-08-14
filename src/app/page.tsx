'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import PerformanceChart from '@/components/PerformanceChart';
import FileInfoSection from '@/components/FileInfoSection';
import SystemInfoSection from '@/components/SystemInfoSection';
import TestConfigSection from '@/components/TestConfigSection';
import ThroughputStatsSection from '@/components/ThroughputStatsSection';
import TestExecutionSection from '@/components/TestExecutionSection';
import { ProcessedData } from '@/types/diskspd';

export default function Home() {
  const [data, setData] = useState<ProcessedData[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleFilesProcessed = (processedData: ProcessedData[]) => {
    setData(processedData);
    setActiveTab(0);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Disk Insight
          </h1>
          <p className="text-lg text-gray-600">
            Visualize diskspd performance test results
          </p>
        </div>

        <div className="mb-8">
          <FileUpload onFilesProcessed={handleFilesProcessed} />
        </div>

        {data.length > 0 && (
          <div>
            {/* Tab Navigation */}
             <div className="mb-6">
               <div className="border-b border-gray-200">
                 <nav className="-mb-px flex space-x-8 overflow-x-auto">
                   {data.map((fileData, index) => {
                     const displayName = fileData.fileName 
                       ? fileData.fileName.replace('.xml', '').substring(0, 20) + (fileData.fileName.length > 20 ? '...' : '')
                       : `File ${index + 1}`;
                     
                     return (
                       <button
                         key={index}
                         onClick={() => setActiveTab(index)}
                         className={`py-3 px-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                           activeTab === index
                             ? 'border-blue-500 text-blue-600 bg-blue-50'
                             : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                         }`}
                         title={fileData.fileName || `File ${index + 1}`}
                       >
                         {displayName}
                       </button>
                     );
                   })}
                 </nav>
               </div>
             </div>

            {/* Tab Content */}
            <div>
              <FileInfoSection data={data[activeTab]} />
              <SystemInfoSection data={data[activeTab]} />
              <TestConfigSection data={data[activeTab]} />
              <ThroughputStatsSection data={data[activeTab]} />
              <TestExecutionSection data={data[activeTab]} />
            </div>
          </div>
        )}

        {data.length === 0 && (
          <div className="text-center py-12">
            <div className="space-y-2">
              <p className="text-lg text-gray-700">
                上传 XML 文件查看性能可视化
              </p>
              <p className="text-sm text-gray-500">
                支持同时上传多个 diskspd XML 文件，每个文件将在独立的标签页中显示
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}