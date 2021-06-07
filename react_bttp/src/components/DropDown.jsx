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
        <Link to="" className="border-b-2 border-neutralW font-semibold py-5">
          log-in
        </Link>
        <Link to="" className="border-b-2 border-neutralW font-semibold py-5">
          sign-up
        </Link>
        <div className="bg-nav-gradient border-b-4 border-secondary py-5">
          <Link
            to=""
            className="bg-secondary border-2 border-neutralW text-neutralW py-2 px-6 rounded-full "
          >
            upload pic
          </Link>
        </div>
      </nav>
    </div>
  );
};
