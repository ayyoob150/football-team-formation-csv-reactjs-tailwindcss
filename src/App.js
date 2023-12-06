import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Detail from "./pages/Detail";
import { createContext, useState } from "react";

export const context = createContext(null);

function App() {
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
    <div className="bg-[#1f1f1f] w-full h-full">
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="detail" element={<Detail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </context.Provider>
    </div>
  );
}

export default App;
