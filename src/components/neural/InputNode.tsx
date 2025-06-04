
import { Handle, Position } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useTheme } from '@/components/ThemeProvider';

interface InputNodeProps {
  data: {
    label: string;
    value: number;
    index: number;
    onValueChange: (value: number) => void;
  };
}

export function InputNode({ data }: InputNodeProps) {
  const { isDark } = useTheme();

  return (
    <Card 
      className={`min-w-[120px] transition-all duration-300 shadow-xl rounded-lg border-2 border-green-500/50 ${
        isDark ? 'bg-green-500/10' : 'bg-green-50'
      }`}
    >
      <div className="p-4">
        <div className="text-center mb-3">
          <h3 className={`font-semibold text-sm ${isDark ? 'text-green-300' : 'text-green-700'}`}>
            {data.label}
          </h3>
          <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {data.value.toFixed(2)}
          </div>
        </div>
        
        <div className="space-y-2">
          <Slider
            value={[data.value]}
            onValueChange={(values) => data.onValueChange(values[0])}
            max={1}
            min={0}
            step={0.01}
            className="w-full"
          />
          <div className={`text-xs text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Input Value
          </div>
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !border-2 rounded-full transition-colors duration-300"
        style={{
          backgroundColor: '#10b981',
          borderColor: isDark ? '#1e293b' : '#ffffff'
        }}
      />
    </Card>
  );
}
