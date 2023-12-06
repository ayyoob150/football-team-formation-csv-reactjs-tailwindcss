import React, { useContext } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { UserGroupIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { context } from "../App";
import ImportDialog from "./ImportDialog";
import FileName from "./FileName";
import Search from "./Search";
import Logo from "../assets/images/logo.png"

const Navbar = () => {
  const { setIsOpen, playersTable } = useContext(context);
  const location = useLocation();

  return (
    <div className="text-white flex">
      <div className="flex flex-col  bg-black shadow-lg gap-y-7 px-2">
        <NavLink className="mt-4">
          <img
            className="w-10 h-10 border-[4px] border-primary rounded-full bg-white"
            alt="football"
            src={Logo}
          />
        </NavLink>
        <NavLink
          to="/"
          className="mt-5 text-de-active mx-auto flex font-extrabold items-center gap-0.5"
        >
          {location.pathname === "/" && (
            <div className="rounded-full h-1 w-1  bg-primary"></div>
          )}
          <Bars3Icon className={`w-6 h-6 ${(location.pathname !== "/") ? "ml-2":"mr-0"} `} />
        </NavLink>
        <NavLink
          to="/detail"
          className="text-de-active mx-auto flex font-extrabold items-center gap-0.5"
        >
          {location.pathname === "/detail" && (
            <div className="rounded-full h-1 w-1 bg-primary"></div>
          )}
          <div>
          <UserGroupIcon  className={`w-6 h-6 p-0.5 ${(location.pathname !== "/detail") ? "ml-2":"mr-0"} `} />
          {location.pathname === "/detail" && (
            <div className="h-[1.7px] w-full bg-primary"></div>
          )}
          </div>
          
        </NavLink>
      </div>
      <nav className="pt-14 flex-1">
        <ul className="flex justify-between mx-11 gap-64">
          <li>
            <FileName location={location.pathname} />
          </li>
          <li className="flex gap-4">
            {location.pathname === "/" && <>
            <Search />
            <button
              onClick={() => setIsOpen(() => true)}
              className={` text-sm whitespace-nowrap px-4 py-2.5 rounded-lg font-semibold border-2 border-background-secondary ${
                playersTable.length > 0
                  ? "bg-background-primary text-primary-text"
                  : "bg-primary text-white hover:bg-hover-primary"
              }`}
            >
              {playersTable.length > 0 ? "Re-Import Team" : "Import Team"}
            </button>
            </>}
          </li>
        </ul>
        <Outlet />
        <ImportDialog />
      </nav>
    </div>
  );
};

export default Navbar;
