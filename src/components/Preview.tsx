import React from 'react';
import { Copy } from 'lucide-react';

interface PreviewProps {
  content: string;
  type: 'input' | 'output';
  label: string;
}

export function Preview({ content, type, label }: PreviewProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</h3>
        {type === 'output' && content && (
          <button
            onClick={handleCopy}
            className="inline-flex items-center px-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4 mr-1" />
            Copy
          </button>
        )}
      </div>
      <div className="w-full h-64 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <pre className="p-4 text-sm font-mono text-gray-600 dark:text-gray-300 overflow-auto h-full whitespace-pre-wrap break-words">
          {content || 'No content to display'}
        </pre>
      </div>
    </div>
  );
}