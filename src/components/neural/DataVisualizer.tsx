
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface DataVisualizerProps {
  inputData: number[];
  onInputDataChange: (data: number[]) => void;
  isPlaying: boolean;
  isDark: boolean;
}

export function DataVisualizer({
  inputData,
  onInputDataChange,
  isPlaying,
  isDark,
}: DataVisualizerProps) {
  const generateRandomData = () => {
    const newData = Array.from({ length: 3 }, () => Math.random());
    onInputDataChange(newData);
  };

  const presetData = [
    { name: 'Low Values', data: [0.1, 0.2, 0.3] },
    { name: 'Medium Values', data: [0.4, 0.5, 0.6] },
    { name: 'High Values', data: [0.7, 0.8, 0.9] },
    { name: 'Mixed Values', data: [0.2, 0.8, 0.4] },
  ];

  return (
    <Card className={`absolute top-20 right-4 w-72 p-4 z-40 ${
      isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white/90 border-slate-300'
    }`}>
      <div className="space-y-4">
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
          Data Visualizer
        </h3>
        
        <div className="space-y-3">
          <div>
            <label className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Current Input Data
            </label>
            <div className="flex space-x-2 mt-2">
              {inputData.map((value, index) => (
                <motion.div
                  key={index}
                  className={`flex-1 h-16 rounded-md border-2 flex items-center justify-center ${
                    isDark ? 'border-slate-600 bg-slate-700' : 'border-slate-300 bg-slate-100'
                  }`}
                  style={{
                    backgroundColor: `rgba(59, 130, 246, ${value})`,
                  }}
                  animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
                >
                  <span className={`text-sm font-bold ${value > 0.5 ? 'text-white' : (isDark ? 'text-slate-300' : 'text-slate-700')}`}>
                    {value.toFixed(2)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <label className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Quick Presets
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {presetData.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => onInputDataChange(preset.data)}
                  className="text-xs"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>
          
          <Button
            onClick={generateRandomData}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            🎲 Random Data
          </Button>
        </div>
        
        <div className="pt-2 border-t border-slate-600">
          <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            🚀 Try different inputs and watch how the network responds!
          </div>
        </div>
      </div>
    </Card>
  );
}
