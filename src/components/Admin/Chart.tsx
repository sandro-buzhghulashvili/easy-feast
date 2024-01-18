// OrderChart.tsx
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface OrderChartProps {
  orderData: { month: string; itemsDelivered: number }[];
}

const OrderChart: React.FC<OrderChartProps> = ({ orderData }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (orderData && orderData.length > 0) {
      const labels = orderData.map((entry) => entry.month);
      const data = orderData.map((entry) => entry.itemsDelivered);

      const ctx = chartRef.current?.getContext('2d');

      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: 'Items Delivered',
                data,
                fill: true,
                borderColor: '#fe724c',
                tension: 0.1,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
          },
        });
      }
    }
  }, [orderData]);

  return (
    <div className="container mb-28 md:p-28 mx-auto flex justify-center">
      <canvas ref={chartRef} width={500} height={300}></canvas>
    </div>
  );
};

export default OrderChart;
