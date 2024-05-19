import React from 'react';

export default function SelectLabel({ options, value, onChange, className = '', children, ...props }) {
    return (
        <div className={`relative ${className}`}>
            <select
                value={value}
                onChange={onChange}
                className={
                    'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                    className
                }
                {...props}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}