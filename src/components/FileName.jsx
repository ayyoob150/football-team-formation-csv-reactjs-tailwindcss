import React, { useContext, useEffect, useState } from "react";
import { context } from "../App";
import { PencilIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";

const FileName = ({location}) => {
  const { fileName, setFileName } = useContext(context);
  const [isNameEdited, setIsNameEdited] = useState(false);
  const [isHover, setIsHover] = useState(true);
  const [checkHover, setCheckHover] = useState(false);
  const [name, setName] = useState(fileName);

  useEffect(() => {
    setName(fileName);
  }, [fileName, isNameEdited]);

  const nameHadler = () => {
    setFileName(name);
    setIsNameEdited(false);
    setIsHover(false);
    setCheckHover(true);
  };
  return (
    <>
      {!isNameEdited && (
        <div className="text-primary text-sm">{
          location === "/" ? "Roster Details" : "Formation Overview"
        }</div>
      )}
      <div className="flex gap-2 items-center text-lg font-bold cursor-default">
        {isNameEdited ? (
          <div className="hoverEnable flex rounded-md border-2 border-background-secondary items-center py-[12.4px] px-4">
            <PencilIcon className="w-4 h-4 text-primary-text mx-2" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Team"
              className="input-primary"
            />
            <XMarkIcon
              onClick={() => {
                setIsNameEdited(false);
                if(checkHover)
                setIsHover(false);
              }}
              className="w-4 h-4 text-primary-text mx-2 hover:text-white cursor-pointer"
            />
            <CheckIcon
              onClick={() => nameHadler()}
              className="w-4 h-4 text-primary-text mx-2 hover:text-white cursor-pointer"
            />
          </div>
        ) : (
          <span
            className="max-w-[384px] cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
            onMouseEnter={() => {
              if (checkHover) {
                setIsHover(true);
              }
            }}
            onMouseLeave={() => {
              if (checkHover) {
                setIsHover(false);
              }
            }}
            onClick={() => setIsNameEdited(true)}
          >
            {!fileName ? "My Team" : fileName}
          </span>
        )}

        {!isNameEdited && isHover && (
          <PencilIcon
            onClick={() => setIsNameEdited(true)}
            className="w-4 h-4 text-white cursor-pointer"
          />
        )}
      </div>
    </>
  );
};

export default FileName;
