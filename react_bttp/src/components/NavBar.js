import {ReactComponent as ReactLogo} from './BTTP-logo-full-white.svg';

function NavBar() {
  return (
    <div className="bg-nav-gradient border-b-4  border-secondary">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <div className="">
          <ReactLogo className="w-52"/>
        </div> 
        <button className="bg-secondary border-2 border-neutralW text-neutralW hover:bg-neutralW hover:text-secondary hover:border-secondary font-bold py-4 px-10 rounded-full">
          upload pic
        </button>
        <div className="flex">
          <button className="bg-transparent text-tertiary border-tertiary border-2 hover:bg-tertiary hover:text-primary font-semibold py-2 px-4 rounded">
            sign-up
          </button>
          <button className="bg-transparent ml-2 text-tertiary border-tertiary border-2 hover:bg-tertiary hover:text-primary font-semibold py-2 px-4 rounded">
            log-in
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;