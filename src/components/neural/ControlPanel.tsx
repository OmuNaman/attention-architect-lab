
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ControlPanelProps {
  learningRate: number;
  onLearningRateChange: (value: number) => void;
  activationFunction: string;
  onActivationFunctionChange: (value: string) => void;
  currentEpoch: number;
  isTraining: boolean;
  isDark: boolean;
}

export function ControlPanel({
  learningRate,
  onLearningRateChange,
  activationFunction,
  onActivationFunctionChange,
  currentEpoch,
  isTraining,
  isDark,
}: ControlPanelProps) {
  return (
    <Card className={`absolute top-20 left-4 w-72 p-4 z-40 ${
      isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white/90 border-slate-300'
    }`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Control Panel
          </h3>
          <Badge variant={isTraining ? "default" : "secondary"}>
            {isTraining ? 'Training' : 'Ready'}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Learning Rate: {learningRate.toFixed(3)}
            </label>
            <Slider
              value={[learningRate]}
              onValueChange={(values) => onLearningRateChange(values[0])}
              max={1}
              min={0.001}
              step={0.001}
              className="mt-2"
            />
          </div>
          
          <div>
            <label className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Activation Function
            </label>
            <Select value={activationFunction} onValueChange={onActivationFunctionChange}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relu">ReLU</SelectItem>
                <SelectItem value="sigmoid">Sigmoid</SelectItem>
                <SelectItem value="tanh">Tanh</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Current Epoch
            </label>
            <div className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              {currentEpoch}
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t border-slate-600">
          <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            💡 Adjust parameters and watch the network learn in real-time!
          </div>
        </div>
      </div>
    </Card>
  );
}
