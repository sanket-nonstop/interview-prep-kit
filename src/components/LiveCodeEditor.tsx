import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

interface LiveCodeEditorProps {
  initialCode: string;
  title?: string;
  height?: string;
}

export function LiveCodeEditor({ initialCode, title = 'Live Code Editor', height = '400px' }: LiveCodeEditorProps) {
  const [code, setCode] = useState(initialCode);

  const resetCode = () => setCode(initialCode);

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={resetCode}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-black"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Editor */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">HTML Code</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-4 bg-gray-900 text-gray-100 rounded-lg text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ height }}
            spellCheck={false}
          />
        </div>

        {/* Live Preview */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Live Preview</label>
          <div className="border-2 border-gray-200 rounded-lg bg-white overflow-hidden">
            <iframe
              srcDoc={code}
              className="w-full border-0"
              style={{ height }}
              title="Live Preview"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
}