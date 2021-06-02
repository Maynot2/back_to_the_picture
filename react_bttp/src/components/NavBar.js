import {ReactComponent as ReactLogoFull} from './BTTP-logo-full-white.svg';
import {ReactComponent as ReactLogoSmall} from './BTTP-logo-sm-white.svg';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="bg-nav-gradient border-b-4  border-secondary">
      <nav className="xl:max-w-7xl mx-auto p-4 flex justify-between items-center">
        <Link to='/' className="pr-4">
          <ReactLogoFull className="hidden sm:block w-52"/>
          <ReactLogoSmall className="sm:hidden w-36"/>
        </Link> 
        <Link to='#' className="hidden sm:block bg-secondary border-2 border-neutralW text-neutralW hover:bg-neutralW hover:text-secondary hover:border-secondary font-bold py-4 px-10 rounded-full transition duration-300">
          upload pic
        </Link>
        <div className="hidden sm:flex ">
          <Link to='#' className="bg-transparent text-tertiary hover:text-tertiary-dark font-semibold hover:font-black py-2 px-4">
            log-in
          </Link>
          <Link to='#' className="bg-transparent text-tertiary border-tertiary border-2 hover:bg-tertiary hover:text-primary font-semibold ml-2 py-2 px-4 rounded">
            sign-up
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;