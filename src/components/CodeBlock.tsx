import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Code, Copy, Check, ChevronDown } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language = 'javascript' }: CodeBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!codeRef.current) return;
    
    if (isExpanded) {
      gsap.to(codeRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      gsap.to(codeRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isExpanded]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-secondary/30 hover:bg-secondary/50 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          <Code className="w-4 h-4" />
          View Code
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div 
        ref={codeRef} 
        className="overflow-hidden transition-all"
        style={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
      >
        <div className="relative">
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 bg-background/80 hover:bg-background rounded-md transition-colors z-10"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <pre className="bg-secondary/50 p-4 overflow-x-auto text-sm">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
