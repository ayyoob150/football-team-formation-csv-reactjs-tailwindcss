import React, { useContext, useEffect, useState } from "react";
import { context } from "../App";
import PlayerCard from "../components/PlayerCard";
import FormationDialog from "../components/FormationDialog";
import { useLocation } from "react-router-dom";
import '../pitchPlayer.css';
import FootballGroundFormation from '../components/footballFormation';

const Detail = () => {
  const [showFormationDialog, setShowFormationDialog] = useState(false);
  const [warning, setWarning] = useState({});
  const [homeTeam , setHomeTeam] = useState({
    squad: {
      gk: {
        name: "",
        number: 0,
      },
      df: [],
      cam: [],
      fw: [],
    },
  })
 
  let playerValidater = {
    goalkeepers: 0,
    defenders: 0,
    midfielders: 0,
    forwards: 0,
  };
  const { playersTable,selectedPlayer } = useContext(context);
  const location = useLocation();

  useEffect(() => {
    if (!playersTable?.length > 0) {
      setWarning(() => ({
        heading: "No player data found",
        msg: "please import your roaster first",
      }));
      setShowFormationDialog(true);
    } else {
      playersTable.forEach((el, _) => {
        if (
          el?.position.toLowerCase() === "goalkeeper" &&
          el?.starter.toLowerCase() === "yes"
        ) {
          setHomeTeam((pre)=>({
            ...pre,
            squad:{
              ...pre.squad,
              gk:{
                ...pre.squad.gk,
                name:el?.["player name"],
                number:el?.["jersey number"]
              }
            }
          }))
          playerValidater = {
            ...playerValidater,
            goalkeepers: playerValidater.goalkeepers + 1,
          };
        } else if (
          el?.position.toLowerCase() === "defender" &&
          el?.starter.toLowerCase() === "yes"
        ) {
          setHomeTeam((pre)=>({
            ...pre,
            squad:{
              ...pre.squad,
              df:[...pre.squad.df,{
                name:el?.["player name"],
                number:el?.["jersey number"]
              }]
            }
          }))
          playerValidater = {
            ...playerValidater,
            defenders: playerValidater.defenders + 1,
          };
        } else if (
          el?.position.toLowerCase() === "midfielder" &&
          el?.starter.toLowerCase() === "yes"
        ) {
          setHomeTeam((pre)=>({
            ...pre,
            squad:{
              ...pre.squad,
              cam:[...pre.squad.cam,{
                name:el?.["player name"],
                number:el?.["jersey number"]
              }]
            }
          }))
          playerValidater = {
            ...playerValidater,
            midfielders: playerValidater.midfielders + 1,
          };
        } else if (
          el?.position.toLowerCase() === "forward" &&
          el?.starter.toLowerCase() === "yes"
        ) {
          setHomeTeam((pre)=>({
            ...pre,
            squad:{
              ...pre.squad,
              fw:[...pre.squad.fw,{
                name:el?.["player name"],
                number:el?.["jersey number"]
              }]
            }
          }))
          playerValidater = {
            ...playerValidater,
            forwards: playerValidater.forwards + 1,
          };
        }
      });
      if (
        playerValidater?.goalkeepers < 1 ||
        playerValidater?.defenders < 4 ||
        playerValidater?.forwards < 3 ||
        playerValidater?.midfielders < 3
      ) {
        setWarning(() => ({
          heading: "Not enough starters",
          msg: "Your team doesn't have enough starters for one or more of the positions in the 4-3-3 formation",
        }));
        setShowFormationDialog(true);
      } else if (
        playerValidater?.goalkeepers > 1 ||
        playerValidater?.defenders > 4 ||
        playerValidater?.forwards > 3 ||
        playerValidater?.midfielders > 3
      ) {
        setWarning(() => ({
          heading: "There are too many starters",
          msg: "Your team has too many starters for one or more of the positions in the 4-3-3 formation",
        }));
        setShowFormationDialog(true);
      }
    }
  }, [playersTable, location.pathname]);

  const handlerPalyerCard =()=>{
   const showPlayerData = playersTable?.filter((el,_)=>{
    return el["player name"] === selectedPlayer?.name && el["jersey number"] === selectedPlayer?.number
   })
   return showPlayerData
  }
  return (
    <div className="flex bg-background-secondary min-h-[670px] my-4 p-8 mx-11 rounded-lg gap-x-8 shadow-inner">
      <FormationDialog
        warning={warning}
        showFormationDialog={showFormationDialog}
        setShowFormationDialog={setShowFormationDialog}
      />
      {warning?.heading && <div className="background-image w-[959.4px]  bg-background-secondary rounded-md  "></div>}
      {!warning?.heading && <FootballGroundFormation Team={homeTeam} />}
      <PlayerCard
        warning={warning?.heading}
        playersData={handlerPalyerCard()[0]}
      />
    </div>
  );
};

export default Detail;
