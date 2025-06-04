
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';
import { motion } from 'framer-motion';

interface WeightEdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: any;
  targetPosition: any;
  data: {
    weight: number;
    isActive: boolean;
  };
}

export function WeightEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: WeightEdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const getWeightColor = () => {
    const weight = data.weight;
    if (weight > 0) {
      return `rgba(34, 197, 94, ${Math.abs(weight)})`;
    } else {
      return `rgba(239, 68, 68, ${Math.abs(weight)})`;
    }
  };

  const strokeWidth = Math.abs(data.weight) * 3 + 1;

  return (
    <>
      <BaseEdge
        path={edgePath}
        style={{
          stroke: getWeightColor(),
          strokeWidth: strokeWidth,
          opacity: data.isActive ? 0.8 : 0.4,
        }}
      />
      
      {data.isActive && (
        <EdgeLabelRenderer>
          <motion.div
            className="absolute pointer-events-none"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-slate-800/90 text-white text-xs px-2 py-1 rounded-md border border-slate-600">
              {data.weight.toFixed(2)}
            </div>
          </motion.div>
        </EdgeLabelRenderer>
      )}
      
      {/* Data flow animation */}
      {data.isActive && (
        <motion.div
          className="absolute w-2 h-2 bg-blue-400 rounded-full pointer-events-none"
          animate={{
            offsetDistance: ['0%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            offsetPath: `path('${edgePath}')`,
          }}
        />
      )}
    </>
  );
}
