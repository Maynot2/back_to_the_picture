import React, { useState } from "react";
import SearchButton from "../SearchButton/SearchButton.Component";
import FilterBar from "../FilterBar/FilterBar.Component";
import "react-datepicker/dist/react-datepicker.css";

function FilterSearch({
  setAddressPlaceSelected,
  isSearchPic,
  date,
  datePicked,
  setDatePicked,
  setAlbums,
}) {
  // Store the place selected by the user
  const [place, setPlace] = useState(null);
  // Store in an array the two date selected by the user
  // const dateList = useRef({});

  return (
    <div
      className={`outer mb-8 bg-primary p-5 lg:p-10 rounded max-w-full border-2 ${
        isSearchPic ? "border-tertiary" : "border-secondary"
      }`}
    >
      <div className="md:grid grid-cols-6 gap-5 lg:gap-10">
        <FilterBar
          isSearchPic={isSearchPic}
          date={date}
          setPlace={setPlace}
          datePicked={datePicked}
        />
        <SearchButton
          isSearchPic={isSearchPic}
          date={date}
          setAddress={setAddressPlaceSelected}
          place={place}
          setDatePicked={setDatePicked}
          setAlbums={setAlbums}
        />
      </div>
    </div>
  );
}

export default FilterSearch;
