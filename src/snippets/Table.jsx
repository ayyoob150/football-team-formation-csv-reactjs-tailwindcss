import React, { useContext, useState } from "react";
import {} from "@heroicons/react/24/solid";
import {
  EllipsisHorizontalIcon,
  XMarkIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { context } from "../App";

const Table = ({ name, ActionIcon, tableHeadings, tableRowData, action }) => {
  const {
    setShowEditDialog,
    setPlayerTableIndex,
    setShowDeleteDialog,
    setRow,
  } = useContext(context);
  let data = [];
  const [index, setIndex] = useState(-1);
  if (!Array.isArray(tableRowData)) {
    data.push(Object.values(tableRowData));
  } else {
    tableRowData.forEach((el, _) => {
      data.push(Object.values(el));
    });
  }

  return (
    <div className="">
      <table className="min-w-full  text-xs text-primary-text">
        <thead>
          <tr>
            {tableHeadings?.map((heading, index) => (
              <th key={index} className="py-2 text-left font-normal">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Table Rows */}
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`py-2 font-bold ${
                    name === "importDialog" && "text-base"
                  }`}
                >
                  {colIndex === 0 && name === "home" && (
                    <img
                      src={row[row.length - 1]}
                      alt={row[0]}
                      className="inline mr-2 w-8 h-8 rounded-full"
                    />
                  )}
                  {name === "home" && colIndex === row.length - 1 ? (
                    <div>
                      {name === "home" && index === rowIndex && (
                        <div className="p-4 absolute bg-background-secondary h-40 w-60 rounded-lg mt-[-15px] ml-[-200px] shadow-lg cursor-default">
                          <div className="flex justify-between">
                            <span className="text-lg  font-semibold text-white">
                              Actions
                            </span>
                            <XMarkIcon
                              onClick={() => setIndex(-1)}
                              className="w-[20px] h-[20px]  hover:text-white cursor-pointer"
                            />
                          </div>
                          <div
                            onClick={() => {
                              setShowEditDialog(true);
                              setIndex(-1);
                            }}
                            className="flex gap-2 px-1 mt-6 text-primary-text cursor-pointer  hover:text-white"
                          >
                            <PencilIcon className="w-[20px] h-[20px]" />
                            <span className="text-sm font-normal">
                              Edit Player
                            </span>
                          </div>
                          <div
                            onClick={() => {
                              setShowDeleteDialog(true);
                              setIndex(-1);
                            }}
                            className="flex gap-2 px-1 mt-4 text-primary-text hover:text-white"
                          >
                            <TrashIcon className="w-[20px] h-[20px]" />
                            <span className="text-sm font-normal">
                              Delete Player
                            </span>
                          </div>
                        </div>
                      )}
                      <EllipsisHorizontalIcon
                        onClick={() => {
                          setPlayerTableIndex(() => rowIndex);
                          setIndex(() => rowIndex);
                          setRow(row);
                        }}
                        className="h-6 w-6 cursor-pointer hover:text-white"
                      />
                    </div>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
