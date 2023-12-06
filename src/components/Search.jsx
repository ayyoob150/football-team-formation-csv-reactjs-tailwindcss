import React, { useContext, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { context } from "../App";
import { keepPlayerColoumn } from "../datas/table";

const Search = () => {
  const [search, setSearch] = useState('');
  const [showXmark, setShowXmark] = useState(false);
  const {
    setFilterPlayerTable,
    playersTable,
  } = useContext(context);

  const searchPlayers = () => {
    if (search) {
      setShowXmark(true);
      const searchTable = playersTable.filter((el, _) => {
        return el["player name"].toLowerCase().includes(search.toLowerCase());
      });
      if (searchTable.length > 0) {
        const filterKeys = searchTable.map((obj) => {
          let newObj = {};
          keepPlayerColoumn.forEach((key) => (newObj[key] = obj[key]));
          return newObj;
        });
        setFilterPlayerTable(filterKeys);
      } else {
        setFilterPlayerTable([]);
      }
    }
  };
  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      searchPlayers();
    } else if (e.key === "Escape") {
      onClickXmarkIcon();
    }
  };
  const onClickXmarkIcon = () => {
    const filterKeys = playersTable.map((obj) => {
      let newObj = {};
      keepPlayerColoumn.forEach((key) => (newObj[key] = obj[key]));
      return newObj;
    });
    setFilterPlayerTable(filterKeys);
    setSearch("");
    setShowXmark(false);
  };

  return (
    <div className="flex w-[280px] justify-between bg-background-primary rounded-lg border-2 border-background-secondary items-center py-2.5 px-4">
      <div className="flex gap-1">
        <MagnifyingGlassIcon className="text-primary-text w-6 h-6 p-1" />
        <input
          className="input-primary text-white"
          type="text"
          placeholder="Find Player"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => handleEnterKeyDown(e)}
          readOnly={showXmark}
        />
      </div>
      {showXmark && (
        <XMarkIcon
        title="ESC"
          onClick={() => onClickXmarkIcon()}
          className="text-primary-text w-6 h-6 p-1 cursor-pointer hover:text-white"
        />
      )}
      {search && !showXmark && (
        <span
        title="Enter"
          onClick={() => searchPlayers()}
          className="text-sm font-normal px-1.5 text-primary cursor-pointer"
        >
          Search
        </span>
      )}
    </div>
  );
};

export default Search;
