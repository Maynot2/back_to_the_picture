import React from "react";
import { Link } from "react-router-dom";

export const DropDown = ({ isOpen, toggleMenu }) => {
  return (
    <div className="absolute z-10 w-full">
      <nav
        className={
          isOpen
            ? "flex flex-col text-neutralW text-center bg-primary sm:hidden"
            : "hidden"
        }
        onClick={toggleMenu}
      >
        <Link to="" className="border-b-2 border-neutralW py-3">
          log-in
        </Link>
        <Link to="" className="border-b-2 border-neutralW py-3">
          sign-up
        </Link>
        <Link to="" className="border-b-2 border-neutralW py-3">
          upload pic
        </Link>
      </nav>
    </div>
  );
};
