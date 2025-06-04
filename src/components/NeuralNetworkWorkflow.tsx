
import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { RotateCcw, Play, Pause, Zap, Brain } from 'lucide-react';
import { NeuronNode } from '@/components/neural/NeuronNode';
import { InputNode } from '@/components/neural/InputNode';
import { OutputNode } from '@/components/neural/OutputNode';
import { WeightEdge } from '@/components/neural/WeightEdge';
import { ControlPanel } from '@/components/neural/ControlPanel';
import { DataVisualizer } from '@/components/neural/DataVisualizer';

const nodeTypes = {
  neuron: NeuronNode,
  input: InputNode,
  output: OutputNode,
};

const edgeTypes = {
  weight: WeightEdge,
};

function NetworkContent({ isDark, onToggleTheme }: { isDark: boolean; onToggleTheme: (isDark: boolean) => void }) {
  const [isTraining, setIsTraining] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [learningRate, setLearningRate] = useState(0.1);
  const [activationFunction, setActivationFunction] = useState('relu');
  const [inputData, setInputData] = useState([0.5, 0.3, 0.8]);

  // Create initial neural network structure
  const initialNodes = useMemo(() => [
    // Input Layer
    {
      id: 'input-1',
      type: 'input',
      position: { x: 50, y: 100 },
      data: { 
        label: 'Input 1',
        value: inputData[0],
        index: 0,
        onValueChange: (value: number) => {
          setInputData(prev => {
            const newData = [...prev];
            newData[0] = value;
            return newData;
          });
        }
      },
    },
    {
      id: 'input-2',
      type: 'input',
      position: { x: 50, y: 250 },
      data: { 
        label: 'Input 2',
        value: inputData[1],
        index: 1,
        onValueChange: (value: number) => {
          setInputData(prev => {
            const newData = [...prev];
            newData[1] = value;
            return newData;
          });
        }
      },
    },
    {
      id: 'input-3',
      type: 'input',
      position: { x: 50, y: 400 },
      data: { 
        label: 'Input 3',
        value: inputData[2],
        index: 2,
        onValueChange: (value: number) => {
          setInputData(prev => {
            const newData = [...prev];
            newData[2] = value;
            return newData;
          });
        }
      },
    },
    
    // Hidden Layer 1
    {
      id: 'hidden1-1',
      type: 'neuron',
      position: { x: 300, y: 80 },
      data: { 
        label: 'H1-1',
        activation: activationFunction,
        isActive: isPlaying,
        layerIndex: 1,
        neuronIndex: 0
      },
    },
    {
      id: 'hidden1-2',
      type: 'neuron',
      position: { x: 300, y: 180 },
      data: { 
        label: 'H1-2',
        activation: activationFunction,
        isActive: isPlaying,
        layerIndex: 1,
        neuronIndex: 1
      },
    },
    {
      id: 'hidden1-3',
      type: 'neuron',
      position: { x: 300, y: 280 },
      data: { 
        label: 'H1-3',
        activation: activationFunction,
        isActive: isPlaying,
        layerIndex: 1,
        neuronIndex: 2
      },
    },
    {
      id: 'hidden1-4',
      type: 'neuron',
      position: { x: 300, y: 380 },
      data: { 
        label: 'H1-4',
        activation: activationFunction,
        isActive: isPlaying,
        layerIndex: 1,
        neuronIndex: 3
      },
    },
    
    // Hidden Layer 2
    {
      id: 'hidden2-1',
      type: 'neuron',
      position: { x: 550, y: 130 },
      data: { 
        label: 'H2-1',
        activation: activationFunction,
        isActive: isPlaying,
        layerIndex: 2,
        neuronIndex: 0
      },
    },
    {
      id: 'hidden2-2',
      type: 'neuron',
      position: { x: 550, y: 230 },
      data: { 
        label: 'H2-2',
        activation: activationFunction,
        isActive: isPlaying,
        layerIndex: 2,
        neuronIndex: 1
      },
    },
    {
      id: 'hidden2-3',
      type: 'neuron',
      position: { x: 550, y: 330 },
      data: { 
        label: 'H2-3',
        activation: activationFunction,
        isActive: isPlaying,
        layerIndex: 2,
        neuronIndex: 2
      },
    },
    
    // Output Layer
    {
      id: 'output-1',
      type: 'output',
      position: { x: 800, y: 180 },
      data: { 
        label: 'Output 1',
        value: 0,
        prediction: 'Class A'
      },
    },
    {
      id: 'output-2',
      type: 'output',
      position: { x: 800, y: 280 },
      data: { 
        label: 'Output 2',
        value: 0,
        prediction: 'Class B'
      },
    },
  ], [inputData, activationFunction, isPlaying]);

  const initialEdges = useMemo(() => {
    const edges = [];
    
    // Input to Hidden Layer 1
    const inputIds = ['input-1', 'input-2', 'input-3'];
    const hidden1Ids = ['hidden1-1', 'hidden1-2', 'hidden1-3', 'hidden1-4'];
    
    inputIds.forEach(inputId => {
      hidden1Ids.forEach(hiddenId => {
        edges.push({
          id: `${inputId}-${hiddenId}`,
          source: inputId,
          target: hiddenId,
          type: 'weight',
          data: { 
            weight: Math.random() * 2 - 1,
            isActive: isPlaying
          },
          animated: isPlaying,
        });
      });
    });
    
    // Hidden Layer 1 to Hidden Layer 2
    const hidden2Ids = ['hidden2-1', 'hidden2-2', 'hidden2-3'];
    
    hidden1Ids.forEach(hidden1Id => {
      hidden2Ids.forEach(hidden2Id => {
        edges.push({
          id: `${hidden1Id}-${hidden2Id}`,
          source: hidden1Id,
          target: hidden2Id,
          type: 'weight',
          data: { 
            weight: Math.random() * 2 - 1,
            isActive: isPlaying
          },
          animated: isPlaying,
        });
      });
    });
    
    // Hidden Layer 2 to Output
    const outputIds = ['output-1', 'output-2'];
    
    hidden2Ids.forEach(hidden2Id => {
      outputIds.forEach(outputId => {
        edges.push({
          id: `${hidden2Id}-${outputId}`,
          source: hidden2Id,
          target: outputId,
          type: 'weight',
          data: { 
            weight: Math.random() * 2 - 1,
            isActive: isPlaying
          },
          animated: isPlaying,
        });
      });
    });
    
    return edges;
  }, [isPlaying]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const resetNetwork = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setCurrentEpoch(0);
    setIsTraining(false);
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const startTraining = () => {
    setIsTraining(true);
    setIsPlaying(true);
  };

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className={`h-screen w-full transition-colors duration-300 relative overflow-hidden ${
       isDark ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 text-white' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-slate-900'
    }`}>
      {/* Header */}
      <div className={`sticky top-4 mx-4 z-50 flex items-center justify-between backdrop-blur-md shadow-lg rounded-lg p-4 transition-colors duration-300 ${
        isDark ? 'bg-slate-800/70 border-slate-700/50' : 'bg-white/80 border-slate-300/60'
      }`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-500" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Interactive Neural Network Explorer
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={togglePlayback}
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 transition-colors duration-150 ${
              isPlaying ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-green-500/20 border-green-500/50 text-green-400'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button
            onClick={startTraining}
            variant="outline"
            size="sm"
            disabled={isTraining}
            className="flex items-center gap-2 bg-purple-500/20 border-purple-500/50 text-purple-400"
          >
            <Zap className="w-4 h-4" />
            {isTraining ? 'Training...' : 'Train'}
          </Button>
          <Button
            onClick={resetNetwork}
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 transition-colors duration-150 ${
              isDark 
                ? 'text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-slate-100' 
                : 'text-slate-700 border-slate-300 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>

      {/* Main content with flow */}
      <div className="h-full pt-4 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          minZoom={0.1}
          maxZoom={4}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          className="neural-network-canvas"
        >
          <Background 
            gap={24}
            size={1.5}
            color={isDark ? '#1e293b' : '#cbd5e1'}
            variant="dots"
          />
          <MiniMap 
            nodeColor={(node) => {
              switch (node.type) {
                case 'input': return isDark ? '#10b981' : '#059669';
                case 'neuron': return isDark ? '#3b82f6' : '#2563eb';
                case 'output': return isDark ? '#f59e0b' : '#d97706';
                default: return isDark ? '#6b7280' : '#4b5563';
              }
            }}
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(241, 245, 249, 0.8)',
              border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
              borderRadius: '0.375rem'
            }}
            maskColor={isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(226, 232, 240, 0.7)'}
          />
          <Controls />
        </ReactFlow>

        {/* Control Panel */}
        <ControlPanel
          learningRate={learningRate}
          onLearningRateChange={setLearningRate}
          activationFunction={activationFunction}
          onActivationFunctionChange={setActivationFunction}
          currentEpoch={currentEpoch}
          isTraining={isTraining}
          isDark={isDark}
        />

        {/* Data Visualizer */}
        <DataVisualizer
          inputData={inputData}
          onInputDataChange={setInputData}
          isPlaying={isPlaying}
          isDark={isDark}
        />
      </div>
    </div>
  );
}

export function NeuralNetworkWorkflow() {
  const [isDark, setIsDark] = useState(true);

  const handleThemeToggle = (newIsDark: boolean) => {
    setIsDark(newIsDark);
  };

  return (
    <ThemeProvider isDark={isDark}>
      <NetworkContent isDark={isDark} onToggleTheme={handleThemeToggle} />
    </ThemeProvider>
  );
}
