import React, { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function ImageUploadInput({ className = '', isFocused = false, ...props }, ref) {
    const inputRef = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type="file"
            accept="image/*"
            className={`block font-medium text-sm text-gray-700 dark:text-gray-300 ` + className}
            ref={inputRef}

        />
    );
});