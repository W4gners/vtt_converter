import React from 'react';
import { Download, RotateCcw } from 'lucide-react';

interface ActionButtonsProps {
  vttContent: string;
  onReset: () => void;
}

export function ActionButtons({ vttContent, onReset }: ActionButtonsProps) {
  const handleDownload = () => {
    const blob = new Blob([vttContent], { type: 'text/vtt' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subtitles.vtt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={handleDownload}
        disabled={!vttContent}
        className={`flex items-center justify-center px-4 py-2 rounded-lg text-white ${
          !vttContent
            ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
        } transition-colors`}
      >
        <Download className="w-4 h-4 mr-2" />
        Download VTT
      </button>
      <button
        onClick={onReset}
        className="flex items-center justify-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        New Conversion
      </button>
    </div>
  );
}