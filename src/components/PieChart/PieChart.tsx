import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { Activity } from './PieChartType';

type Props = {
  data: Activity[],
  type: 'distance' | 'amount'
}

export default function PieChart({ data, type }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const colors = ['rgb(255,116,108)', 'rgb(99,149,238)',  'rgb(128,239,128)'];

  // Use useEffect to get initial container dimensions and handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    // Initial dimension update
    updateDimensions();

  }, []); // Empty dependency array ensures this runs only once

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const innerRadius: number = dimensions.width * .08;
    const holeColor: string = '#fffbeb';
    const { width, height } = dimensions;

    const total: number = data.reduce((sum, item) => sum + item.value, 0);
    const outerRadius: number = Math.min(width, height) / 2 - 10;
    const centerX: number = width / 2;
    const centerY: number = height / 2;

    let animatedProgress: number = 0;
    const animationSpeed: number = 0.05; // Controls how fast the chart is drawn
    let animationFrameId: number;

    const drawChart = () => {
      ctx.clearRect(0, 0, width, height);

      let currentAngle: number = 0;
      data.forEach((item, index) => {
        let sliceAngle: number = (item.value / total) * 2 * Math.PI;
        // Calculate the end angle for the current animation frame
        const endAngle: number = Math.min(animatedProgress * 2 * Math.PI, currentAngle + sliceAngle);

        if (endAngle > currentAngle) {
          // Draw the outer arc
          ctx.fillStyle = colors[index % colors.length];
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, outerRadius, currentAngle, endAngle);
          ctx.closePath();
          ctx.fill();

          // Draw the inner circle
          ctx.fillStyle = holeColor;
          ctx.beginPath();
          ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.fill();
        }

        // Draw the label only when the slice is fully drawn
        if (endAngle >= currentAngle + sliceAngle - 0.001 && sliceAngle > 0.3) { // -0.001 for float comparison
          const labelAngle: number = currentAngle + sliceAngle / 2;
          const labelX: number = centerX + ((outerRadius + innerRadius) / 2) * Math.cos(labelAngle);
          const labelY: number = centerY + ((outerRadius + innerRadius) / 2) * Math.sin(labelAngle);

          ctx.fillStyle = '#fffbeb'; // Dark gray color for labels
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = `800 20px sans-serif`;
          ctx.fillText(labelOutput(type, item.value), labelX, labelY);
        }

        currentAngle += sliceAngle;
      });

      // Update progress and request the next frame
      if (animatedProgress < 1) {
        animatedProgress += animationSpeed;
        animationFrameId = requestAnimationFrame(drawChart);
      }
    };

    drawChart();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, data, colors, type]); // Rerun effect when dimensions, data, or colors change

  return (
      <div className="flex flex-col items-center p-4">
        <div ref={containerRef} className="" style={{ width: '80%', aspectRatio: '1/1' }}>
          <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} className="w-full h-full"/>
        </div>
        <div className="flex flex-wrap justify-center mt-6 gap-4">
          {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-sm font-bold text-lime-900">{item.label}</span>
              </div>
          ))}
        </div>
      </div>
  );
}

const labelOutput = (type: 'distance' | 'amount', value: number): string => {
  return type === 'distance' ? `${value} km` : `${value}x`;
}