import React from "react";
import SearchBar from "../SearchBar/SearchBar.Component";
import DatePick from "../DatePick/DatePick.Component";

function FilterBar({ datePicked, setPlace, isSearchPic }) {
  // Helper function to display the right date picker depending on the picture mode
  function displayDatePick(isSearchPic) {
    if (isSearchPic) {
      return (
        <div className="lg:grid grid-cols-2 gap-4 mt-5 max-w-full ">
          <DatePick
            datePicked={datePicked}
            isSearchPic={isSearchPic}
            label="from"
          />
          <div className="mt-5 lg:mt-0">
            <DatePick
              datePicked={datePicked}
              isSearchPic={isSearchPic}
              label="to"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full mt-5">
          <DatePick datePicked={datePicked} label="taken" />
        </div>
      );
    }
  }

  return (
    <div className="col-span-5 flex flex-col">
      <SearchBar setPlace={setPlace} isSearchPic={isSearchPic} />
      {displayDatePick(isSearchPic)}
    </div>
  );
}

export default FilterBar;
