import React from 'react';

/**
 * Card Component
 * 
 * @param {string} title - Card title (optional)
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {Object} props - All other div props
 */
const Card = ({ 
  title, 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
      {...props}
    >
      {title && (
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default Card; 