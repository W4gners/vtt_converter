import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { Preview } from './components/Preview';
import { ActionButtons } from './components/ActionButtons';
import { DragDropProvider } from './components/DragDropProvider';
import { AdBanner } from './components/AdBanner';
import { srtToVtt, addVttNumbering } from './utils/subtitleConverter';
import { FileText } from 'lucide-react';
import { ConversionType } from './components/ConversionType';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  const [inputContent, setInputContent] = useState('');
  const [outputContent, setOutputContent] = useState('');
  const [conversionType, setConversionType] = useState<'srtToVtt' | 'addNumbering'>('srtToVtt');

  const handleFileSelect = (content: string) => {
    setInputContent(content);
    const converted = conversionType === 'srtToVtt' 
      ? srtToVtt(content)
      : addVttNumbering(content);
    setOutputContent(converted);
  };

  const handleConversionTypeChange = (type: 'srtToVtt' | 'addNumbering') => {
    setConversionType(type);
    if (inputContent) {
      const converted = type === 'srtToVtt' 
        ? srtToVtt(inputContent)
        : addVttNumbering(inputContent);
      setOutputContent(converted);
    }
  };

  const handleReset = () => {
    setInputContent('');
    setOutputContent('');
  };

  return (
    <DragDropProvider onFileDrop={handleFileSelect}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <ThemeToggle />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Subtitle Converter
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Convert subtitles between formats and add numbering
            </p>
          </div>

          <div className="flex gap-8">
            <div className="flex-1 min-w-0">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
                <ConversionType 
                  type={conversionType} 
                  onChange={handleConversionTypeChange} 
                />
                <FileUpload 
                  onFileSelect={handleFileSelect}
                  acceptedFormats={conversionType === 'srtToVtt' ? '.srt' : '.vtt'}
                />
              </div>

              {(inputContent || outputContent) && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Preview 
                      content={inputContent} 
                      type="input" 
                      label={conversionType === 'srtToVtt' ? 'SRT Content' : 'VTT Content'} 
                    />
                    <Preview 
                      content={outputContent} 
                      type="output" 
                      label="Output" 
                    />
                  </div>
                  
                  <ActionButtons vttContent={outputContent} onReset={handleReset} />
                </div>
              )}
            </div>
            
            <aside className="hidden lg:block w-[300px] flex-shrink-0">
              <AdBanner />
            </aside>
          </div>
        </div>
      </div>
    </DragDropProvider>
  );
}