import React, { useContext, useEffect } from "react";
import { context } from "../App";
import Table from "../snippets/Table";
import EditPlayerDialog from "../components/EditPlayerDialog";
import DeleteDialog from "../components/DeleteDialog";
import { tableHeadings } from "../datas/table";
import { keepPlayerColoumn } from "../datas/table";


const Home = () => {
  const { playersTable,showEditDialog,filterPlayerTable, setFilterPlayerTable} = useContext(context);
  
  useEffect(() => {
   const filterKeys = playersTable.map((obj) => {
      let newObj = {};
      keepPlayerColoumn.forEach((key) => (newObj[key] = obj[key]));
      return newObj;
    });
    setFilterPlayerTable(filterKeys)
  }, [playersTable,showEditDialog]);

  return (
    <div className=" mx-11 bg-background-secondary my-6 p-6 rounded-lg  min-h-[78vh]">
      <EditPlayerDialog/>
      <DeleteDialog/>
      {filterPlayerTable.length > 0 ? (
        <Table name={'home'} tableHeadings={tableHeadings} tableRowData={filterPlayerTable} />
      ) : (
        <>
          <div className="flex min-w-[800px] justify-between text-xs text-primary-text">
            <div>Player Name</div>
            <div>Jersey Number</div>
            <div>Positon</div>
            <div>Height</div>
            <div>Weight </div>
            <div>Nationility </div>
          </div>
          <div className="flex mt-[20%] justify-center text-sm text-primary-text">
            <div>
              <div>You do not have any players on the roster</div>
              <div className="text-primary text-center">Import Team</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
