import React, {useState, useEffect} from 'react';
import {ReactComponent as ReactLogoFull} from './BTTP-logo-full-white.svg';
import {ReactComponent as ReactLogoSmall} from './BTTP-logo-sm-white.svg';
import { TiThMenuOutline } from "react-icons/ti";
import { RiCloseCircleFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { DropDown } from './DropDown';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const displayBurger = (isOpen) => {
    if (!isOpen){
      return <TiThMenuOutline size="2.5em" className="text-neutralW" />;
    } else {
      return <RiCloseCircleFill size="2.5em" className="text-neutralW" />;
    }
  }

  return (
     <div className="">
      <nav className="bg-nav-gradient border-b-4  border-secondary">
        <div className="xl:max-w-7xl mx-auto p-4 flex justify-between items-center">
          <Link to='/' className="pr-4">
            <ReactLogoFull className="hidden sm:block w-52"/>
            <ReactLogoSmall className="sm:hidden w-36"/>
          </Link> 
          <Link to='#' className="hidden sm:block bg-secondary border-2 border-neutralW text-neutralW hover:bg-neutralW hover:text-secondary hover:border-secondary font-bold py-4 px-10 rounded-full transition duration-300">
            upload pic
          </Link>
          <div className="hidden sm:flex ">
            <Link to='#' className="bg-transparent text-tertiary hover:text-neutralW font-semibold hover:font-black py-2 px-4">
              log-in
            </Link>
            <Link to='#' className="bg-transparent text-tertiary border-tertiary border-2 hover:bg-tertiary hover:text-primary font-semibold ml-2 py-2 px-4 rounded">
              sign-up
            </Link>
          </div>
          <button className="sm:hidden" onClick={toggleMenu}>
            {displayBurger (isOpen)}
          </button>
        </div>
      </nav>
      <DropDown isOpen={isOpen} toggleMenu={toggleMenu}/>
    </div>
  );
}

export default NavBar;