
import type { Node, Edge } from '@xyflow/react';

// Head color themes for visual differentiation
const HEAD_COLORS = {
  1: {
    primary: '#ef4444',    // Red
    secondary: '#fef2f2',  // Light red
    border: '#dc2626'      // Dark red
  },
  2: {
    primary: '#14b8a6',    // Teal
    secondary: '#f0fdfa',  // Light teal
    border: '#0d9488'      // Dark teal
  },
  3: {
    primary: '#3b82f6',    // Blue
    secondary: '#eff6ff',  // Light blue
    border: '#2563eb'      // Dark blue
  }
};

// Grid-based coordinate system with proper spacing
const GRID = {
  // Base coordinates for the grid system
  ORIGIN_X: 100,
  ORIGIN_Y: 100,
  
  // Spacing between columns and rows
  COLUMN_SPACING: 600,   // Horizontal distance between columns
  ROW_SPACING: 400,      // Vertical distance between rows within a head
  HEAD_SPACING: 1200,    // Vertical distance between different heads
  
  // Node dimensions for calculations
  NODE_WIDTH: 320,
  NODE_HEIGHT: 200,
};

// Helper function to calculate grid positions
const getGridPosition = (column: number, row: number, headIndex: number = 0) => ({
  x: GRID.ORIGIN_X + (column * GRID.COLUMN_SPACING),
  y: GRID.ORIGIN_Y + (row * GRID.ROW_SPACING) + (headIndex * GRID.HEAD_SPACING)
});

export const initialNodes: Node[] = [
  // Input Matrix (Column 0, Row 1, centered between all heads)
  {
    id: 'input',
    type: 'matrix',
    position: getGridPosition(0, 1, 1), // Centered vertically between the 3 heads
    data: {
      label: 'Input Matrix',
      matrix: [
        [1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0]
      ],
      description: 'Input embeddings (5×6)',
      isInput: true
    }
  },

  // ====================== HEAD 1 (RED) - Row indices 0-2 ======================
  // Weight Matrices - Head 1 (Column 1)
  {
    id: 'wq-head1',
    type: 'matrix',
    position: getGridPosition(1, 0, 0),
    data: {
      label: 'Wq Matrix',
      matrix: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      description: 'Query weights (6×3)',
      headNumber: 1,
      headColor: HEAD_COLORS[1]
    }
  },
  {
    id: 'wk-head1',
    type: 'matrix',
    position: getGridPosition(1, 1, 0),
    data: {
      label: 'Wk Matrix',
      matrix: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      description: 'Key weights (6×3)',
      headNumber: 1,
      headColor: HEAD_COLORS[1]
    }
  },
  {
    id: 'wv-head1',
    type: 'matrix',
    position: getGridPosition(1, 2, 0),
    data: {
      label: 'Wv Matrix',
      matrix: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      description: 'Value weights (6×3)',
      headNumber: 1,
      headColor: HEAD_COLORS[1]
    }
  },

  // Calculation Nodes - Head 1 (Column 2)
  {
    id: 'calc-q-head1',
    type: 'calculation',
    position: getGridPosition(2, 0, 0),
    data: {
      label: 'Calculate Q₁',
      formula: 'Q₁ = Input × Wq₁',
      description: 'Query matrix for Head 1',
      expectedMatrix: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0],
        [0, 0, 0]
      ],
      hint: 'Multiply the input matrix (5×6) with Wq₁ (6×3) to get Q₁ (5×3)',
      headNumber: 1,
      headColor: HEAD_COLORS[1]
    }
  },
  {
    id: 'calc-k-head1',
    type: 'calculation',
    position: getGridPosition(2, 1, 0),
    data: {
      label: 'Calculate K₁',
      formula: 'K₁ = Input × Wk₁',
      description: 'Key matrix for Head 1',
      expectedMatrix: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0],
        [0, 0, 0]
      ],
      hint: 'Multiply the input matrix (5×6) with Wk₁ (6×3) to get K₁ (5×3)',
      headNumber: 1,
      headColor: HEAD_COLORS[1]
    }
  },
  {
    id: 'calc-v-head1',
    type: 'calculation',
    position: getGridPosition(2, 2, 0),
    data: {
      label: 'Calculate V₁',
      formula: 'V₁ = Input × Wv₁',
      description: 'Value matrix for Head 1',
      expectedMatrix: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0],
        [0, 0, 0]
      ],
      hint: 'Multiply the input matrix (5×6) with Wv₁ (6×3) to get V₁ (5×3)',
      headNumber: 1,
      headColor: HEAD_COLORS[1]
    }
  },

  // Attention Calculation - Head 1 (Column 3)
  {
    id: 'calc-scores-head1',
    type: 'calculation',
    position: getGridPosition(3, 0.5, 0),
    data: {
      label: 'Attention Scores₁',
      formula: 'Scores₁ = (Q₁ × K₁ᵀ) / √3',
      description: 'Scaled attention scores for Head 1',
      expectedMatrix: [
        [0.5774, 0, 0, 0, 0],
        [0, 0.5774, 0, 0, 0],
        [0, 0, 0.5774, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      hint: 'Compute Q₁ × K₁ᵀ then divide by √3 (≈1.732)',
      headNumber: 1,
      headColor: HEAD_COLORS[1]
    }
  },

  // Softmax - Head 1 (Column 4)
  {
    id: 'calc-softmax-head1',
    type: 'calculation',
    position: getGridPosition(4, 0.5, 0),
    data: {
      label: 'Softmax₁',
      formula: 'Attention₁ = softmax(Scores₁)',
      description: 'Attention weights for Head 1',
      expectedMatrix: [
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0.2, 0.2, 0.2, 0.2, 0.2],
        [0.2, 0.2, 0.2, 0.2, 0.2]
      ],
      hint: 'Apply softmax function row-wise to the attention scores',
      headNumber: 1,
      headColor: HEAD_COLORS[1]
    }
  },

  // ====================== HEAD 2 (TEAL) - Row indices 0-2, Head index 1 ======================
  // Weight Matrices - Head 2 (Column 1)
  {
    id: 'wq-head2',
    type: 'matrix',
    position: getGridPosition(1, 0, 1),
    data: {
      label: 'Wq Matrix',
      matrix: [
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0],
        [0, 0, 0]
      ],
      description: 'Query weights (6×3)',
      headNumber: 2,
      headColor: HEAD_COLORS[2]
    }
  },
  {
    id: 'wk-head2',
    type: 'matrix',
    position: getGridPosition(1, 1, 1),
    data: {
      label: 'Wk Matrix',
      matrix: [
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0],
        [0, 0, 0]
      ],
      description: 'Key weights (6×3)',
      headNumber: 2,
      headColor: HEAD_COLORS[2]
    }
  },
  {
    id: 'wv-head2',
    type: 'matrix',
    position: getGridPosition(1, 2, 1),
    data: {
      label: 'Wv Matrix',
      matrix: [
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0],
        [0, 0, 0]
      ],
      description: 'Value weights (6×3)',
      headNumber: 2,
      headColor: HEAD_COLORS[2]
    }
  },

  // Calculation Nodes - Head 2 (Column 2)
  {
    id: 'calc-q-head2',
    type: 'calculation',
    position: getGridPosition(2, 0, 1),
    data: {
      label: 'Calculate Q₂',
      formula: 'Q₂ = Input × Wq₂',
      description: 'Query matrix for Head 2',
      expectedMatrix: [
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0]
      ],
      hint: 'Multiply the input matrix (5×6) with Wq₂ (6×3) to get Q₂ (5×3)',
      headNumber: 2,
      headColor: HEAD_COLORS[2]
    }
  },
  {
    id: 'calc-k-head2',
    type: 'calculation',
    position: getGridPosition(2, 1, 1),
    data: {
      label: 'Calculate K₂',
      formula: 'K₂ = Input × Wk₂',
      description: 'Key matrix for Head 2',
      expectedMatrix: [
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0]
      ],
      hint: 'Multiply the input matrix (5×6) with Wk₂ (6×3) to get K₂ (5×3)',
      headNumber: 2,
      headColor: HEAD_COLORS[2]
    }
  },
  {
    id: 'calc-v-head2',
    type: 'calculation',
    position: getGridPosition(2, 2, 1),
    data: {
      label: 'Calculate V₂',
      formula: 'V₂ = Input × Wv₂',
      description: 'Value matrix for Head 2',
      expectedMatrix: [
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0]
      ],
      hint: 'Multiply the input matrix (5×6) with Wv₂ (6×3) to get V₂ (5×3)',
      headNumber: 2,
      headColor: HEAD_COLORS[2]
    }
  },

  // Attention Calculation - Head 2 (Column 3)
  {
    id: 'calc-scores-head2',
    type: 'calculation',
    position: getGridPosition(3, 0.5, 1),
    data: {
      label: 'Attention Scores₂',
      formula: 'Scores₂ = (Q₂ × K₂ᵀ) / √3',
      description: 'Scaled attention scores for Head 2',
      expectedMatrix: [
        [0, 0, 0, 0, 0],
        [0, 0.5774, 0, 0, 0],
        [0, 0, 0.5774, 0, 0],
        [0, 0, 0, 0.5774, 0],
        [0, 0, 0, 0, 0]
      ],
      hint: 'Compute Q₂ × K₂ᵀ then divide by √3 (≈1.732)',
      headNumber: 2,
      headColor: HEAD_COLORS[2]
    }
  },

  // Softmax - Head 2 (Column 4)
  {
    id: 'calc-softmax-head2',
    type: 'calculation',
    position: getGridPosition(4, 0.5, 1),
    data: {
      label: 'Softmax₂',
      formula: 'Attention₂ = softmax(Scores₂)',
      description: 'Attention weights for Head 2',
      expectedMatrix: [
        [0.2, 0.2, 0.2, 0.2, 0.2],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0.2, 0.2, 0.2, 0.2, 0.2]
      ],
      hint: 'Apply softmax function row-wise to the attention scores',
      headNumber: 2,
      headColor: HEAD_COLORS[2]
    }
  },

  // ====================== HEAD 3 (BLUE) - Row indices 0-2, Head index 2 ======================
  // Weight Matrices - Head 3 (Column 1)
  {
    id: 'wq-head3',
    type: 'matrix',
    position: getGridPosition(1, 0, 2),
    data: {
      label: 'Wq Matrix',
      matrix: [
        [0, 0, 0],
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0]
      ],
      description: 'Query weights (6×3)',
      headNumber: 3,
      headColor: HEAD_COLORS[3]
    }
  },
  {
    id: 'wk-head3',
    type: 'matrix',
    position: getGridPosition(1, 1, 2),
    data: {
      label: 'Wk Matrix',
      matrix: [
        [0, 0, 0],
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0]
      ],
      description: 'Key weights (6×3)',
      headNumber: 3,
      headColor: HEAD_COLORS[3]
    }
  },
  {
    id: 'wv-head3',
    type: 'matrix',
    position: getGridPosition(1, 2, 2),
    data: {
      label: 'Wv Matrix',
      matrix: [
        [0, 0, 0],
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0]
      ],
      description: 'Value weights (6×3)',
      headNumber: 3,
      headColor: HEAD_COLORS[3]
    }
  },

  // Calculation Nodes - Head 3 (Column 2)
  {
    id: 'calc-q-head3',
    type: 'calculation',
    position: getGridPosition(2, 0, 2),
    data: {
      label: 'Calculate Q₃',
      formula: 'Q₃ = Input × Wq₃',
      description: 'Query matrix for Head 3',
      expectedMatrix: [
        [0, 0, 0],
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ],
      hint: 'Multiply the input matrix (5×6) with Wq₃ (6×3) to get Q₃ (5×3)',
      headNumber: 3,
      headColor: HEAD_COLORS[3]
    }
  },
  {
    id: 'calc-k-head3',
    type: 'calculation',
    position: getGridPosition(2, 1, 2),
    data: {
      label: 'Calculate K₃',
      formula: 'K₃ = Input × Wk₃',
      description: 'Key matrix for Head 3',
      expectedMatrix: [
        [0, 0, 0],
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ],
      hint: 'Multiply the input matrix (5×6) with Wk₃ (6×3) to get K₃ (5×3)',
      headNumber: 3,
      headColor: HEAD_COLORS[3]
    }
  },
  {
    id: 'calc-v-head3',
    type: 'calculation',
    position: getGridPosition(2, 2, 2),
    data: {
      label: 'Calculate V₃',
      formula: 'V₃ = Input × Wv₃',
      description: 'Value matrix for Head 3',
      expectedMatrix: [
        [0, 0, 0],
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ],
      hint: 'Multiply the input matrix (5×6) with Wv₃ (6×3) to get V₃ (5×3)',
      headNumber: 3,
      headColor: HEAD_COLORS[3]
    }
  },

  // Attention Calculation - Head 3 (Column 3)
  {
    id: 'calc-scores-head3',
    type: 'calculation',
    position: getGridPosition(3, 0.5, 2),
    data: {
      label: 'Attention Scores₃',
      formula: 'Scores₃ = (Q₃ × K₃ᵀ) / √3',
      description: 'Scaled attention scores for Head 3',
      expectedMatrix: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0.5774, 0, 0],
        [0, 0, 0, 0.5774, 0],
        [0, 0, 0, 0, 0.5774]
      ],
      hint: 'Compute Q₃ × K₃ᵀ then divide by √3 (≈1.732)',
      headNumber: 3,
      headColor: HEAD_COLORS[3]
    }
  },

  // Softmax - Head 3 (Column 4)
  {
    id: 'calc-softmax-head3',
    type: 'calculation',
    position: getGridPosition(4, 0.5, 2),
    data: {
      label: 'Softmax₃',
      formula: 'Attention₃ = softmax(Scores₃)',
      description: 'Attention weights for Head 3',
      expectedMatrix: [
        [0.2, 0.2, 0.2, 0.2, 0.2],
        [0.2, 0.2, 0.2, 0.2, 0.2],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1]
      ],
      hint: 'Apply softmax function row-wise to the attention scores',
      headNumber: 3,
      headColor: HEAD_COLORS[3]
    }
  },

  // ====================== CONCATENATION STEP ======================
  // Concatenated Matrix (Column 5, centered vertically between all heads)
  {
    id: 'concat-matrix',
    type: 'calculation',
    position: getGridPosition(5, 1, 1),
    data: {
      label: 'Concatenate Heads',
      formula: 'Concat = [Attention₁ ⊗ V₁ | Attention₂ ⊗ V₂ | Attention₃ ⊗ V₃]',
      description: 'Concatenated attention outputs (5×9)',
      expectedMatrix: [
        [1, 0, 0, 0, 0, 0, 0.2, 0.2, 0.2],
        [0, 1, 0, 1, 0, 0, 0.2, 0.2, 0.2],
        [0, 0, 1, 0, 1, 0, 1, 0, 0],
        [0.2, 0.2, 0.2, 0, 0, 1, 0, 1, 0],
        [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0, 0, 1]
      ],
      hint: 'Concatenate the weighted value matrices from all three heads horizontally'
    }
  },

  // ====================== FINAL LAYERS ======================
  // Output Weight Matrix (Column 6, centered vertically)
  {
    id: 'wo-matrix',
    type: 'matrix',
    position: getGridPosition(6, 1, 1),
    data: {
      label: 'Wo Matrix',
      matrix: [
        [1, 0, 0, 1, 0],
        [0, 1, 0, 0, 1],
        [0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 0, 0, 1],
        [0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 0, 0, 1],
        [0, 0, 1, 0, 0]
      ],
      description: 'Output projection weights (9×5)'
    }
  },

  // Final Output Calculation (Column 7, centered vertically)
  {
    id: 'calc-output',
    type: 'calculation',
    position: getGridPosition(7, 1, 1),
    data: {
      label: 'Final Output',
      formula: 'Output = Concat × Wo',
      description: 'Multi-head attention output (5×5)',
      expectedMatrix: [
        [1.2, 0.2, 0.2, 1.2, 0.2],
        [0.2, 1.2, 0.2, 1.2, 1.2],
        [1, 0, 1, 1, 0],
        [0.2, 1.2, 0.2, 0.2, 1.2],
        [0.4, 0.4, 0.4, 0.4, 0.4]
      ],
      hint: 'Multiply the concatenated matrix (5×9) with Wo (9×5) to get the final output (5×5)'
    }
  }
];

export const initialEdges: Edge[] = [
  // Input to all weight matrices across all heads
  { id: 'e-input-wq1', source: 'input', target: 'wq-head1', animated: true },
  { id: 'e-input-wk1', source: 'input', target: 'wk-head1', animated: true },
  { id: 'e-input-wv1', source: 'input', target: 'wv-head1', animated: true },
  { id: 'e-input-wq2', source: 'input', target: 'wq-head2', animated: true },
  { id: 'e-input-wk2', source: 'input', target: 'wk-head2', animated: true },
  { id: 'e-input-wv2', source: 'input', target: 'wv-head2', animated: true },
  { id: 'e-input-wq3', source: 'input', target: 'wq-head3', animated: true },
  { id: 'e-input-wk3', source: 'input', target: 'wk-head3', animated: true },
  { id: 'e-input-wv3', source: 'input', target: 'wv-head3', animated: true },

  // Weight matrices to Q, K, V calculations for each head
  { id: 'e-wq1-calcq1', source: 'wq-head1', target: 'calc-q-head1' },
  { id: 'e-wk1-calck1', source: 'wk-head1', target: 'calc-k-head1' },
  { id: 'e-wv1-calcv1', source: 'wv-head1', target: 'calc-v-head1' },
  { id: 'e-wq2-calcq2', source: 'wq-head2', target: 'calc-q-head2' },
  { id: 'e-wk2-calck2', source: 'wk-head2', target: 'calc-k-head2' },
  { id: 'e-wv2-calcv2', source: 'wv-head2', target: 'calc-v-head2' },
  { id: 'e-wq3-calcq3', source: 'wq-head3', target: 'calc-q-head3' },
  { id: 'e-wk3-calck3', source: 'wk-head3', target: 'calc-k-head3' },
  { id: 'e-wv3-calcv3', source: 'wv-head3', target: 'calc-v-head3' },

  // Q and K to attention scores for each head
  { id: 'e-q1-scores1', source: 'calc-q-head1', target: 'calc-scores-head1' },
  { id: 'e-k1-scores1', source: 'calc-k-head1', target: 'calc-scores-head1' },
  { id: 'e-q2-scores2', source: 'calc-q-head2', target: 'calc-scores-head2' },
  { id: 'e-k2-scores2', source: 'calc-k-head2', target: 'calc-scores-head2' },
  { id: 'e-q3-scores3', source: 'calc-q-head3', target: 'calc-scores-head3' },
  { id: 'e-k3-scores3', source: 'calc-k-head3', target: 'calc-scores-head3' },

  // Scores to softmax for each head
  { id: 'e-scores1-softmax1', source: 'calc-scores-head1', target: 'calc-softmax-head1' },
  { id: 'e-scores2-softmax2', source: 'calc-scores-head2', target: 'calc-softmax-head2' },
  { id: 'e-scores3-softmax3', source: 'calc-scores-head3', target: 'calc-softmax-head3' },

  // V matrices to concatenation
  { id: 'e-v1-concat', source: 'calc-v-head1', target: 'concat-matrix' },
  { id: 'e-v2-concat', source: 'calc-v-head2', target: 'concat-matrix' },
  { id: 'e-v3-concat', source: 'calc-v-head3', target: 'concat-matrix' },

  // Softmax outputs to concatenation
  { id: 'e-softmax1-concat', source: 'calc-softmax-head1', target: 'concat-matrix' },
  { id: 'e-softmax2-concat', source: 'calc-softmax-head2', target: 'concat-matrix' },
  { id: 'e-softmax3-concat', source: 'calc-softmax-head3', target: 'concat-matrix' },

  // Concatenation and output weights to final output
  { id: 'e-concat-output', source: 'concat-matrix', target: 'calc-output' },
  { id: 'e-wo-output', source: 'wo-matrix', target: 'calc-output' }
];
