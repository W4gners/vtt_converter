import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DragDropContextType {
  isDragging: boolean;
  setIsDragging: (value: boolean) => void;
}

const DragDropContext = createContext<DragDropContextType | undefined>(undefined);

export function useDragDrop() {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
}

interface DragDropProviderProps {
  children: ReactNode;
  onFileDrop: (content: string) => void;
}

export function DragDropProvider({ children, onFileDrop }: DragDropProviderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file || !file.name.endsWith('.srt')) {
      return;
    }

    const text = await file.text();
    onFileDrop(text);
  };

  return (
    <DragDropContext.Provider value={{ isDragging, setIsDragging }}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="min-h-screen"
      >
        {isDragging && (
          <div className="fixed inset-0 bg-blue-500 bg-opacity-10 pointer-events-none z-50 border-2 border-blue-500 border-dashed">
            <div className="flex items-center justify-center h-full">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p className="text-xl font-semibold text-blue-600">Drop your SRT file here</p>
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
    </DragDropContext.Provider>
  );
}