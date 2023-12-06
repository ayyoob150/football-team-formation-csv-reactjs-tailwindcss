import React, { useContext } from "react";
import footballPlayerImage from "../assets/images/football-player.png";
import { context } from "../App";

const PlayerCard = ({ playersData, warning }) => {
  const onError = (err) => {
    if (err?.type === "error") setIsRenderable(false);
  };
  const { isRenderable, setIsRenderable } = useContext(context);
  return (
    <div className="flex bg-background-primary w-[319.8px] rounded-md p-6">
      {!warning ? (
        <div className="">
          <div className="absolute z-10 font-semibold text-primary mt-10 ml-4 text-4xl">
            {playersData?.["jersey number"]}
          </div>
          <div className="absolute font-semibold text-[#fea01310]  ml-2 text-9xl">
            {playersData?.["jersey number"]}
          </div>
          <div className="absolute mt-[210px] w-[280px] text-ellipsis overflow-hidden whitespace-nowrap text-white font-semibold text-2xl drop-shadow-4xl">
            {playersData?.["player name"]}
          </div>
          <div className="absolute mt-[245px] text-primary font-semibold text-lg drop-shadow-4xl">
            {playersData?.position}
          </div>
          <img
            className="w-[270px] h-[270px]"
            src={
              isRenderable ? playersData?.["player image"] : footballPlayerImage
            }
            onError={onError}
            alt="football player"
          />
          <div className="mt-5 flex gap-x-6 bg-background-primary  text-sm">
            <div>
              <div className="drop-shadow font-light">Height</div>
              <div className="drop-shadow font-semibold mt-2">
                {playersData?.height} m
              </div>
            </div>
            <div>
              <div className="drop-shadow font-light">Weight</div>
              <div className="drop-shadow font-semibold mt-2">
                {playersData?.weight} kg
              </div>
            </div>
            <div>
              <div className="drop-shadow">Nationality</div>
              <div className="flex drop-shadow items-center font-light gap-x-2 mt-2">
                <img
                  className="w-6 h-6 rounded-full"
                  src={playersData?.["flag image"]}
                  alt="Nationality"
                />
                <span className="drop-shadow font-semibold">
                  {playersData?.nationality}
                </span>
              </div>
            </div>
          </div>
          <hr className="mt-10 border border-border-primary" />
          <div className="flex mt-8 gap-x-6">
            <div>
              <div className="text-primary font-semibold text-3xl">
                {playersData?.appearances}
              </div>
              <div className="text-sm font-light">Appearances</div>
            </div>
            <div>
              <div className="text-primary font-semibold text-3xl">
                {playersData?.["minutes played"]}
              </div>
              <div className="text-sm font-light">Minutes Played</div>
            </div>
          </div>
          <div className="flex mt-4 gap-x-6">
            {playersData?.position.toLowerCase() === "goalkeeper" ? (
              <div>
                <div className="text-primary font-semibold text-3xl">
                  {playersData?.["clean sheets"]}
                </div>
                <div className="text-sm font-light">Clean sheets</div>
              </div>
            ) : (
              <div>
                <div className="text-primary font-semibold text-3xl">
                  {playersData?.assists}
                </div>
                <div className="text-sm font-light">
                  Assists &nbsp; &nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
              </div>
            )}
            {playersData?.position.toLowerCase() === "goalkeeper" ? (
              <div>
                <div className="text-primary font-semibold text-3xl">
                  {playersData?.saves}
                </div>
                <div className="text-sm font-light">Saves</div>
              </div>
            ) : (
              <div>
                <div className="text-primary font-semibold text-3xl">
                  {playersData?.goals}
                </div>
                <div className="text-sm font-light">Goals</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center">
          <hr className="mt-52 w-full border border-border-primary" />
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
