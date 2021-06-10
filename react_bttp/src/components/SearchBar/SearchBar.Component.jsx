import React, { useRef, useEffect } from "react";

function SearchBar(props) {
  const placeInputRef = useRef(null);

  useEffect(() => {
    initPlaceAPI(props);
  }, [props]);

  // initialize the google place autocomplete
  const initPlaceAPI = ({ setPlace }) => {
    let autocomplete = new window.google.maps.places.Autocomplete(
      placeInputRef.current
    );
    new window.google.maps.event.addListener(
      autocomplete,
      "place_changed",
      function () {
        const place = autocomplete.getPlace();
        setPlace(place);
      }
    );
  };
  return (
    <div className="w-auto search">
      <input
        type="search"
        ref={placeInputRef}
        name="search"
        placeholder="Search a spot..."
        className="min-w-full bg-white h-10 px-5 pr-10 rounded text-sm focus:outline-none w-92"
      ></input>
      <button
        type="submit"
        className="absolute right-0 top-0 mt-3 mr-4"
      ></button>
    </div>
  );
}

export default SearchBar;
