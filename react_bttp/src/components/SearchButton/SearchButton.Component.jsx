import React from "react";

function SearchButton({ isSearchPic, setAddress, datePicked, place }) {
  return (
    <div>
      <button
        onClick={() => {
          // update variable from App.js to give the address selected
          setAddress(place);
          // update variable from App.js to give the two date selected
          console.log(datePicked.current);
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
