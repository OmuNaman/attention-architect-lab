
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
import { RotateCcw, MessageSquare } from 'lucide-react';
import { NeuronNode } from '@/components/neural/NeuronNode';
import { InputNode } from '@/components/neural/InputNode';
import { OutputNode } from '@/components/neural/OutputNode';
import { WeightEdge } from '@/components/neural/WeightEdge';
import { ControlPanel } from '@/components/neural/ControlPanel';
import { ChatBot } from '@/components/ChatBot';

const nodeTypes = {
  neuron: NeuronNode,
  input: InputNode,
  output: OutputNode,
};

const edgeTypes = {
  weight: WeightEdge,
};

function WorkflowContent({ isDark, onToggleTheme }: { isDark: boolean; onToggleTheme: (isDark: boolean) => void }) {
  const [learningRate, setLearningRate] = useState(0.01);
  const [activationFunction, setActivationFunction] = useState('relu');
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Initial network structure
  const initialNodes = [
    // Input layer
    {
      id: 'input-1',
      type: 'input',
      position: { x: 100, y: 200 },
      data: { label: 'X₁', value: 0.5, index: 0, onValueChange: (val: number) => console.log('Input 1:', val) },
    },
    {
      id: 'input-2',
      type: 'input',
      position: { x: 100, y: 300 },
      data: { label: 'X₂', value: 0.8, index: 1, onValueChange: (val: number) => console.log('Input 2:', val) },
    },
    
    // Hidden layer
    {
      id: 'neuron-1',
      type: 'neuron',
      position: { x: 400, y: 150 },
      data: { label: 'H₁', activation: activationFunction, isActive: true, layerIndex: 1, neuronIndex: 0 },
    },
    {
      id: 'neuron-2',
      type: 'neuron',
      position: { x: 400, y: 250 },
      data: { label: 'H₂', activation: activationFunction, isActive: true, layerIndex: 1, neuronIndex: 1 },
    },
    {
      id: 'neuron-3',
      type: 'neuron',
      position: { x: 400, y: 350 },
      data: { label: 'H₃', activation: activationFunction, isActive: true, layerIndex: 1, neuronIndex: 2 },
    },
    
    // Output layer
    {
      id: 'output-1',
      type: 'output',
      position: { x: 700, y: 250 },
      data: { label: 'Output', value: 0.73, prediction: 'Class A' },
    },
  ];

  const initialEdges = [
    // Input to hidden connections
    { id: 'e1-h1', source: 'input-1', target: 'neuron-1', type: 'weight', data: { weight: 0.4, isActive: true } },
    { id: 'e1-h2', source: 'input-1', target: 'neuron-2', type: 'weight', data: { weight: -0.2, isActive: true } },
    { id: 'e1-h3', source: 'input-1', target: 'neuron-3', type: 'weight', data: { weight: 0.6, isActive: true } },
    { id: 'e2-h1', source: 'input-2', target: 'neuron-1', type: 'weight', data: { weight: 0.3, isActive: true } },
    { id: 'e2-h2', source: 'input-2', target: 'neuron-2', type: 'weight', data: { weight: 0.8, isActive: true } },
    { id: 'e2-h3', source: 'input-2', target: 'neuron-3', type: 'weight', data: { weight: -0.1, isActive: true } },
    
    // Hidden to output connections
    { id: 'h1-o1', source: 'neuron-1', target: 'output-1', type: 'weight', data: { weight: 0.5, isActive: true } },
    { id: 'h2-o1', source: 'neuron-2', target: 'output-1', type: 'weight', data: { weight: -0.3, isActive: true } },
    { id: 'h3-o1', source: 'neuron-3', target: 'output-1', type: 'weight', data: { weight: 0.7, isActive: true } },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const resetNetwork = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setCurrentEpoch(0);
    setIsTraining(false);
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className={`h-screen w-full transition-colors duration-300 relative overflow-hidden ${
       isDark ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'
    }`}>
      {/* Header */}
      <div className={`sticky top-4 mx-4 z-50 flex items-center justify-between backdrop-blur-md shadow-lg rounded-lg p-4 transition-colors duration-300 ${
        isDark ? 'bg-slate-800/70 border-slate-700/50' : 'bg-white/80 border-slate-300/60'
      }`}>
        <div className="flex items-center gap-4">
          <img 
            src="/image.png" 
            alt="Vizuara AI Labs" 
            className="h-8"
          />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Interactive Neural Network Learning
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsChatOpen(!isChatOpen)}
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 transition-colors duration-150 ${
              isDark 
                ? 'text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-slate-100' 
                : 'text-slate-700 border-slate-300 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            {isChatOpen ? 'Close Chat' : 'Open Chat'}
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

      {/* Main content with flow */}
      <div className="h-full pt-4">
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
          maxZoom={2}
          className="workflow-canvas"
        >
          <Background 
            gap={24}
            size={1.5}
            color={isDark ? '#334155' : '#cbd5e1'}
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

        {/* Floating Chatbot */}
        <ChatBot isOpen={isChatOpen} />
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
      <WorkflowContent isDark={isDark} onToggleTheme={handleThemeToggle} />
    </ThemeProvider>
  );
}
