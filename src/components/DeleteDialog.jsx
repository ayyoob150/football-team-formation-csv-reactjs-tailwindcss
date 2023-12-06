import { XMarkIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import Modal from "../snippets/Modal";

import { context } from "../App";

const DeleteDialog = () => {
  const {
    showDeleteDialog,
    setShowDeleteDialog,
    setPlayerTableIndex,
    setPlayerTable,
    playersTable,
    row,
  } = useContext(context);
  const DeleteHandler = () => {
    const modifiedPlayerTable = playersTable?.filter((el, _) => {
      return el["player name"] !== row[0] && el["jersey number"] !== row[1];
    });
    setPlayerTable(modifiedPlayerTable);
    setPlayerTableIndex(-1);
    setShowDeleteDialog(false);
  };
  return (
    <Modal
      maxWidth={"max-w-sm"}
      isOpen={showDeleteDialog}
      setIsOpen={setShowDeleteDialog}
    >
      <div className="">
        <div className="flex text-white justify-between">
          <div>Are you sure?</div>
          <XMarkIcon
            onClick={() => {
              setShowDeleteDialog(false);
              setPlayerTableIndex(-1);
            }}
            className="w-4 h-4 cursor-pointer hover:text-white"
          />
        </div>
        <div className="text-primary-text text-sm font-extralight mt-6">
          This action cannot be undone.
        </div>
        <div className="flex gap-x-3 justify-end text-right mt-8 font-semibold">
          <button
            onClick={() => {
              setPlayerTableIndex(-1);
              setShowDeleteDialog(false);
            }}
            className="px-5 py-3 text-sm rounded-lg text-primary-text border-[1.6px] border-border-primary hover:text-white font-normal"
          >
            Cancel
          </button>
          <button
            onClick={() => DeleteHandler()}
            className="px-5 py-3 text-sm rounded-lg bg-red-700 hover:bg-orange-700 border-2 border-red-700 hover:border-orange-700 text-white font-normal"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteDialog;
