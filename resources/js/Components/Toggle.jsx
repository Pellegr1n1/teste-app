import React from 'react';
import './Toggle.css';

export default function ToggleSwitch({ checked, onChange, className = '', ...props }) {
    return (
        <label
            className={`switch block font-medium text-sm text-gray-700 dark:text-gray-300 ` + className}
            {...props}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="hidden"
            />
            <span className="slider round"></span>
        </label>
    );
}
