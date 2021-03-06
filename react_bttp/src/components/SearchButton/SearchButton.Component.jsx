import React from "react";

function SearchButton({
  isSearchPic,
  setAddress,
  date,
  place,
  setDatePicked,
  setAlbums,
}) {
  return (
    <div>
      <button
        onClick={() => {
          // update variable from App.js to give the address selected
          setAddress(place);
          // Shallow copy of date object to force rerendering because original passed object comes from useRef()
          const dateCopy = Object.assign({}, date.current);
          setDatePicked(dateCopy);
          setAlbums([]);
        }}
        className={`w-full h-full transition duration-300 transform hover:scale-105 ${
          isSearchPic
            ? "bg-tertiary border-tertiary hover:text-tertiary"
            : "bg-secondary border-secondary hover:text-secondary"
        } hover:bg-neutralW border-2 text-neutralW font-semibold py-2 px-4 mt-5 md:mt-0 rounded`}
      >
        Search
      </button>
    </div>
  );
}

export default SearchButton;
