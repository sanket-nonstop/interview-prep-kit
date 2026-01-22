import { useState, useEffect } from 'react';
import { Check, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  code: string;
  highlight?: string;
}

interface StepByStepPreviewProps {
  steps: Step[];
  title: string;
}

export function StepByStepPreview({ steps, title }: StepByStepPreviewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedCode, setEditedCode] = useState<Record<number, string>>({});

  const storageKey = `step-preview-${title.replace(/\s+/g, '-').toLowerCase()}`;

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const { step, code, expanded } = JSON.parse(saved);
        setCurrentStep(step);
        setEditedCode(code);
        setIsExpanded(expanded);
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [storageKey]);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ step: currentStep, code: editedCode, expanded: isExpanded })
    );
  }, [currentStep, editedCode, isExpanded, storageKey]);

  const currentCode = editedCode[currentStep] || steps[currentStep].code;
  const hasEdits = editedCode[currentStep] !== undefined;

  const handleCodeChange = (value: string) => {
    setEditedCode({ ...editedCode, [currentStep]: value });
  };

  const resetCode = () => {
    const newEdited = { ...editedCode };
    delete newEdited[currentStep];
    setEditedCode(newEdited);
  };

  const getSnippet = (code: string) => {
    const bodyMatch = code.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
      return bodyMatch[1].trim().split('\n').slice(0, 4).join('\n') + '\n  ...';
    }
    return code.split('\n').slice(0, 4).join('\n') + '\n...';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      {/* Step Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              index === currentStep
                ? 'bg-blue-600 text-white'
                : index < currentStep
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {index < currentStep && <Check className="w-4 h-4" />}
            <span className="text-sm font-medium">Step {index + 1}</span>
          </button>
        ))}
      </div>

      {/* Step Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
        <h4 className="font-semibold text-blue-900 mb-1">
          {steps[currentStep].title}
        </h4>
        <p className="text-blue-800 text-sm">
          {steps[currentStep].description}
        </p>
        {steps[currentStep].highlight && (
          <p className="text-blue-700 text-sm mt-2 font-medium">
            ✨ {steps[currentStep].highlight}
          </p>
        )}
      </div>

      {/* Live Preview - Priority Position */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Live Preview
          </h4>
          {hasEdits && (
            <button
              onClick={resetCode}
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
        <div className="border-4 border-gray-200 rounded-xl bg-white shadow-lg overflow-hidden">
          <iframe
            srcDoc={currentCode}
            className="w-full border-0"
            style={{ height: '500px' }}
            title={`Preview Step ${currentStep + 1}`}
            sandbox="allow-scripts"
          />
        </div>
      </div>

      {/* Code Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Code
          </h4>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Edit Code
              </>
            )}
          </button>
        </div>

        {!isExpanded ? (
          // Compact Read-Only Snippet
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{getSnippet(currentCode)}</code>
          </pre>
        ) : (
          // Full Editable Code
          <div className="space-y-2">
            <textarea
              value={currentCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full h-96 p-4 bg-gray-900 text-gray-100 rounded-lg text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              spellCheck={false}
            />
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Edit the code above to see changes in real-time</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentCode);
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                Copy Code
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors font-medium"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors font-medium"
        >
          {currentStep === steps.length - 1 ? 'Completed' : 'Next Step'}
        </button>
      </div>
    </div>
  );
}