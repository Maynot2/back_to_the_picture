import React, { useState } from 'react';
import {ReactComponent as ReactLogoFull} from './BTTP-logo-full-white.svg';
import {ReactComponent as ReactLogoSmall} from './BTTP-logo-sm-white.svg';
import { TiThMenuOutline } from "react-icons/ti";
import { RiCloseCircleFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import LoginButton from './login';
import LogoutButton from './logout';
import { useAuth0 } from "@auth0/auth0-react";
import { DropDown } from './DropDown';

function CheckConnected({user, isAuthenticated}){
  if (isAuthenticated){
    return <span>Welcome {user.name}</span>
  } else {
    return ('No connected yet')

  }
}

function SignUP({user, isAuthenticated}){
  if (isAuthenticated){
    return <LogoutButton />
  } else {
    return (<LoginButton />)
  }
}
function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useAuth0();

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
      <nav className="bg-nav-gradient border-b-4 px-4 border-secondary">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <Link to='/' className="pr-4">
            <ReactLogoFull className="hidden sm:block w-52"/>
            <ReactLogoSmall className="sm:hidden w-36"/>
          </Link> 
          <div className="hidden sm:flex ">
            <Link to='/' className="bg-transparent text-tertiary hover:text-neutralW font-semibold hover:font-black py-2 px-4">
              <CheckConnected user={user} isAuthenticated={isAuthenticated} />
            </Link>
            <Link to='#' className="bg-transparent text-tertiary border-tertiary border-2 hover:bg-tertiary hover:text-primary font-semibold ml-2 py-2 px-4 rounded">
              <SignUP user={user} isAuthenticated={isAuthenticated} />
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