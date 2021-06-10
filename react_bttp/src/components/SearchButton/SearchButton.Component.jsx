import React from "react";

function SearchButton({ setAddress, datePicked, dateList, place }) {
  return (
    <div>
      <button
        onClick={() => {
          // update variable from App.js to give the address selected
          setAddress(place);
          // update variable from App.js to give the two date selected
          datePicked.current = dateList.current;
          console.log(datePicked.current);
        }}
        className="shadow-2xl w-full h-full transition duration-300 transform hover:scale-90 motion-reduce:transform-none font-mono bg-tertiary hover:bg-neutralW hover:text-tertiary border-tertiary border-2  text-primary font-semibold py-2 px-4 mt-5 md:mt-0 rounded"
      >
        Search
      </button>
    </div>
  );
}

export default SearchButton;
