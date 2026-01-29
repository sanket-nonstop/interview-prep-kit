import { ReactNode } from 'react';
import CodeBlock from './CodeBlock';
import { getCategoryColor } from '@/data/topics';
import { AlertTriangle, CheckCircle2, Target, Lightbulb } from 'lucide-react';

interface TopicLayoutProps {
  title: string;
  route: string;
  category: 'html' | 'css' | 'javascript' | 'react' | 'nextjs';
  explanation: string;
  code: string;
  codeFilename?: string;
  codeLanguage?: string;
  whyItMatters: string;
  mistakes: string[];
  practiceTask: string;
  children?: ReactNode;
}

export const TopicLayout = ({
  title,
  route,
  category,
  explanation,
  code,
  codeFilename,
  codeLanguage = 'tsx',
  whyItMatters,
  mistakes,
  practiceTask,
  children,
}: TopicLayoutProps) => {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="my-4 md:my-8 flex gap-4 items-center justify-start">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <div className="flex items-center gap-3">
          <span className={`category-badge border  ${getCategoryColor(category)}`}>
            {category.toUpperCase()}
          </span> 
        </div>
      </div>

      {/* Explanation */}
      <section className="mb-8">
        <h2 id="explanation" className="section-title">
          <Lightbulb className="w-5 h-5 text-primary" />
          Quick Explanation
        </h2>
        <p className="text-secondary-foreground leading-relaxed">{explanation}</p>
      </section>

      {/* Interactive Examples (if provided) */}
      {children && (
        <section className="mb-8">
          {children}
        </section>
      )}

      {/* Code Example */}
      <section className="mb-8">
        <h2 id="code" className="section-title">
          <Target className="w-5 h-5 text-accent" />
          Production-Ready Code
        </h2>
        <CodeBlock code={code} language={codeLanguage} />
      </section>

      {/* Why Interviewers Care */}
      <section className="mb-8">
        <h2 id="why-it-matters" className="section-title">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          Why Interviewers Care
        </h2>
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-secondary-foreground leading-relaxed">{whyItMatters}</p>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="mb-8">
        <h2 id="mistakes" className="section-title">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          Common Mistakes
        </h2>
        <div className="space-y-2">
          {mistakes.map((mistake, index) => (
            <div key={index} className="mistake-item">
              {mistake}
            </div>
          ))}
        </div>
      </section>

      {/* Practice Task */}
      <section className="mb-8">
        <h2 id="practice" className="section-title">
          <Target className="w-5 h-5 text-category-js" />
          Mini Practice Task
        </h2>
        <div className="practice-task">
          <p className="text-secondary-foreground">{practiceTask}</p>
        </div>
      </section>
    </div>
  );
};
