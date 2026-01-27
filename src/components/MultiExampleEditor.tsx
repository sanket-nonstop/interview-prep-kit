import { useState } from "react";
import { RotateCcw } from "lucide-react";

interface Example {
  title: string;
  code: string;
}

interface MultiExampleEditorProps {
  title: string;
  examples: Example[];
  height?: string;
}

export function MultiExampleEditor({
  title,
  examples,
  height = "450px",
}: MultiExampleEditorProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [codes, setCodes] = useState<string[]>(examples.map((ex) => ex.code));
  const [copied, setCopied] = useState(false);

  const resetCode = () => {
    const newCodes = [...codes];
    newCodes[activeTab] = examples[activeTab].code;
    setCodes(newCodes);
  };

  const updateCode = (value: string) => {
    const newCodes = [...codes];
    newCodes[activeTab] = value;
    setCodes(newCodes);
  };

  return (
    <div className="max-h-[1200px] lg:max-h-[960px] h-full bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        {/* <button
          onClick={resetCode}
          className="flex items-center text-black gap-2 px-4 py-2 text-sm bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors shadow-sm"
        >
          <RotateCcw className="w-4 h-4 " />
          Reset
        </button> */}
        <button
          onClick={resetCode}
          className="group flex items-center gap-2 px-4 py-2 text-sm bg-white text-black
             border border-gray-300 rounded-lg shadow-sm
             transition-all duration-150
             active:scale-95 active:shadow-inner"
        >
          <RotateCcw
            className="w-4 h-4 transition-transform duration-300 group-active:-rotate-180"
          />
          Reset
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === index
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
          >
            {example.title}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Code Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              ✏️ Edit Code
            </label>
            {/* <button
              // onClick={() => navigator.clipboard.writeText(codes[activeTab])}
              onClick={async () => {
                await navigator.clipboard.writeText(codes[activeTab]);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Copy
            </button> */}

            <button
              onClick={async () => {
                await navigator.clipboard.writeText(codes[activeTab]);
                setCopied(true);
                setTimeout(() => setCopied(false), 4000);
              }}
              className={`text-xs font-medium transition ${copied ? "text-green-600" : "text-blue-600 hover:text-blue-800"
                }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            value={codes[activeTab]}
            onChange={(e) => updateCode(e.target.value)}
            className="w-full p-4 bg-gray-900 text-gray-100 rounded-lg text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
            style={{ height }}
            spellCheck={false}
          />
        </div>

        {/* Live Preview */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide px-1">
            👁️ Live Preview
          </label>
          <div className="border-4 border-white rounded-lg bg-white overflow-hidden shadow-lg">
            <iframe
              srcDoc={codes[activeTab]}
              className="w-full border-0"
              style={{ height }}
              title={`Preview ${activeTab + 1}`}
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
