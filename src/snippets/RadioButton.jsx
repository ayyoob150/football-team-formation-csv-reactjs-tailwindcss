import React from 'react';

const RadioButton = ({ label, checked, onChange }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        name='starter'
        value={checked}
        type="radio"
        className="hidden"
        onChange={onChange}
      />
      <div className={`relative w-4 h-4  border-border-primary rounded-full ${checked ?'bg-primary':'bg-background-secondary border'} flex items-center justify-center cursor-pointer transition duration-300 ease-in-out`}>
        {checked && (
          <div className="w-2 h-2 bg-background-secondary rounded-full transition duration-300 ease-in-out"></div>
        )}
      </div>
      <span className="ml-2 text-primary-text">{label}</span>
    </label>
  );
};

export default RadioButton;