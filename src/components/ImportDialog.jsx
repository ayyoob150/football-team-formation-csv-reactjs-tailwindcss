import { XMarkIcon } from "@heroicons/react/24/solid";
import Modal from "../snippets/Modal";
import Table from "../snippets/Table";
import * as XLSX from "xlsx";
import { context } from "../App";
import { useContext, useState } from "react";

const tableHeadings = [
  "Total Players",
  "Goalkeepers",
  "Defenders",
  "Midfielders",
  "Forwards",
];

const ImportDialog = () => {
  const {
    setPlayerTable,
    isOpen,
    setIsOpen,
    fileName,
    setFileName
  } = useContext(context);
  const [filedataArray, setFileDataArray] = useState([]);
  const [missingValues, setMissingValues] = useState(false);
  const [fileSummary, setFileSummary] = useState({
    totalPlayers: 0,
    goalkeepers: 0,
    defenders: 0,
    midfielders: 0,
    forwards: 0,
  });

  const handleFileChange = (event) => {
    let isValid = false;
    setFileDataArray(() => []);
    setMissingValues(() => false);
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });

          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          const [header, ...rows] = jsonData;
          const playerSheetArr = rows.map((row) =>
            Object.fromEntries(
              header.map((key, index) => [key.trim().toLowerCase(), row[index]])
            )
          );

          playerSheetArr.forEach((el, _) => {
            if (
              el.starter === undefined ||
              el.position === undefined ||
              el.height === undefined ||
              el.weight === undefined ||
              el.nationality === undefined ||
              el.appearances === undefined ||
              el.goals === undefined ||
              el.assists === undefined ||
              el.saves === undefined ||
              el["player name"] === undefined ||
              el["player image"] === undefined ||
              el["jersey number"] === undefined ||
              el["flag image"] === undefined ||
              el["minutes played"] === undefined ||
              el["clean sheets"] === undefined
            ) {
              isValid = true;
              setMissingValues(() => true);
              return;
            }
            if (el?.position.toLowerCase() === "goalkeeper") {
              setFileSummary((pre) => ({
                ...pre,
                goalkeepers: pre.goalkeepers + 1,
              }));
            } else if (el?.position.toLowerCase() === "defender") {
              setFileSummary((pre) => ({
                ...pre,
                defenders: pre.defenders + 1,
              }));
            } else if (el?.position.toLowerCase() === "midfielder") {
              setFileSummary((pre) => ({
                ...pre,
                midfielders: pre.midfielders + 1,
              }));
            } else if (el?.position.toLowerCase() === "forward") {
              setFileSummary((pre) => ({ ...pre, forwards: pre.forwards + 1 }));
            }
          });
          setFileSummary((pre) => ({
            ...pre,
            totalPlayers: playerSheetArr.length,
          }));
          if (!isValid) {
            setFileName(file?.name);
            setFileDataArray(playerSheetArr);
          }
        } catch (error) {
          console.error("Error reading CSV file:", error);
        }
      };

      reader.readAsBinaryString(file);
    }
  };
  const importPlayerTable = () => {
    setIsOpen(false);
    setPlayerTable(filedataArray);
    setFileDataArray([]);
  };

  return (
    <Modal
      height={"h-[90vh]"}
      maxWidth={"max-w-5xl"}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="">
        <div className="flex text-white justify-between border-b border-border-primary pb-2">
          <div>Importer</div>
          <XMarkIcon onClick={() => setIsOpen(false)} className="w-4 h-4" />
        </div>
        <div className="text-white text-sm mt-6">Roster File</div>
        <div className="mt-6 text-sm text-primary-text">
          <label
            className={`cursor-pointer py-4 pl-4 rounded-lg border ${
              missingValues ? "border-red-700" : "border-border-primary"
            }`}
          >
            <div className="px-4 fixed w-48 whitespace-nowrap overflow-hidden text-ellipsis">
              {!fileName ? "No Files Selected" : fileName}
            </div>
            <span
              className={` p-4 ml-52 font-semibold border  ${
                missingValues ? "border-red-700" : "border-border-primary"
              } rounded-lg `}
            >
              Select File
            </span>
            <input
              type="file"
              className="hidden"
              accept=".csv"
              onChange={(e) => handleFileChange(e)}
            />
          </label>
        </div>
        {missingValues ? (
          <div>
            <div className="mt-8 text-red-700">Error</div>
            <div className="text-white font-normal text-sm mt-2">
              Your sheet is missing data. Please ensure all cells filled out.
            </div>
          </div>
        ) : (
          <div className="text-primary-text mt-7 text-sm ">
            File must be in .csv format
          </div>
        )}
        {!missingValues && (
          <div className="mt-8 mb-2 text-sm text-white">File Summary</div>
        )}
        {!missingValues && (
          <Table
            name="importDialog"
            tableHeadings={tableHeadings}
            tableRowData={fileSummary}
          />
        )}
        <button
          onClick={() => importPlayerTable()}
          disabled={!filedataArray.length > 0}
          className="fixed right-6 bottom-6 text-sm text-white py-2 px-4 rounded-lg bg-primary hover:bg-hover-primary disabled:bg-transparent disabled:text-primary-text"
        >
          Import
        </button>
      </div>
    </Modal>
  );
};

export default ImportDialog;
