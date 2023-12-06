import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const Dropdown = ({options,selectedOption, setSelectedOption,custumSelectedOption,setIsDisable}) => {
  const [showOption, setShowOption] = useState(false);


  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOption(false);
    if(setIsDisable)
    setIsDisable(false)

  };

  return (
    <div onClick={() => {setShowOption(!showOption)}} className="relative inline-block cursor-pointer text-left mt-2 input-primary bg-background-secondary border-2 border-border-primary px-2 py-3 w-full rounded-md">
      <div
        className="flex justify-between items-center"
        
      >
        <span>{selectedOption || custumSelectedOption}</span>
        <ChevronDownIcon className="w-6 h-6 p-1" />
      </div>
      {showOption && (
        <div
          className="origin-top-right absolute right-0 mt-3.5 overflow-y-scroll w-full max-h-64  border-2 border-border-primary z-50 text-primary-text rounded-md shadow-inner bg-background-secondary py-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdown-menu"
        >
            {options.map((option) => (
              <li
                key={option}
                className={`block px-4 py-1 text-sm hover:bg-primary hover:text-white cursor-pointer`}
                role="menuitem"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
