import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useRef, useState, useEffect } from "react";

const DatePick = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker showTimeSelect className="block text-neutralB bg-neutralW font-semibold py-2 px-4 border border-tertiary w-full rounded shadow " selected={startDate} onChange={(date) => {setStartDate(date); console.log(startDate)}} />
  );
};

function SearchBar(props){
  const placeInputRef = useRef(null);
  const [place, setPlace] = useState(null);
  useEffect(() => { initPlaceAPI(props) }, [props]);
 
  // initialize the google place autocomplete
  const initPlaceAPI = (props) => {
    let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current);
    new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
      const place = autocomplete.getPlace();
      props.setPlace(place);
      setPlace({
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    });
  };
  return (
    <div className="w-auto search">
      <input type="search" ref={placeInputRef} name="search" placeholder="Search a spot..." className="min-w-full bg-white h-10 px-5 pr-10 rounded text-sm focus:outline-none w-92"></input>
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4"></button>
      {place && <div style={{ marginTop: 20, lineHeight: '25px' }}>
        <div style={{ marginBottom: 10 }}><b>Selected Place</b></div>
        <div><b>Address:</b> {place.address}</div>
        <div><b>Lat:</b> {place.lat}</div>
        <div><b>Lng:</b> {place.lng}</div>
      </div>}
    </div>
    
  );
}
function ButtonSearch(props){
  return (
    <div className="">
          <button onClick={() => {props.setAddress(props.place)} } className="shadow-2xl h-full w-full transition duration-300 transform hover:scale-90 motion-reduce:transform-none bg-tertiary hover:bg-neutralW hover:text-tertiary border-tertiary border-2  text-primary font-semibold mt-5 md:mt-0 py-2 px-4 rounded">
            Search
          </button>
    </div>
  );
}
function FilterBar(){
  return (
    <div className="lg:grid grid-cols-2 gap-4 mt-5 max-w-full ">
        <div className="flex">
            <div className="from">
                <button className=" bg-secondary text-neutralB w-20 font-semibold py-2 px-4 border border-tertiary rounded shadow">
                  From
                </button>
            </div>
            <div className="from ml-4 w-full">
                <DatePick />
            </div>
        </div>
        <div className="flex mt-5 lg:mt-0">
            <div className="from">
                <button className="bg-secondary text-neutralB w-20 font-semibold py-2 px-4 border border-tertiary rounded shadow">
                  To
                </button>
            </div>
            <div className="from ml-4 w-full">
                <DatePick  />
            </div>
        </div>
    </div>
  )
}
function FilterSearch(props) {
  const [place, setPlace] = useState(null);

  return (
    <div className="mb-8 bg-gray-200 p-5 lg:p-10 rounded max-w-full border-2 border-tertiary">
      <div className="md:grid grid-cols-6 gap-5 lg:gap-10">
        <div className="col-span-5 flex flex-col">
            <SearchBar setPlace={setPlace}/>
            <FilterBar />
        </div>
        <ButtonSearch className="col-span-5" setAddress={props.setAddressPlaceSelected} place={place}/>
      </div>
    </div>
  );
}

export default FilterSearch;
