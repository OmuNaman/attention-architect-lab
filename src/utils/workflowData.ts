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

// Enhanced grid-based coordinate system with very large spacing
const LAYOUT = {
  // Base coordinates for the grid system
  ORIGIN_X: 150,
  ORIGIN_Y: 150,
  
  // Large spacing between columns and rows
  COLUMN_SPACING: 800,   // Horizontal distance between columns
  ROW_SPACING: 500,      // Vertical distance between rows within a head
  HEAD_SPACING: 1500,    // Vertical distance between different heads
  
  // Additional spacing for better visual separation
  MATRIX_PADDING: 100,   // Extra padding around matrix nodes
  CALC_PADDING: 150,     // Extra padding around calculation nodes
};

// Helper function to calculate grid positions with enhanced spacing
const getPosition = (column: number, row: number, headIndex: number = 0) => ({
  x: LAYOUT.ORIGIN_X + (column * LAYOUT.COLUMN_SPACING),
  y: LAYOUT.ORIGIN_Y + (row * LAYOUT.ROW_SPACING) + (headIndex * LAYOUT.HEAD_SPACING)
});

export const initialNodes: Node[] = [
  // Input Matrix (5×6) - Column 0, Row 1, centered between all heads
  {
    id: 'input',
    type: 'matrix',
    position: getPosition(0, 1, 1), // Centered vertically between the 3 heads
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

  // ====================== HEAD 1 (RED) ======================
  // Weight Matrices - Head 1 (Column 1) - (6×2)
  {
    id: 'wq-head1',
    type: 'matrix',
    position: getPosition(1, 0, 0),
    data: {
      label: 'Wq Matrix',
      matrix: [
        [1, 0],
        [0, 1],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
      ],
      description: 'Query weights (6×2)',
      headNumber: 1,
      headColor: HEAD_COLORS[1]
    }
  },
  {
    id: 'wk-head1',
    type: 'matrix',
    position: getPosition(1, 1, 0),
    data: {
      label: 'Wk Matrix',
      matrix: [
        [1, 0],
        [0, 1],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
      ],
      description: 'Key weights (6×2)',
      headNumber: 1,
      headColor: HEAD_COLORS[1]
    }
  },
  {
    id: 'wv-head1',
    type: 'matrix',
    position: getPosition(1, 2, 0),
    data: {
      label: 'Wv Matrix',
      matrix: [
        [1, 0],
        [0, 1],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
      ],
      description: 'Value weights (6×2)',
      headNumber: 1,
      headColor: HEAD_COLORS[1]
    }
  },

  // Calculation Nodes - Head 1 (Column 2) - (5×2)
  {
    id: 'calc-q-head1',
    type: 'calculation',
    position: getPosition(2, 0, 0),
    data: {
      label: 'Calculate Q₁',
      formula: 'Q₁ = Input × Wq₁',
      description: 'Query matrix for Head 1',
      expectedMatrix: [
        [1, 0],
        [0, 1],
        [0, 0],
        [0, 0],
        [0, 0]
      ],
      hint: 'Multiply the input matrix (5×6) with Wq₁ (6×2) to get Q₁ (5×2)',
      headNumber: 1,
      headColor: HEAD_COLORS[1]
    }
  },
  {
    id: 'calc-k-head1',
    type: 'calculation',
    position: getPosition(2, 1, 0),
    data: {
      label: 'Calculate K₁',
      formula: 'K₁ = Input × Wk₁',
      description: 'Key matrix for Head 1',
      expectedMatrix: [
        [1, 0],
        [0, 1],
        [0, 0],
        [0, 0],
        [0, 0]
      ],
      hint: 'Multiply the input matrix (5×6) with Wk₁ (6×2) to get K₁ (5×2)',
      headNumber: 1,
      headColor: HEAD_COLORS[1]
    }
  },
  {
    id: 'calc-v-head1',
    type: 'calculation',
    position: getPosition(2, 2, 0),
    data: {
      label: 'Calculate V₁',
      formula: 'V₁ = Input × Wv₁',
      description: 'Value matrix for Head 1',
      expectedMatrix: [
        [1, 0],
        [0, 1],
        [0, 0],
        [0, 0],
        [0, 0]
      ],
      hint: 'Multiply the input matrix (5×6) with Wv₁ (6×2) to get V₁ (5×2)',
      headNumber: 1,
      headColor: HEAD_COLORS[1]
    }
  },

  // Attention Calculation - Head 1 (Column 3) - (5×5)
  {
    id: 'calc-scores-head1',
    type: 'calculation',
    position: getPosition(3, 0.5, 0),
    data: {
      label: 'Attention Scores₁',
      formula: 'Scores₁ = (Q₁ × K₁ᵀ) / √2',
      description: 'Scaled attention scores for Head 1',
      expectedMatrix: [
        [0.7071, 0, 0, 0, 0],
        [0, 0.7071, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      hint: 'Compute Q₁ × K₁ᵀ then divide by √2 (≈1.414)',
      headNumber: 1,
      headColor: HEAD_COLORS[1]
    }
  },

  // Softmax & Attention Output - Head 1 (Column 4) - (5×2)
  {
    id: 'calc-softmax-head1',
    type: 'calculation',
    position: getPosition(4, 0.5, 0),
    data: {
      label: 'Attention Output₁',
      formula: 'Output₁ = softmax(Scores₁) × V₁',
      description: 'Attention output for Head 1',
      expectedMatrix: [
        [1, 0],
        [0, 1],
        [0.2, 0.2],
        [0.2, 0.2],
        [0.2, 0.2]
      ],
      hint: 'Apply softmax to scores then multiply with V₁',
      headNumber: 1,
      headColor: HEAD_COLORS[1]
    }
  },

  // ====================== HEAD 2 (TEAL) ======================
  // Weight Matrices - Head 2 (Column 1) - (6×2)
  {
    id: 'wq-head2',
    type: 'matrix',
    position: getPosition(1, 0, 1),
    data: {
      label: 'Wq Matrix',
      matrix: [
        [0, 0],
        [1, 0],
        [0, 1],
        [0, 0],
        [0, 0],
        [0, 0]
      ],
      description: 'Query weights (6×2)',
      headNumber: 2,
      headColor: HEAD_COLORS[2]
    }
  },
  {
    id: 'wk-head2',
    type: 'matrix',
    position: getPosition(1, 1, 1),
    data: {
      label: 'Wk Matrix',
      matrix: [
        [0, 0],
        [1, 0],
        [0, 1],
        [0, 0],
        [0, 0],
        [0, 0]
      ],
      description: 'Key weights (6×2)',
      headNumber: 2,
      headColor: HEAD_COLORS[2]
    }
  },
  {
    id: 'wv-head2',
    type: 'matrix',
    position: getPosition(1, 2, 1),
    data: {
      label: 'Wv Matrix',
      matrix: [
        [0, 0],
        [1, 0],
        [0, 1],
        [0, 0],
        [0, 0],
        [0, 0]
      ],
      description: 'Value weights (6×2)',
      headNumber: 2,
      headColor: HEAD_COLORS[2]
    }
  },

  // Calculation Nodes - Head 2 (Column 2) - (5×2)
  {
    id: 'calc-q-head2',
    type: 'calculation',
    position: getPosition(2, 0, 1),
    data: {
      label: 'Calculate Q₂',
      formula: 'Q₂ = Input × Wq₂',
      description: 'Query matrix for Head 2',
      expectedMatrix: [
        [0, 0],
        [1, 0],
        [0, 1],
        [0, 0],
        [0, 0]
      ],
      hint: 'Multiply the input matrix (5×6) with Wq₂ (6×2) to get Q₂ (5×2)',
      headNumber: 2,
      headColor: HEAD_COLORS[2]
    }
  },
  {
    id: 'calc-k-head2',
    type: 'calculation',
    position: getPosition(2, 1, 1),
    data: {
      label: 'Calculate K₂',
      formula: 'K₂ = Input × Wk₂',
      description: 'Key matrix for Head 2',
      expectedMatrix: [
        [0, 0],
        [1, 0],
        [0, 1],
        [0, 0],
        [0, 0]
      ],
      hint: 'Multiply the input matrix (5×6) with Wk₂ (6×2) to get K₂ (5×2)',
      headNumber: 2,
      headColor: HEAD_COLORS[2]
    }
  },
  {
    id: 'calc-v-head2',
    type: 'calculation',
    position: getPosition(2, 2, 1),
    data: {
      label: 'Calculate V₂',
      formula: 'V₂ = Input × Wv₂',
      description: 'Value matrix for Head 2',
      expectedMatrix: [
        [0, 0],
        [1, 0],
        [0, 1],
        [0, 0],
        [0, 0]
      ],
      hint: 'Multiply the input matrix (5×6) with Wv₂ (6×2) to get V₂ (5×2)',
      headNumber: 2,
      headColor: HEAD_COLORS[2]
    }
  },

  // Attention Calculation - Head 2 (Column 3) - (5×5)
  {
    id: 'calc-scores-head2',
    type: 'calculation',
    position: getPosition(3, 0.5, 1),
    data: {
      label: 'Attention Scores₂',
      formula: 'Scores₂ = (Q₂ × K₂ᵀ) / √2',
      description: 'Scaled attention scores for Head 2',
      expectedMatrix: [
        [0, 0, 0, 0, 0],
        [0, 0.7071, 0, 0, 0],
        [0, 0, 0.7071, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      hint: 'Compute Q₂ × K₂ᵀ then divide by √2 (≈1.414)',
      headNumber: 2,
      headColor: HEAD_COLORS[2]
    }
  },

  // Softmax & Attention Output - Head 2 (Column 4) - (5×2)
  {
    id: 'calc-softmax-head2',
    type: 'calculation',
    position: getPosition(4, 0.5, 1),
    data: {
      label: 'Attention Output₂',
      formula: 'Output₂ = softmax(Scores₂) × V₂',
      description: 'Attention output for Head 2',
      expectedMatrix: [
        [0.2, 0.2],
        [1, 0],
        [0, 1],
        [0.2, 0.2],
        [0.2, 0.2]
      ],
      hint: 'Apply softmax to scores then multiply with V₂',
      headNumber: 2,
      headColor: HEAD_COLORS[2]
    }
  },

  // ====================== HEAD 3 (BLUE) ======================
  // Weight Matrices - Head 3 (Column 1) - (6×2)
  {
    id: 'wq-head3',
    type: 'matrix',
    position: getPosition(1, 0, 2),
    data: {
      label: 'Wq Matrix',
      matrix: [
        [0, 0],
        [0, 0],
        [0, 0],
        [1, 0],
        [0, 1],
        [0, 0]
      ],
      description: 'Query weights (6×2)',
      headNumber: 3,
      headColor: HEAD_COLORS[3]
    }
  },
  {
    id: 'wk-head3',
    type: 'matrix',
    position: getPosition(1, 1, 2),
    data: {
      label: 'Wk Matrix',
      matrix: [
        [0, 0],
        [0, 0],
        [0, 0],
        [1, 0],
        [0, 1],
        [0, 0]
      ],
      description: 'Key weights (6×2)',
      headNumber: 3,
      headColor: HEAD_COLORS[3]
    }
  },
  {
    id: 'wv-head3',
    type: 'matrix',
    position: getPosition(1, 2, 2),
    data: {
      label: 'Wv Matrix',
      matrix: [
        [0, 0],
        [0, 0],
        [0, 0],
        [1, 0],
        [0, 1],
        [0, 0]
      ],
      description: 'Value weights (6×2)',
      headNumber: 3,
      headColor: HEAD_COLORS[3]
    }
  },

  // Calculation Nodes - Head 3 (Column 2) - (5×2)
  {
    id: 'calc-q-head3',
    type: 'calculation',
    position: getPosition(2, 0, 2),
    data: {
      label: 'Calculate Q₃',
      formula: 'Q₃ = Input × Wq₃',
      description: 'Query matrix for Head 3',
      expectedMatrix: [
        [0, 0],
        [0, 0],
        [0, 0],
        [1, 0],
        [0, 1]
      ],
      hint: 'Multiply the input matrix (5×6) with Wq₃ (6×2) to get Q₃ (5×2)',
      headNumber: 3,
      headColor: HEAD_COLORS[3]
    }
  },
  {
    id: 'calc-k-head3',
    type: 'calculation',
    position: getPosition(2, 1, 2),
    data: {
      label: 'Calculate K₃',
      formula: 'K₃ = Input × Wk₃',
      description: 'Key matrix for Head 3',
      expectedMatrix: [
        [0, 0],
        [0, 0],
        [0, 0],
        [1, 0],
        [0, 1]
      ],
      hint: 'Multiply the input matrix (5×6) with Wk₃ (6×2) to get K₃ (5×2)',
      headNumber: 3,
      headColor: HEAD_COLORS[3]
    }
  },
  {
    id: 'calc-v-head3',
    type: 'calculation',
    position: getPosition(2, 2, 2),
    data: {
      label: 'Calculate V₃',
      formula: 'V₃ = Input × Wv₃',
      description: 'Value matrix for Head 3',
      expectedMatrix: [
        [0, 0],
        [0, 0],
        [0, 0],
        [1, 0],
        [0, 1]
      ],
      hint: 'Multiply the input matrix (5×6) with Wv₃ (6×2) to get V₃ (5×2)',
      headNumber: 3,
      headColor: HEAD_COLORS[3]
    }
  },

  // Attention Calculation - Head 3 (Column 3) - (5×5)
  {
    id: 'calc-scores-head3',
    type: 'calculation',
    position: getPosition(3, 0.5, 2),
    data: {
      label: 'Attention Scores₃',
      formula: 'Scores₃ = (Q₃ × K₃ᵀ) / √2',
      description: 'Scaled attention scores for Head 3',
      expectedMatrix: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0.7071, 0],
        [0, 0, 0, 0, 0.7071]
      ],
      hint: 'Compute Q₃ × K₃ᵀ then divide by √2 (≈1.414)',
      headNumber: 3,
      headColor: HEAD_COLORS[3]
    }
  },

  // Softmax & Attention Output - Head 3 (Column 4) - (5×2)
  {
    id: 'calc-softmax-head3',
    type: 'calculation',
    position: getPosition(4, 0.5, 2),
    data: {
      label: 'Attention Output₃',
      formula: 'Output₃ = softmax(Scores₃) × V₃',
      description: 'Attention output for Head 3',
      expectedMatrix: [
        [0.2, 0.2],
        [0.2, 0.2],
        [0.2, 0.2],
        [1, 0],
        [0, 1]
      ],
      hint: 'Apply softmax to scores then multiply with V₃',
      headNumber: 3,
      headColor: HEAD_COLORS[3]
    }
  },

  // ====================== CONCATENATION STEP ======================
  // Concatenated Matrix (Column 5, centered vertically) - (5×6)
  {
    id: 'concat-matrix',
    type: 'calculation',
    position: getPosition(5, 1, 1),
    data: {
      label: 'Concatenate Heads',
      formula: 'Concat = [Output₁ | Output₂ | Output₃]',
      description: 'Concatenated attention outputs (5×6)',
      expectedMatrix: [
        [1, 0, 0.2, 0.2, 0.2, 0.2],
        [0, 1, 1, 0, 0.2, 0.2],
        [0.2, 0.2, 0, 1, 0.2, 0.2],
        [0.2, 0.2, 0.2, 0.2, 1, 0],
        [0.2, 0.2, 0.2, 0.2, 0, 1]
      ],
      hint: 'Concatenate the attention outputs from all three heads horizontally'
    }
  },

  // ====================== FINAL LAYERS ======================
  // Output Weight Matrix (Column 6, centered vertically) - (6×6)
  {
    id: 'wo-matrix',
    type: 'matrix',
    position: getPosition(6, 1, 1),
    data: {
      label: 'Wo Matrix',
      matrix: [
        [1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 1]
      ],
      description: 'Output projection weights (6×6)'
    }
  },

  // Final Output Calculation (Column 7, centered vertically) - (5×6)
  {
    id: 'calc-output',
    type: 'calculation',
    position: getPosition(7, 1, 1),
    data: {
      label: 'Final Output',
      formula: 'Output = Concat × Wo',
      description: 'Multi-head attention output (5×6)',
      expectedMatrix: [
        [1, 0, 0.2, 0.2, 0.2, 0.2],
        [0, 1, 1, 0, 0.2, 0.2],
        [0.2, 0.2, 0, 1, 0.2, 0.2],
        [0.2, 0.2, 0.2, 0.2, 1, 0],
        [0.2, 0.2, 0.2, 0.2, 0, 1]
      ],
      hint: 'Multiply the concatenated matrix (5×6) with Wo (6×6) to get the final output (5×6)'
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

  // Scores and V to softmax/attention output for each head
  { id: 'e-scores1-softmax1', source: 'calc-scores-head1', target: 'calc-softmax-head1' },
  { id: 'e-v1-softmax1', source: 'calc-v-head1', target: 'calc-softmax-head1' },
  { id: 'e-scores2-softmax2', source: 'calc-scores-head2', target: 'calc-softmax-head2' },
  { id: 'e-v2-softmax2', source: 'calc-v-head2', target: 'calc-softmax-head2' },
  { id: 'e-scores3-softmax3', source: 'calc-scores-head3', target: 'calc-softmax-head3' },
  { id: 'e-v3-softmax3', source: 'calc-v-head3', target: 'calc-softmax-head3' },

  // Attention outputs to concatenation
  { id: 'e-softmax1-concat', source: 'calc-softmax-head1', target: 'concat-matrix' },
  { id: 'e-softmax2-concat', source: 'calc-softmax-head2', target: 'concat-matrix' },
  { id: 'e-softmax3-concat', source: 'calc-softmax-head3', target: 'concat-matrix' },

  // Concatenation and output weights to final output
  { id: 'e-concat-output', source: 'concat-matrix', target: 'calc-output' },
  { id: 'e-wo-output', source: 'wo-matrix', target: 'calc-output' }
];
