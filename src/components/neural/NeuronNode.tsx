
import { useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';

interface NeuronNodeProps {
  data: {
    label: string;
    activation: string;
    isActive: boolean;
    layerIndex: number;
    neuronIndex: number;
  };
}

export function NeuronNode({ data }: NeuronNodeProps) {
  const { isDark } = useTheme();
  const [activation, setActivation] = useState(0);
  const [isFireing, setIsFireing] = useState(false);

  useEffect(() => {
    if (data.isActive) {
      const interval = setInterval(() => {
        const newActivation = Math.random();
        setActivation(newActivation);
        if (newActivation > 0.7) {
          setIsFireing(true);
          setTimeout(() => setIsFireing(false), 300);
        }
      }, 1000 + data.neuronIndex * 200);

      return () => clearInterval(interval);
    }
  }, [data.isActive, data.neuronIndex]);

  const getActivationColor = () => {
    const intensity = activation;
    if (isDark) {
      return `rgba(59, 130, 246, ${0.3 + intensity * 0.7})`;
    } else {
      return `rgba(37, 99, 235, ${0.2 + intensity * 0.6})`;
    }
  };

  const getActivationValue = (x: number) => {
    switch (data.activation) {
      case 'relu':
        return Math.max(0, x);
      case 'sigmoid':
        return 1 / (1 + Math.exp(-x));
      case 'tanh':
        return Math.tanh(x);
      default:
        return x;
    }
  };

  return (
    <motion.div
      animate={isFireing ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`w-20 h-20 transition-all duration-300 shadow-xl rounded-full relative overflow-hidden border-2 ${
          isFireing ? 'border-yellow-400 shadow-yellow-400/50' : 'border-blue-500/50'
        }`}
        style={{
          backgroundColor: getActivationColor(),
          boxShadow: isFireing ? '0 0 20px rgba(255, 255, 0, 0.6)' : '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          {/* Neural pulse animation */}
          {data.isActive && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400"
              animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          
          <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {data.label}
          </div>
          <div className={`text-xs mt-1 ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
            {activation.toFixed(2)}
          </div>
          
          {/* Activation function indicator */}
          <div className={`absolute bottom-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {data.activation}
          </div>
        </div>
        
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !border-2 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: isDark ? '#3b82f6' : '#3b82f6',
            borderColor: isDark ? '#1e293b' : '#ffffff'
          }}
        />
        
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 !border-2 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: isDark ? '#8b5cf6' : '#8b5cf6',
            borderColor: isDark ? '#1e293b' : '#ffffff'
          }}
        />
      </Card>
    </motion.div>
  );
}
