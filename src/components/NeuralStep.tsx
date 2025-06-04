
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, CheckCircle } from 'lucide-react';
import type { NeuralStepType } from '@/components/NeuralNetworkApp';

interface NeuralStepProps {
  step: NeuralStepType;
  onComplete: () => void;
  isCompleted: boolean;
}

// Neural network data
const networkData = {
  inputs: [0.5, 0.8],
  weights: {
    layer1: [[0.2, 0.3], [0.4, 0.1], [0.6, 0.5]], // 3 neurons, 2 inputs each
    layer2: [0.7, 0.2, 0.9] // output weights from 3 hidden neurons
  },
  bias: {
    layer1: [0.1, 0.2, 0.3],
    layer2: 0.1
  },
  target: 1.0
};

export function NeuralStep({ step, onComplete, isCompleted }: NeuralStepProps) {
  const { toast } = useToast();
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);

  const playAudio = (isCorrect: boolean) => {
    const audio = new Audio(isCorrect ? '/correct.mp3' : '/wrong.mp3');
    audio.play().catch(console.error);
  };

  const getStepConfig = () => {
    switch (step) {
      case 'inputs':
        return {
          title: "Step 1: Input Layer",
          description: "Let's start with our input values. These represent features of our data.",
          formula: "X = [x₁, x₂]",
          question: "What are our input values?",
          expectedAnswers: networkData.inputs,
          hint: "Look at the input values: 0.5 and 0.8"
        };
      
      case 'weights':
        return {
          title: "Step 2: Initialize Weights",
          description: "Weights determine how much each input contributes to each neuron.",
          formula: "W₁ = [[w₁₁, w₁₂], [w₂₁, w₂₂], [w₃₁, w₃₂]]",
          question: "Enter the weights for the first hidden layer (6 values):",
          expectedAnswers: networkData.weights.layer1.flat(),
          hint: "Weights are: Neuron1[0.2, 0.3], Neuron2[0.4, 0.1], Neuron3[0.6, 0.5]"
        };
      
      case 'weighted-sum':
        return {
          title: "Step 3: Calculate Weighted Sum",
          description: "For each neuron, multiply inputs by weights and add bias.",
          formula: "z = Σ(xᵢ × wᵢ) + b",
          question: "Calculate weighted sum for each neuron (3 values):",
          expectedAnswers: [
            networkData.inputs[0] * networkData.weights.layer1[0][0] + networkData.inputs[1] * networkData.weights.layer1[0][1] + networkData.bias.layer1[0], // 0.5*0.2 + 0.8*0.3 + 0.1 = 0.44
            networkData.inputs[0] * networkData.weights.layer1[1][0] + networkData.inputs[1] * networkData.weights.layer1[1][1] + networkData.bias.layer1[1], // 0.5*0.4 + 0.8*0.1 + 0.2 = 0.48
            networkData.inputs[0] * networkData.weights.layer1[2][0] + networkData.inputs[1] * networkData.weights.layer1[2][1] + networkData.bias.layer1[2]  // 0.5*0.6 + 0.8*0.5 + 0.3 = 1.0
          ],
          hint: "For neuron 1: (0.5 × 0.2) + (0.8 × 0.3) + 0.1 = 0.44"
        };
      
      case 'activation':
        return {
          title: "Step 4: Apply Activation Function",
          description: "Apply ReLU activation: f(x) = max(0, x)",
          formula: "a = ReLU(z) = max(0, z)",
          question: "Apply ReLU to weighted sums (3 values):",
          expectedAnswers: [0.44, 0.48, 1.0].map(x => Math.max(0, x)),
          hint: "ReLU keeps positive values unchanged: max(0, 0.44) = 0.44"
        };
      
      case 'backprop':
        return {
          title: "Step 5: Backpropagation",
          description: "Calculate the error and gradients for learning.",
          formula: "error = target - prediction",
          question: "What's the error if prediction is 0.73 and target is 1.0?",
          expectedAnswers: [0.27],
          hint: "Error = 1.0 - 0.73 = 0.27"
        };
      
      case 'update-weights':
        return {
          title: "Step 6: Update Weights",
          description: "Update weights using gradient descent.",
          formula: "w_new = w_old - α × gradient",
          question: "If learning rate α = 0.01 and gradient = 0.1, what's the new weight if old weight = 0.2?",
          expectedAnswers: [0.199],
          hint: "w_new = 0.2 - (0.01 × 0.1) = 0.199"
        };
      
      case 'prediction':
        return {
          title: "Step 7: Final Prediction",
          description: "Calculate the final output using sigmoid activation.",
          formula: "output = sigmoid(Σ(aᵢ × wᵢ) + b)",
          question: "What's the final prediction? (use sigmoid)",
          expectedAnswers: [0.73],
          hint: "Apply sigmoid to the weighted sum of hidden layer outputs"
        };
      
      default:
        return {
          title: "Neural Network Step",
          description: "Learning neural networks step by step",
          formula: "",
          question: "",
          expectedAnswers: [],
          hint: ""
        };
    }
  };

  const config = getStepConfig();

  useEffect(() => {
    setUserAnswers(new Array(config.expectedAnswers.length).fill(0));
    setShowHint(false);
  }, [step]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = parseFloat(value) || 0;
    setUserAnswers(newAnswers);
  };

  const checkAnswers = () => {
    const tolerance = 0.01;
    const isCorrect = userAnswers.every((answer, index) => 
      Math.abs(answer - config.expectedAnswers[index]) < tolerance
    );

    if (isCorrect && !isCompleted) {
      playAudio(true);
      toast({
        title: "Correct! 🎉",
        description: "Great job! You've calculated correctly.",
        duration: 3000,
      });
      setTimeout(() => onComplete(), 1000);
    } else if (!isCorrect) {
      playAudio(false);
      toast({
        title: "Not quite right",
        description: "Check your calculations and try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2">{config.title}</h2>
        <p className="text-gray-400 text-lg">{config.description}</p>
      </motion.div>

      {/* Network Visualization */}
      <Card className="p-6 bg-slate-800/50 border-slate-700">
        <h3 className="text-lg font-semibold mb-4">Neural Network Structure</h3>
        <div className="flex items-center justify-center space-x-12">
          {/* Input Layer */}
          <div className="text-center">
            <h4 className="text-sm font-medium mb-4 text-green-400">Input Layer</h4>
            <div className="space-y-4">
              {networkData.inputs.map((input, i) => (
                <div key={i} className="w-16 h-16 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center text-sm font-bold">
                  {input}
                </div>
              ))}
            </div>
          </div>

          {/* Hidden Layer */}
          <div className="text-center">
            <h4 className="text-sm font-medium mb-4 text-blue-400">Hidden Layer</h4>
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-16 h-16 bg-blue-500/20 border-2 border-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                  H{i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Output Layer */}
          <div className="text-center">
            <h4 className="text-sm font-medium mb-4 text-orange-400">Output Layer</h4>
            <div className="w-16 h-16 bg-orange-500/20 border-2 border-orange-500 rounded-full flex items-center justify-center text-sm font-bold">
              O
            </div>
          </div>
        </div>
      </Card>

      {/* Formula Display */}
      <Card className="p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Formula</h3>
          <div className="text-2xl font-mono text-blue-300">{config.formula}</div>
        </div>
      </Card>

      {/* Calculation Input */}
      <Card className="p-6 bg-slate-800/50 border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{config.question}</h3>
          <div className="flex items-center gap-2">
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 text-green-400"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Completed!</span>
              </motion.div>
            )}
            <Button
              onClick={() => setShowHint(!showHint)}
              variant="outline"
              size="sm"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>
          </div>
        </div>

        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4 p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-lg"
          >
            <div className="text-sm text-yellow-300">
              <strong>Hint:</strong> {config.hint}
            </div>
          </motion.div>
        )}

        <div className="flex flex-wrap gap-4 justify-center items-center">
          {config.expectedAnswers.map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <label className="text-sm text-gray-400">Answer {index + 1}</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={userAnswers[index] || ''}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="w-24 text-center"
                readOnly={isCompleted}
              />
            </div>
          ))}
        </div>

        {!isCompleted && (
          <div className="mt-6 text-center">
            <Button
              onClick={checkAnswers}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Check Answer
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
