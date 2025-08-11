
import React from 'react';

interface InputUIProps {
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  disabled?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
  label?: string;
}

const InputUI: React.FC<InputUIProps> = ({ 
  name = '',
  placeholder = 'Enter text...',
  value = '',
  onChange,
  onBlur,
  type = 'text',
  disabled = false,
  required = false,
  error = '',
  className = '',
  label = ''
}) => {
  
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    
    if (onChange) {
      onChange(value);
    }
  }

  function handleOnBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { value } = e.target;
    
    if (onBlur) {
      onBlur(value);
    }
  }

  const baseClasses = "w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2";
  const stateClasses = error 
    ? "border-red-500 focus:ring-red-200 focus:border-red-500" 
    : "border-gray-300 focus:ring-blue-200 focus:border-blue-500";
  const disabledClasses = disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : "bg-white";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input 
        name={name}
        placeholder={placeholder}
        value={value}
        type={type}
        disabled={disabled}
        required={required}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        className={`${baseClasses} ${stateClasses} ${disabledClasses} ${className}`}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default InputUI;
