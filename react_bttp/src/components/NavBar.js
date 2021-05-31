import {ReactComponent as ReactLogo} from './BTTP-logo-full-white.svg';

function NavBar() {
  return (
    <div className="bg-primary">
      <nav className="p-4">
        <ReactLogo className="w-52"/>
      </nav> 
    </div>
  );
}

export default NavBar;