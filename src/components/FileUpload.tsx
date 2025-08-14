'use client';

import { useState } from 'react';
import { ProcessedData } from '@/types/diskspd';
import { processDiskspdXml } from '@/lib/xmlParser';

interface FileUploadProps {
  onFilesProcessed: (data: ProcessedData[]) => void;
}

export default function FileUpload({ onFilesProcessed }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((file: any) => 
      file.name.endsWith('.xml')
    );
    if (files.length > 0) {
      processFiles(files as File[]);
    }
  };

  const handleFileSelect = (e: any) => {
    const files = e.target.files;
    if (files) {
      const xmlFiles = Array.from(files).filter((file: any) => 
        file.name.endsWith('.xml')
      );
      if (xmlFiles.length > 0) {
        processFiles(xmlFiles as File[]);
      }
    }
  };

  const processFiles = async (files: File[]) => {
    setIsProcessing(true);
    try {
      const processedData: ProcessedData[] = [];
      
      for (const file of files) {
        const text = await file.text();
        const data = processDiskspdXml(text, file.name);
        processedData.push(data);
      }
      
      onFilesProcessed(processedData);
    } catch (error) {
      console.error('Error processing files:', error);
      alert('Error processing XML files. Please check the console for details.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClick = () => {
    const input = document.getElementById('file-input') as HTMLInputElement;
    input?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept=".xml"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isProcessing}
        />
        
        {isProcessing ? (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-600">Processing XML files...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <p className="text-lg font-medium text-gray-900">
                Drop XML files here or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Upload diskspd XML output files for visualization
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}