import {  useState } from "react";
import { context } from "../App";


const ContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [playersTable, setPlayerTable] = useState([]);
  const [playerTableIndex, setPlayerTableIndex] = useState(-1);
  const [filterPlayerTable, setFilterPlayerTable] = useState([]);
  const [row, setRow] = useState({});
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isRenderable, setIsRenderable] = useState(true);

  return (
    <context.Provider
    value={{
      playersTable,
      setPlayerTable,
      row,
      setRow,
      isOpen,
      setIsOpen,
      fileName,
      setFileName,
      showEditDialog,
      setShowEditDialog,
      playerTableIndex,
      setPlayerTableIndex,
      showDeleteDialog,
      setShowDeleteDialog,
      filterPlayerTable,
      setFilterPlayerTable,
      selectedPlayer,
      setSelectedPlayer,
      isRenderable,
      setIsRenderable,
    }}
    >
      {children}
    </context.Provider>
  );
};

export { ContextProvider };
