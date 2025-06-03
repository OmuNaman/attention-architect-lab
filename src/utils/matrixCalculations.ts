import type { Step } from '@/components/SelfAttentionApp';

// Multi-Head Attention Matrix data - Updated to 5×6
export const INPUT_MATRIX = [
  [1, 0, 0, 0, 0, 0], // x1: "The"
  [0, 1, 0, 0, 0, 0], // x2: "next"
  [0, 0, 1, 0, 0, 0], // x3: "day"
  [0, 0, 0, 1, 0, 0], // x4: "is"
  [0, 0, 0, 0, 1, 0]  // x5: "bright"
];

// Head 1 Matrices (3×6) - Updated dimensions
export const WQ_MATRIX_HEAD1 = [
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0]
];

export const WK_MATRIX_HEAD1 = [
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0]
];

export const WV_MATRIX_HEAD1 = [
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0]
];

// Head 2 Matrices (3×6) - Updated dimensions
export const WQ_MATRIX_HEAD2 = [
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0]
];

export const WK_MATRIX_HEAD2 = [
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0]
];

export const WV_MATRIX_HEAD2 = [
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0]
];

// Head 3 Matrices (3×6) - Updated dimensions
export const WQ_MATRIX_HEAD3 = [
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0]
];

export const WK_MATRIX_HEAD3 = [
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0]
];

export const WV_MATRIX_HEAD3 = [
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0]
];

// Output Weight Matrix (9×5)
export const WO_MATRIX = [
  [1, 0, 0, 1, 0],
  [0, 1, 0, 0, 1],
  [0, 0, 1, 0, 0],
  [1, 0, 0, 1, 0],
  [0, 1, 0, 0, 1],
  [0, 0, 1, 0, 0],
  [1, 0, 0, 1, 0],
  [0, 1, 0, 0, 1],
  [0, 0, 1, 0, 0]
];

// Scaling Factor (sqrt(d_k)) based on Key Matrix dimension 3
const SCALING_FACTOR = Math.sqrt(3);

// Matrix multiplication helper
function matrixMultiply(a: number[][], b: number[][]): number[][] {
  const resultRows = a.length;
  const resultCols = b[0].length;
  const innerDim = b.length;

  if (a[0].length !== b.length) {
    console.error("Matrix dimensions incompatible for multiplication:", a[0].length, "vs", b.length);
    return Array(resultRows).fill(null).map(() => Array(resultCols).fill(NaN));
  }

  const result = Array(resultRows).fill(null).map(() => Array(resultCols).fill(0));
  
  for (let i = 0; i < resultRows; i++) {
    for (let j = 0; j < resultCols; j++) {
      for (let k = 0; k < innerDim; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  
  return result;
}

// Softmax function with numerical stability
function softmax(matrix: number[][]): number[][] {
  return matrix.map(row => {
    const maxVal = Math.max(...row);
    const expRow = row.map(x => Math.exp(x - maxVal));
    const sum = expRow.reduce((acc, val) => acc + val, 0);

    if (sum === 0) {
        return row.map(() => 0);
    }

    return expRow.map(x => x / sum);
  });
}

// Concatenate matrices horizontally
function concatenateHorizontally(matrices: number[][][]): number[][] {
  const rows = matrices[0].length;
  const result = Array(rows).fill(null).map(() => []);
  
  for (let i = 0; i < rows; i++) {
    for (const matrix of matrices) {
      result[i].push(...matrix[i]);
    }
  }
  
  return result;
}

// Calculate expected results for each step
export function calculateExpected(step: Step, headNumber?: number): number[][] {
  switch (step) {
    case 'input':
      return INPUT_MATRIX;
    case 'q':
      if (headNumber === 1) return matrixMultiply(INPUT_MATRIX, WQ_MATRIX_HEAD1.map((_, i) => WQ_MATRIX_HEAD1.map(row => row[i])));
      if (headNumber === 2) return matrixMultiply(INPUT_MATRIX, WQ_MATRIX_HEAD2.map((_, i) => WQ_MATRIX_HEAD2.map(row => row[i])));
      if (headNumber === 3) return matrixMultiply(INPUT_MATRIX, WQ_MATRIX_HEAD3.map((_, i) => WQ_MATRIX_HEAD3.map(row => row[i])));
      return matrixMultiply(INPUT_MATRIX, WQ_MATRIX_HEAD1.map((_, i) => WQ_MATRIX_HEAD1.map(row => row[i])));
    case 'k':
      if (headNumber === 1) return matrixMultiply(INPUT_MATRIX, WK_MATRIX_HEAD1.map((_, i) => WK_MATRIX_HEAD1.map(row => row[i])));
      if (headNumber === 2) return matrixMultiply(INPUT_MATRIX, WK_MATRIX_HEAD2.map((_, i) => WK_MATRIX_HEAD2.map(row => row[i])));
      if (headNumber === 3) return matrixMultiply(INPUT_MATRIX, WK_MATRIX_HEAD3.map((_, i) => WK_MATRIX_HEAD3.map(row => row[i])));
      return matrixMultiply(INPUT_MATRIX, WK_MATRIX_HEAD1.map((_, i) => WK_MATRIX_HEAD1.map(row => row[i])));
    case 'v':
      if (headNumber === 1) return matrixMultiply(INPUT_MATRIX, WV_MATRIX_HEAD1.map((_, i) => WV_MATRIX_HEAD1.map(row => row[i])));
      if (headNumber === 2) return matrixMultiply(INPUT_MATRIX, WV_MATRIX_HEAD2.map((_, i) => WV_MATRIX_HEAD2.map(row => row[i])));
      if (headNumber === 3) return matrixMultiply(INPUT_MATRIX, WV_MATRIX_HEAD3.map((_, i) => WV_MATRIX_HEAD3.map(row => row[i])));
      return matrixMultiply(INPUT_MATRIX, WV_MATRIX_HEAD1.map((_, i) => WV_MATRIX_HEAD1.map(row => row[i])));
    case 'scores': {
      const headMatrices = [WQ_MATRIX_HEAD1, WQ_MATRIX_HEAD2, WQ_MATRIX_HEAD3];
      const kHeadMatrices = [WK_MATRIX_HEAD1, WK_MATRIX_HEAD2, WK_MATRIX_HEAD3];
      const targetHead = headNumber || 1;
      
      const Q = matrixMultiply(INPUT_MATRIX, headMatrices[targetHead - 1].map((_, i) => headMatrices[targetHead - 1].map(row => row[i])));
      const K = matrixMultiply(INPUT_MATRIX, kHeadMatrices[targetHead - 1].map((_, i) => kHeadMatrices[targetHead - 1].map(row => row[i])));
      const KT = K[0].map((_, i) => K.map(row => row[i]));
      const rawScores = matrixMultiply(Q, KT);
      return rawScores.map(row => row.map(val => val / Math.sqrt(3)));
    }
    case 'softmax': {
      const headMatrices = [WQ_MATRIX_HEAD1, WQ_MATRIX_HEAD2, WQ_MATRIX_HEAD3];
      const kHeadMatrices = [WK_MATRIX_HEAD1, WK_MATRIX_HEAD2, WK_MATRIX_HEAD3];
      const targetHead = headNumber || 1;
      
      const Q = matrixMultiply(INPUT_MATRIX, headMatrices[targetHead - 1].map((_, i) => headMatrices[targetHead - 1].map(row => row[i])));
      const K = matrixMultiply(INPUT_MATRIX, kHeadMatrices[targetHead - 1].map((_, i) => kHeadMatrices[targetHead - 1].map(row => row[i])));
      const KT = K[0].map((_, i) => K.map(row => row[i]));
      const rawScores = matrixMultiply(Q, KT);
      const scaledScores = rawScores.map(row => row.map(val => val / Math.sqrt(3)));
      return softmax(scaledScores);
    }
    case 'output': {
      // Calculate attention outputs for all heads
      const allHeadOutputs = [];
      
      for (let head = 1; head <= 3; head++) {
        const headMatrices = [WQ_MATRIX_HEAD1, WQ_MATRIX_HEAD2, WQ_MATRIX_HEAD3];
        const kHeadMatrices = [WK_MATRIX_HEAD1, WK_MATRIX_HEAD2, WK_MATRIX_HEAD3];
        const vHeadMatrices = [WV_MATRIX_HEAD1, WV_MATRIX_HEAD2, WV_MATRIX_HEAD3];
        
        const Q = matrixMultiply(INPUT_MATRIX, headMatrices[head - 1].map((_, i) => headMatrices[head - 1].map(row => row[i])));
        const K = matrixMultiply(INPUT_MATRIX, kHeadMatrices[head - 1].map((_, i) => kHeadMatrices[head - 1].map(row => row[i])));
        const V = matrixMultiply(INPUT_MATRIX, vHeadMatrices[head - 1].map((_, i) => vHeadMatrices[head - 1].map(row => row[i])));
        
        const KT = K[0].map((_, i) => K.map(row => row[i]));
        const rawScores = matrixMultiply(Q, KT);
        const scaledScores = rawScores.map(row => row.map(val => val / Math.sqrt(3)));
        const attention = softmax(scaledScores);
        const headOutput = matrixMultiply(attention, V);
        
        allHeadOutputs.push(headOutput);
      }
      
      // Concatenate all head outputs
      const concatenated = concatenateHorizontally(allHeadOutputs);
      
      // Multiply by output weight matrix
      return matrixMultiply(concatenated, WO_MATRIX);
    }
    default:
      return [];
  }
}

// Validate user input against expected result
export function validateMatrix(step: Step, userMatrix: number[][], headNumber?: number): { isValid: boolean; errors: boolean[][] } {
  const expected = calculateExpected(step, headNumber);
  
  if (!userMatrix || userMatrix.length === 0 || !userMatrix[0] || userMatrix[0].length === 0 ||
      userMatrix.length !== expected.length || userMatrix[0].length !== expected[0].length) {
    return { isValid: false, errors: Array(expected.length).fill(null).map(() => Array(expected[0].length).fill(true)) };
  }

  const errors = Array(userMatrix.length).fill(null).map(() => Array(userMatrix[0].length).fill(false));
  let isValid = true;
  
  for (let i = 0; i < expected.length; i++) {
    for (let j = 0; j < expected[i].length; j++) {
      const userValue = userMatrix[i]?.[j] || 0;
      const expectedValue = expected[i][j];
      const tolerance = 0.0001;
      
      if (Math.abs(userValue - expectedValue) > tolerance) {
        errors[i][j] = true;
        isValid = false;
      }
    }
  }
  
  return { isValid, errors };
}

// Get step-specific data
export function getStepData(step: Step, headNumber?: number) {
  const headSuffix = headNumber ? ` (Head ${headNumber})` : '';
  
  const stepConfig = {
    input: {
      title: "Input Matrix",
      description: "Starting input embeddings matrix (5×6)",
      formula: "Input = X",
      resultName: "Input Matrix",
      inputMatrices: [],
      hint: "This matrix is already given. Just observe the values."
    },
    q: {
      title: `Query Matrix (Q)${headSuffix}`,
      description: `Calculate the Query matrix for head ${headNumber || 1}`,
      formula: `Q${headNumber || 1} = Input × Wq${headNumber || 1}`,
      resultName: `Q Matrix (5×3)`,
      inputMatrices: [
        { name: "Input (5×6)", data: INPUT_MATRIX },
        { name: `Wq${headNumber || 1} (6×3)`, data: headNumber === 1 ? WQ_MATRIX_HEAD1.map((_, i) => WQ_MATRIX_HEAD1.map(row => row[i])) :
                                                   headNumber === 2 ? WQ_MATRIX_HEAD2.map((_, i) => WQ_MATRIX_HEAD2.map(row => row[i])) :
                                                   WQ_MATRIX_HEAD3.map((_, i) => WQ_MATRIX_HEAD3.map(row => row[i])) }
      ],
      hint: `Multiply Input matrix with weight matrix Wq${headNumber || 1} to get Query matrix for head ${headNumber || 1}.`
    },
    k: {
      title: `Key Matrix (K)${headSuffix}`,
      description: `Calculate the Key matrix for head ${headNumber || 1}`,
      formula: `K${headNumber || 1} = Input × Wk${headNumber || 1}`,
      resultName: `K Matrix (5×3)`,
      inputMatrices: [
        { name: "Input (5×6)", data: INPUT_MATRIX },
        { name: `Wk${headNumber || 1} (6×3)`, data: headNumber === 1 ? WK_MATRIX_HEAD1.map((_, i) => WK_MATRIX_HEAD1.map(row => row[i])) :
                                                   headNumber === 2 ? WK_MATRIX_HEAD2.map((_, i) => WK_MATRIX_HEAD2.map(row => row[i])) :
                                                   WK_MATRIX_HEAD3.map((_, i) => WK_MATRIX_HEAD3.map(row => row[i])) }
      ],
      hint: `Multiply Input matrix with weight matrix Wk${headNumber || 1} to get Key matrix for head ${headNumber || 1}.`
    },
    v: {
      title: `Value Matrix (V)${headSuffix}`,
      description: `Calculate the Value matrix for head ${headNumber || 1}`,
      formula: `V${headNumber || 1} = Input × Wv${headNumber || 1}`,
      resultName: `V Matrix (5×3)`,
      inputMatrices: [
        { name: "Input (5×6)", data: INPUT_MATRIX },
        { name: `Wv${headNumber || 1} (6×3)`, data: headNumber === 1 ? WV_MATRIX_HEAD1.map((_, i) => WV_MATRIX_HEAD1.map(row => row[i])) :
                                                   headNumber === 2 ? WV_MATRIX_HEAD2.map((_, i) => WV_MATRIX_HEAD2.map(row => row[i])) :
                                                   WV_MATRIX_HEAD3.map((_, i) => WV_MATRIX_HEAD3.map(row => row[i])) }
      ],
      hint: `Multiply Input matrix with weight matrix Wv${headNumber || 1} to get Value matrix for head ${headNumber || 1}.`
    },
    scores: {
      title: `Attention Scores${headSuffix}`,
      description: `Calculate scaled attention scores for head ${headNumber || 1}`,
      formula: `Scores${headNumber || 1} = (Q${headNumber || 1} × K${headNumber || 1}^T) / √3`,
      resultName: `Scaled Scores Matrix (5×5)`,
      inputMatrices: [
        { name: `Q${headNumber || 1} (5×3)`, data: calculateExpected('q', headNumber) },
        { name: `K${headNumber || 1} (5×3)`, data: calculateExpected('k', headNumber) }
      ],
      hint: `Calculate attention scores by multiplying Q${headNumber || 1} with transposed K${headNumber || 1}, then divide by √3.`
    },
    softmax: {
      title: `Softmax Attention${headSuffix}`,
      description: `Apply softmax to attention scores for head ${headNumber || 1}`,
      formula: `Attention${headNumber || 1} = softmax(Scores${headNumber || 1})`,
      resultName: `Attention Matrix (5×5)`,
      inputMatrices: [
        { name: `Scores${headNumber || 1} (5×5)`, data: calculateExpected('scores', headNumber) }
      ],
      hint: `Apply softmax function row-wise to the scaled scores matrix for head ${headNumber || 1}.`
    },
    output: {
      title: "Multi-Head Output",
      description: "Concatenate all head outputs and multiply by output weights",
      formula: "Output = Concat(Head1, Head2, Head3) × Wo",
      resultName: "Final Output Matrix (5×5)",
      inputMatrices: [
        { name: "Head1 Output (5×3)", data: calculateExpected('softmax', 1) },
        { name: "Head2 Output (5×3)", data: calculateExpected('softmax', 2) },
        { name: "Head3 Output (5×3)", data: calculateExpected('softmax', 3) },
        { name: "Wo (9×5)", data: WO_MATRIX }
      ],
      hint: "Concatenate outputs from all 3 heads horizontally to get a 5×9 matrix, then multiply by Wo (9×5) to get final 5×5 output."
    }
  };
  
  return stepConfig[step];
}
