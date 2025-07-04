import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

/**
 * DashboardCard Component
 * 
 * @component
 * @example
 */
const DashboardCard = ({
  title,
  value,
  prefix = '',
  suffix = '',
  trend = null,
  chartData = null,
  className = '',
}) => {
  // Format the main value with proper separators
  const formattedValue = typeof value === 'number' 
    ? value.toLocaleString()
    : value;

  // Prepare chart data if provided
  const chartConfig = chartData ? {
    labels: chartData.labels,
    datasets: [
      {
        fill: true,
        data: chartData.values,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: {
      point: { radius: 0 },
      line: { borderWidth: 2 },
    },
  };

  return (
    <div className={`bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-6 ${className}`}>
      <h2 className="text-md lg:text-lg font-semibold text-gray-800 mb-3">{title}</h2>
      <div className="flex items-baseline gap-3">
        <div className="text-2xl lg:text-3xl font-bold text-gray-900">
          {prefix}{formattedValue}{suffix}
        </div>
        {trend !== null && (
          <div className={`text-sm lg:text-md font-medium ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </div>
        )}
      </div>
      {chartData && (
        <div className="h-24 mt-4">
          <Line data={chartConfig} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

DashboardCard.propTypes = {
  /**  title of the card */
  title: PropTypes.string.isRequired,
  /**  main value to display */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /** Symbol to show before the value (e.g., '$') */
  prefix: PropTypes.string,
  /** Symbol to show after the value (e.g., '%') */
  suffix: PropTypes.string,
  /** % trend (positive or negative) */
  trend: PropTypes.number,
  /** data for the line chart */
  chartData: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    values: PropTypes.arrayOf(PropTypes.number),
  }),
  /** additional CSS classes */
  className: PropTypes.string,
};

export default DashboardCard; 