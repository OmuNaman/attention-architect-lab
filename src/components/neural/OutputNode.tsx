
import { Handle, Position } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';

interface OutputNodeProps {
  data: {
    label: string;
    value: number;
    prediction: string;
  };
}

export function OutputNode({ data }: OutputNodeProps) {
  const { isDark } = useTheme();
  const confidence = data.value * 100;

  return (
    <motion.div
      animate={{ scale: data.value > 0.8 ? [1, 1.05, 1] : 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        className={`min-w-[140px] transition-all duration-300 shadow-xl rounded-lg border-2 border-orange-500/50 ${
          isDark ? 'bg-orange-500/10' : 'bg-orange-50'
        }`}
      >
        <div className="p-4">
          <div className="text-center mb-3">
            <h3 className={`font-semibold text-sm ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
              {data.label}
            </h3>
            <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {data.value.toFixed(3)}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {data.prediction}
            </div>
            
            {/* Confidence bar */}
            <div className={`w-full h-2 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className={`text-xs text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Confidence: {confidence.toFixed(1)}%
            </div>
          </div>
        </div>
        
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !border-2 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: '#f59e0b',
            borderColor: isDark ? '#1e293b' : '#ffffff'
          }}
        />
      </Card>
    </motion.div>
  );
}
