import React from "react";
import SearchBar from "../SearchBar/SearchBar.Component";
import DatePick from "../DatePick/DatePick.Component";

function FilterBar({ date, datePicked, setPlace, isSearchPic }) {
  // Helper function to display the right date picker depending on the picture mode
  function displayDatePick(isSearchPic) {
    if (isSearchPic) {
      return (
        <div className="lg:grid grid-cols-2 gap-4 mt-5 max-w-full ">
          <DatePick
            date={date}
            isSearchPic={isSearchPic}
            label="from"
            datePicked={datePicked}
          />
          <div className="mt-5 lg:mt-0">
            <DatePick
              date={date}
              isSearchPic={isSearchPic}
              label="to"
              datePicked={datePicked}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full mt-5">
          <DatePick date={date} label="taken" datePicked={datePicked} />
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
