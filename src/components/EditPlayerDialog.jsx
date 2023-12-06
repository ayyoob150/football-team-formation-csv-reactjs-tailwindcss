import React, { useContext, useEffect, useState } from "react";
import Modal from "../snippets/Modal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { context } from "../App";
import RadioButton from "../snippets/RadioButton";
import Dropdown from "../snippets/Dropdown";
import { countries } from "../datas/country";
import { postions } from "../datas/positon";

const EditPlayerDialog = () => {
  const {
    showEditDialog,
    setShowEditDialog,
    playerTableIndex,
    setPlayerTableIndex,
    playersTable,
    setPlayerTable,
    row,
    setRow
  } = useContext(context);
  const [inputPlayerData, setInputPlayerData] = useState({
    "player name": "",
    "jersey number": "",
    weight: "",
    height: "",
  });
  const [isDiable, setIsDisable] = useState(true);
  const [checked, setChecked] = useState(
    playerTableIndex > -1 &&
    row[2]
  );
  const [country, setCountry] = useState(
    playerTableIndex > -1 && 
    row[6]
  );
  const [positon, setPosition] = useState(
    playerTableIndex > -1 && 
    row[3]
  );

  useEffect(() => {
    setCountry(() => row[6]);
    setPosition(() => row[3]);
    setChecked(() => row[2]?.toLowerCase());
    setInputPlayerData({
      ...inputPlayerData,
      "player name":
        playerTableIndex > -1 && row[0],
      "jersey number":
        playerTableIndex > -1 &&
        row[1],
      height: playerTableIndex > -1 &&  row[4],
      weight: playerTableIndex > -1 && row[5],
    });
  }, [playersTable, playerTableIndex]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setInputPlayerData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    if (isDiable) {
      setIsDisable(false);
    }
  };
  const editPlayerHandler = (e) => {
    e.preventDefault();

    const editedTable = playersTable.map((el,_) => {
      if (
        el["player name"] === row[0] &&
        el["jersey number"] === row[1]
      ) {
        return {
          ...el,
          "player name": inputPlayerData["player name"],
          "jersey number": inputPlayerData["jersey number"],
          weight: inputPlayerData["weight"],
          height: inputPlayerData["height"],
          nationality: country,
          position: positon,
          starter: checked === "yes" ? "Yes" : "No",
        };
      } else {
        return el;
      }
    });
    setPlayerTable(editedTable);
    setShowEditDialog(false);
    setIsDisable(true);
    setRow({})
    setPlayerTableIndex(-1)
  };
  return (
    <Modal isOpen={showEditDialog} setIsOpen={setShowEditDialog}>
      <div className="flex text-white text-base font-semibold justify-between">
        <div>Edit Player</div>
        <XMarkIcon
          onClick={() => {
            setShowEditDialog(false);
            setPlayerTableIndex(-1);
            setIsDisable(true);
          }}
          className="w-4 h-4"
        />
      </div>
      <form className="text-white text-sm mt-6">
        <div className="flex w-full gap-x-4 text-xs font-semibold text-primary-text">
          <div className="w-[65%]">
            <div>Player Name</div>
            <input
              className="mt-2 input-primary bg-background-secondary border-2 border-border-primary px-2 py-3 w-full rounded-md"
              type="text"
              name="player name"
              value={inputPlayerData["player name"]}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div className="w-[35%]">
            <div>Jersey Number</div>
            <input
              className="mt-2 input-primary bg-background-secondary border-2 border-border-primary px-2 py-3 w-full rounded-md"
              type="text"
              name="jersey number"
              value={inputPlayerData["jersey number"]}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
        </div>
        <div className="mt-6 flex w-full gap-x-4 text-xs font-semibold text-primary-text">
          <div className="w-[50%]">
            <div>Height</div>
            <input
              className="mt-2 input-primary bg-background-secondary border-2 border-border-primary px-2 py-3 w-full rounded-md"
              type="text"
              name="height"
              value={inputPlayerData["height"]}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div className="w-[50%]">
            <div>Weight</div>
            <input
              className="mt-2 input-primary bg-background-secondary border-2 border-border-primary px-2 py-3 w-full rounded-md"
              type="text"
              name="weight"
              value={inputPlayerData["weight"]}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
        </div>
        <div className="mt-6 w-full text-xs font-semibold text-primary-text">
          <div>Nationality</div>
          <Dropdown
            options={countries}
            custumSelectedOption={
              playerTableIndex > -1 &&
              row[6]
            }
            selectedOption={country}
            setSelectedOption={setCountry}
            setIsDisable={setIsDisable}
          />
        </div>
        <div className="mt-6 w-full text-xs font-semibold text-primary-text">
          <div>Position</div>
          <Dropdown
            options={postions}
            custumSelectedOption={
              playerTableIndex > -1 && 
              row[3]
            }
            selectedOption={positon}
            setSelectedOption={setPosition}
            setIsDisable={setIsDisable}
          />
        </div>
        <div className="mt-6 text-xs font-semibold text-primary-text">
          Starter
        </div>
        <div className=" flex mt-6 gap-x-2 w-full">
          <RadioButton
            label={"No"}
            onChange={() => {
              setChecked("no");
              setIsDisable(false);
            }}
            checked={checked === "no"}
          />
          <RadioButton
            label={"Yes"}
            onChange={() => {
              setChecked("yes");
              setIsDisable(false);
            }}
            checked={checked === "yes"}
          />
        </div>

        <div className="text-right mt-8 font-semibold">
          <button
            disabled={isDiable}
            onClick={(e) => editPlayerHandler(e)}
            className="px-4 py-3  rounded-lg bg-primary hover:bg-hover-primary text-white disabled:text-primary-text disabled:bg-background-secondary font-normal disabled:font-light"
          >
            Edit Player
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditPlayerDialog;
