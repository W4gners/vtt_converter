import React from 'react';

interface ConversionTypeProps {
  type: 'srtToVtt' | 'addNumbering';
  onChange: (type: 'srtToVtt' | 'addNumbering') => void;
}

export function ConversionType({ type, onChange }: ConversionTypeProps) {
  return (
    <div className="mb-6">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
        Conversion Type
      </label>
      <div className="flex gap-4">
        <button
          onClick={() => onChange('srtToVtt')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            type === 'srtToVtt'
              ? 'bg-blue-600 dark:bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          SRT to VTT
        </button>
        <button
          onClick={() => onChange('addNumbering')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            type === 'addNumbering'
              ? 'bg-blue-600 dark:bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Add VTT Numbering
        </button>
      </div>
    </div>
  );
}