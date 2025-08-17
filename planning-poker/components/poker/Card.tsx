import React from 'react';

interface CardProps {
  value: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

export const Card: React.FC<CardProps> = ({ value, isSelected, onSelect }) => (
    <button
        onClick={() => onSelect(value)}
        className={`card border-2 rounded-lg font-bold text-2xl h-24 flex items-center justify-center shadow-sm transition-all duration-200 ease-in-out ${
            isSelected
                ? 'transform -translate-y-1 border-indigo-500 bg-indigo-100'
                : 'border-gray-200 bg-white hover:transform hover:-translate-y-1 hover:shadow-md'
        }`}
    >
        {value}
    </button>
);
