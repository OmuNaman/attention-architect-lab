
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ProgressBar } from '@/components/ProgressBar';
import { StepNavigation } from '@/components/StepNavigation';
import { NeuralStep } from '@/components/NeuralStep';
import { EducationalSidebar } from '@/components/EducationalSidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export type NeuralStepType = 'inputs' | 'weights' | 'weighted-sum' | 'activation' | 'backprop' | 'update-weights' | 'prediction';

const neuralSteps: NeuralStepType[] = ['inputs', 'weights', 'weighted-sum', 'activation', 'backprop', 'update-weights', 'prediction'];

export function NeuralNetworkApp() {
  const [currentStep, setCurrentStep] = useState<NeuralStepType>('inputs');
  const [completedSteps, setCompletedSteps] = useState<Set<NeuralStepType>>(new Set());
  const [isDark, setIsDark] = useState(true);

  const handleStepComplete = (step: NeuralStepType) => {
    setCompletedSteps(prev => new Set([...prev, step]));
    const currentIndex = neuralSteps.indexOf(step);
    if (currentIndex < neuralSteps.length - 1) {
      setCurrentStep(neuralSteps[currentIndex + 1]);
    }
  };

  const resetProgress = () => {
    setCompletedSteps(new Set());
    setCurrentStep('inputs');
  };

  return (
    <ThemeProvider isDark={isDark}>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        {/* Header */}
        <div className="sticky top-0 z-50 backdrop-blur-lg bg-opacity-80 border-b border-opacity-20 border-white">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src="/image.png" 
                  alt="Vizuara AI Labs" 
                  className="h-8"
                />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Interactive Neural Network Learning
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={resetProgress}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
                <ThemeToggle isDark={isDark} onToggle={setIsDark} />
              </div>
            </div>
            <ProgressBar steps={neuralSteps} currentStep={currentStep} completedSteps={completedSteps} />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Neural Network Calculation Area */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <NeuralStep
                    step={currentStep}
                    onComplete={() => handleStepComplete(currentStep)}
                    isCompleted={completedSteps.has(currentStep)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Educational Sidebar */}
            <div className="lg:col-span-1">
              <EducationalSidebar currentStep={currentStep} />
            </div>
          </div>
        </div>

        {/* Step Navigation */}
        <StepNavigation
          steps={neuralSteps}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepChange={setCurrentStep}
        />
      </div>
    </ThemeProvider>
  );
}
