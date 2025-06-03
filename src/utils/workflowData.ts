
import { Node, Edge } from '@xyflow/react';
import { 
  INPUT_MATRIX, 
  WQ_MATRIX_HEAD1, WQ_MATRIX_HEAD2, WQ_MATRIX_HEAD3,
  WK_MATRIX_HEAD1, WK_MATRIX_HEAD2, WK_MATRIX_HEAD3,
  WV_MATRIX_HEAD1, WV_MATRIX_HEAD2, WV_MATRIX_HEAD3,
  WO_MATRIX,
  calculateExpected 
} from '@/utils/matrixCalculations';

const NODE_VERTICAL_GAP = 200;
const NODE_HORIZONTAL_GAP = 600;

// Head colors for creative differentiation
const HEAD_COLORS = {
  1: { primary: '#FF6B6B', secondary: '#FFE0E0', border: '#FF4444' }, // Red theme
  2: { primary: '#4ECDC4', secondary: '#E0F7F5', border: '#2EBCB3' }, // Teal theme  
  3: { primary: '#45B7D1', secondary: '#E0F3FA', border: '#2196F3' }  // Blue theme
};

let currentY = 50;

export const initialNodes: Node[] = [
  // Input Matrix (shared across all heads)
  {
    id: 'input-matrix',
    type: 'matrix',
    position: { x: 100, y: currentY },
    data: {
      label: 'Input Matrix',
      matrix: INPUT_MATRIX,
      description: 'Token embeddings (5×5)',
      isInput: true,
    },
  },

  // HEAD 1 - Red Theme
  {
    id: 'wq-matrix-head1',
    type: 'matrix',
    position: { x: 100, y: (currentY += 300) },
    data: {
      label: 'Wq₁ (Head 1)',
      matrix: WQ_MATRIX_HEAD1.map((_, i) => WQ_MATRIX_HEAD1.map(row => row[i])),
      description: 'Query weights Head 1 (5×3)',
      isInput: true,
      headNumber: 1,
      headColor: HEAD_COLORS[1],
    },
  },
  {
    id: 'wk-matrix-head1',
    type: 'matrix',
    position: { x: 100, y: (currentY += 250) },
    data: {
      label: 'Wk₁ (Head 1)',
      matrix: WK_MATRIX_HEAD1.map((_, i) => WK_MATRIX_HEAD1.map(row => row[i])),
      description: 'Key weights Head 1 (5×3)',
      isInput: true,
      headNumber: 1,
      headColor: HEAD_COLORS[1],
    },
  },
  {
    id: 'wv-matrix-head1',
    type: 'matrix',
    position: { x: 100, y: (currentY += 250) },
    data: {
      label: 'Wv₁ (Head 1)',
      matrix: WV_MATRIX_HEAD1.map((_, i) => WV_MATRIX_HEAD1.map(row => row[i])),
      description: 'Value weights Head 1 (5×3)',
      isInput: true,
      headNumber: 1,
      headColor: HEAD_COLORS[1],
    },
  },

  // HEAD 2 - Teal Theme
  {
    id: 'wq-matrix-head2',
    type: 'matrix',
    position: { x: 100, y: (currentY += 350) },
    data: {
      label: 'Wq₂ (Head 2)',
      matrix: WQ_MATRIX_HEAD2.map((_, i) => WQ_MATRIX_HEAD2.map(row => row[i])),
      description: 'Query weights Head 2 (5×3)',
      isInput: true,
      headNumber: 2,
      headColor: HEAD_COLORS[2],
    },
  },
  {
    id: 'wk-matrix-head2',
    type: 'matrix',
    position: { x: 100, y: (currentY += 250) },
    data: {
      label: 'Wk₂ (Head 2)',
      matrix: WK_MATRIX_HEAD2.map((_, i) => WK_MATRIX_HEAD2.map(row => row[i])),
      description: 'Key weights Head 2 (5×3)',
      isInput: true,
      headNumber: 2,
      headColor: HEAD_COLORS[2],
    },
  },
  {
    id: 'wv-matrix-head2',
    type: 'matrix',
    position: { x: 100, y: (currentY += 250) },
    data: {
      label: 'Wv₂ (Head 2)',
      matrix: WV_MATRIX_HEAD2.map((_, i) => WV_MATRIX_HEAD2.map(row => row[i])),
      description: 'Value weights Head 2 (5×3)',
      isInput: true,
      headNumber: 2,
      headColor: HEAD_COLORS[2],
    },
  },

  // HEAD 3 - Blue Theme
  {
    id: 'wq-matrix-head3',
    type: 'matrix',
    position: { x: 100, y: (currentY += 350) },
    data: {
      label: 'Wq₃ (Head 3)',
      matrix: WQ_MATRIX_HEAD3.map((_, i) => WQ_MATRIX_HEAD3.map(row => row[i])),
      description: 'Query weights Head 3 (5×3)',
      isInput: true,
      headNumber: 3,
      headColor: HEAD_COLORS[3],
    },
  },
  {
    id: 'wk-matrix-head3',
    type: 'matrix',
    position: { x: 100, y: (currentY += 250) },
    data: {
      label: 'Wk₃ (Head 3)',
      matrix: WK_MATRIX_HEAD3.map((_, i) => WK_MATRIX_HEAD3.map(row => row[i])),
      description: 'Key weights Head 3 (5×3)',
      isInput: true,
      headNumber: 3,
      headColor: HEAD_COLORS[3],
    },
  },
  {
    id: 'wv-matrix-head3',
    type: 'matrix',
    position: { x: 100, y: (currentY += 250) },
    data: {
      label: 'Wv₃ (Head 3)',
      matrix: WV_MATRIX_HEAD3.map((_, i) => WV_MATRIX_HEAD3.map(row => row[i])),
      description: 'Value weights Head 3 (5×3)',
      isInput: true,
      headNumber: 3,
      headColor: HEAD_COLORS[3],
    },
  },

  // HEAD 1 CALCULATIONS - Red Theme
  {
    id: 'calc-q-head1',
    type: 'calculation',
    position: { x: 800, y: 400 },
    data: {
      label: 'Calculate Q₁',
      formula: 'Q₁ = Input × Wq₁',
      description: 'Query matrix Head 1 (5×3)',
      expectedMatrix: calculateExpected('q', 1),
      hint: 'Multiply Input with Wq₁ to get Query matrix for Head 1',
      headNumber: 1,
      headColor: HEAD_COLORS[1],
    },
  },
  {
    id: 'calc-k-head1',
    type: 'calculation',
    position: { x: 800, y: 700 },
    data: {
      label: 'Calculate K₁',
      formula: 'K₁ = Input × Wk₁',
      description: 'Key matrix Head 1 (5×3)',
      expectedMatrix: calculateExpected('k', 1),
      hint: 'Multiply Input with Wk₁ to get Key matrix for Head 1',
      headNumber: 1,
      headColor: HEAD_COLORS[1],
    },
  },
  {
    id: 'calc-v-head1',
    type: 'calculation',
    position: { x: 800, y: 1000 },
    data: {
      label: 'Calculate V₁',
      formula: 'V₁ = Input × Wv₁',
      description: 'Value matrix Head 1 (5×3)',
      expectedMatrix: calculateExpected('v', 1),
      hint: 'Multiply Input with Wv₁ to get Value matrix for Head 1',
      headNumber: 1,
      headColor: HEAD_COLORS[1],
    },
  },

  // HEAD 2 CALCULATIONS - Teal Theme
  {
    id: 'calc-q-head2',
    type: 'calculation',
    position: { x: 800, y: 1350 },
    data: {
      label: 'Calculate Q₂',
      formula: 'Q₂ = Input × Wq₂',
      description: 'Query matrix Head 2 (5×3)',
      expectedMatrix: calculateExpected('q', 2),
      hint: 'Multiply Input with Wq₂ to get Query matrix for Head 2',
      headNumber: 2,
      headColor: HEAD_COLORS[2],
    },
  },
  {
    id: 'calc-k-head2',
    type: 'calculation',
    position: { x: 800, y: 1650 },
    data: {
      label: 'Calculate K₂',
      formula: 'K₂ = Input × Wk₂',
      description: 'Key matrix Head 2 (5×3)',
      expectedMatrix: calculateExpected('k', 2),
      hint: 'Multiply Input with Wk₂ to get Key matrix for Head 2',
      headNumber: 2,
      headColor: HEAD_COLORS[2],
    },
  },
  {
    id: 'calc-v-head2',
    type: 'calculation',
    position: { x: 800, y: 1950 },
    data: {
      label: 'Calculate V₂',
      formula: 'V₂ = Input × Wv₂',
      description: 'Value matrix Head 2 (5×3)',
      expectedMatrix: calculateExpected('v', 2),
      hint: 'Multiply Input with Wv₂ to get Value matrix for Head 2',
      headNumber: 2,
      headColor: HEAD_COLORS[2],
    },
  },

  // HEAD 3 CALCULATIONS - Blue Theme
  {
    id: 'calc-q-head3',
    type: 'calculation',
    position: { x: 800, y: 2300 },
    data: {
      label: 'Calculate Q₃',
      formula: 'Q₃ = Input × Wq₃',
      description: 'Query matrix Head 3 (5×3)',
      expectedMatrix: calculateExpected('q', 3),
      hint: 'Multiply Input with Wq₃ to get Query matrix for Head 3',
      headNumber: 3,
      headColor: HEAD_COLORS[3],
    },
  },
  {
    id: 'calc-k-head3',
    type: 'calculation',
    position: { x: 800, y: 2600 },
    data: {
      label: 'Calculate K₃',
      formula: 'K₃ = Input × Wk₃',
      description: 'Key matrix Head 3 (5×3)',
      expectedMatrix: calculateExpected('k', 3),
      hint: 'Multiply Input with Wk₃ to get Key matrix for Head 3',
      headNumber: 3,
      headColor: HEAD_COLORS[3],
    },
  },
  {
    id: 'calc-v-head3',
    type: 'calculation',
    position: { x: 800, y: 2900 },
    data: {
      label: 'Calculate V₃',
      formula: 'V₃ = Input × Wv₃',
      description: 'Value matrix Head 3 (5×3)',
      expectedMatrix: calculateExpected('v', 3),
      hint: 'Multiply Input with Wv₃ to get Value matrix for Head 3',
      headNumber: 3,
      headColor: HEAD_COLORS[3],
    },
  },

  // ATTENTION CALCULATIONS FOR EACH HEAD
  {
    id: 'calc-scores-head1',
    type: 'calculation',
    position: { x: 1400, y: 550 },
    data: {
      label: 'Scores₁',
      formula: 'Scores₁ = (Q₁ × K₁ᵀ) / √3',
      description: 'Attention scores Head 1 (5×5)',
      expectedMatrix: calculateExpected('scores', 1),
      hint: 'Calculate attention scores for Head 1',
      headNumber: 1,
      headColor: HEAD_COLORS[1],
    },
  },
  {
    id: 'calc-softmax-head1',
    type: 'calculation',
    position: { x: 2000, y: 550 },
    data: {
      label: 'Attention₁',
      formula: 'Attention₁ = softmax(Scores₁)',
      description: 'Softmax attention Head 1 (5×5)',
      expectedMatrix: calculateExpected('softmax', 1),
      hint: 'Apply softmax to scores for Head 1',
      headNumber: 1,
      headColor: HEAD_COLORS[1],
    },
  },

  {
    id: 'calc-scores-head2',
    type: 'calculation',
    position: { x: 1400, y: 1500 },
    data: {
      label: 'Scores₂',
      formula: 'Scores₂ = (Q₂ × K₂ᵀ) / √3',
      description: 'Attention scores Head 2 (5×5)',
      expectedMatrix: calculateExpected('scores', 2),
      hint: 'Calculate attention scores for Head 2',
      headNumber: 2,
      headColor: HEAD_COLORS[2],
    },
  },
  {
    id: 'calc-softmax-head2',
    type: 'calculation',
    position: { x: 2000, y: 1500 },
    data: {
      label: 'Attention₂',
      formula: 'Attention₂ = softmax(Scores₂)',
      description: 'Softmax attention Head 2 (5×5)',
      expectedMatrix: calculateExpected('softmax', 2),
      hint: 'Apply softmax to scores for Head 2',
      headNumber: 2,
      headColor: HEAD_COLORS[2],
    },
  },

  {
    id: 'calc-scores-head3',
    type: 'calculation',
    position: { x: 1400, y: 2450 },
    data: {
      label: 'Scores₃',
      formula: 'Scores₃ = (Q₃ × K₃ᵀ) / √3',
      description: 'Attention scores Head 3 (5×5)',
      expectedMatrix: calculateExpected('scores', 3),
      hint: 'Calculate attention scores for Head 3',
      headNumber: 3,
      headColor: HEAD_COLORS[3],
    },
  },
  {
    id: 'calc-softmax-head3',
    type: 'calculation',
    position: { x: 2000, y: 2450 },
    data: {
      label: 'Attention₃',
      formula: 'Attention₃ = softmax(Scores₃)',
      description: 'Softmax attention Head 3 (5×5)',
      expectedMatrix: calculateExpected('softmax', 3),
      hint: 'Apply softmax to scores for Head 3',
      headNumber: 3,
      headColor: HEAD_COLORS[3],
    },
  },

  // OUTPUT WEIGHT MATRIX
  {
    id: 'wo-matrix',
    type: 'matrix',
    position: { x: 2600, y: 1400 },
    data: {
      label: 'Output Weights (Wo)',
      matrix: WO_MATRIX,
      description: 'Output projection weights (9×5)',
      isInput: true,
    },
  },

  // FINAL OUTPUT
  {
    id: 'calc-output',
    type: 'calculation',
    position: { x: 3200, y: 1500 },
    data: {
      label: 'Final Output',
      formula: 'Output = Concat(Head₁,Head₂,Head₃) × Wo',
      description: 'Multi-head attention output (5×5)',
      expectedMatrix: calculateExpected('output'),
      hint: 'Concatenate all head outputs and multiply by Wo',
    },
  },
];

export const initialEdges: Edge[] = [
  // Input to all head calculations
  { id: 'input-to-q1', source: 'input-matrix', target: 'calc-q-head1', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[1].primary } },
  { id: 'input-to-k1', source: 'input-matrix', target: 'calc-k-head1', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[1].primary } },
  { id: 'input-to-v1', source: 'input-matrix', target: 'calc-v-head1', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[1].primary } },
  
  { id: 'input-to-q2', source: 'input-matrix', target: 'calc-q-head2', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[2].primary } },
  { id: 'input-to-k2', source: 'input-matrix', target: 'calc-k-head2', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[2].primary } },
  { id: 'input-to-v2', source: 'input-matrix', target: 'calc-v-head2', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[2].primary } },
  
  { id: 'input-to-q3', source: 'input-matrix', target: 'calc-q-head3', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[3].primary } },
  { id: 'input-to-k3', source: 'input-matrix', target: 'calc-k-head3', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[3].primary } },
  { id: 'input-to-v3', source: 'input-matrix', target: 'calc-v-head3', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[3].primary } },

  // Weight matrices to calculations
  { id: 'wq1-to-q1', source: 'wq-matrix-head1', target: 'calc-q-head1', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[1].primary } },
  { id: 'wk1-to-k1', source: 'wk-matrix-head1', target: 'calc-k-head1', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[1].primary } },
  { id: 'wv1-to-v1', source: 'wv-matrix-head1', target: 'calc-v-head1', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[1].primary } },
  
  { id: 'wq2-to-q2', source: 'wq-matrix-head2', target: 'calc-q-head2', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[2].primary } },
  { id: 'wk2-to-k2', source: 'wk-matrix-head2', target: 'calc-k-head2', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[2].primary } },
  { id: 'wv2-to-v2', source: 'wv-matrix-head2', target: 'calc-v-head2', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[2].primary } },
  
  { id: 'wq3-to-q3', source: 'wq-matrix-head3', target: 'calc-q-head3', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[3].primary } },
  { id: 'wk3-to-k3', source: 'wk-matrix-head3', target: 'calc-k-head3', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[3].primary } },
  { id: 'wv3-to-v3', source: 'wv-matrix-head3', target: 'calc-v-head3', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[3].primary } },

  // Q,K to scores
  { id: 'q1-to-scores1', source: 'calc-q-head1', target: 'calc-scores-head1', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[1].primary } },
  { id: 'k1-to-scores1', source: 'calc-k-head1', target: 'calc-scores-head1', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[1].primary } },
  
  { id: 'q2-to-scores2', source: 'calc-q-head2', target: 'calc-scores-head2', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[2].primary } },
  { id: 'k2-to-scores2', source: 'calc-k-head2', target: 'calc-scores-head2', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[2].primary } },
  
  { id: 'q3-to-scores3', source: 'calc-q-head3', target: 'calc-scores-head3', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[3].primary } },
  { id: 'k3-to-scores3', source: 'calc-k-head3', target: 'calc-scores-head3', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[3].primary } },

  // Scores to softmax
  { id: 'scores1-to-softmax1', source: 'calc-scores-head1', target: 'calc-softmax-head1', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[1].primary } },
  { id: 'scores2-to-softmax2', source: 'calc-scores-head2', target: 'calc-softmax-head2', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[2].primary } },
  { id: 'scores3-to-softmax3', source: 'calc-scores-head3', target: 'calc-softmax-head3', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[3].primary } },

  // All heads to final output
  { id: 'softmax1-to-output', source: 'calc-softmax-head1', target: 'calc-output', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[1].primary } },
  { id: 'softmax2-to-output', source: 'calc-softmax-head2', target: 'calc-output', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[2].primary } },
  { id: 'softmax3-to-output', source: 'calc-softmax-head3', target: 'calc-output', animated: true, style: { strokeWidth: 2, stroke: HEAD_COLORS[3].primary } },
  { id: 'wo-to-output', source: 'wo-matrix', target: 'calc-output', animated: true, style: { strokeWidth: 2 } },
];
