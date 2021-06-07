import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useRef, useState, useEffect } from "react";

function DatePick (props) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker className=" text-black  font-mono bg-white  font-semibold py-2 px-4 border  border-yellow-400 rounded shadow " selected={startDate} onChange={(date) => {
      setStartDate(date);
      // check if array of dateList is full (two dates has already been saved)
      if (props.dateList.current.length >= 2){
        props.dateList.current.length = [];
      }
      props.dateList.current.push(date)
    }} />
  );
};

function SearchBar(props) {
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
    <div>
          <button onClick={() => {
              // update variable from App.js to give the address selected
              props.setAddress(props.place);
              // update variable from App.js to give the two date selected
              props.datePicked.current = props.dateList.current;
              console.log(props.datePicked.current);
            }}
            className="shadow-2xl w-full h-full transition duration-300 transform hover:scale-90 motion-reduce:transform-none font-mono bg-tertiary hover:bg-neutralW hover:text-tertiary border-tertiary border-2  text-primary font-semibold py-2 px-4 mt-5 md:mt-0 rounded">
            Search
          </button>
    </div>
  );
}

function FilterBar(props){
  return (
    <div className="lg:grid grid-cols-2 gap-4 mt-5 max-w-full ">
        <div className="flex">
            <div className="from">
                <button className=" bg-secondary text-neutralB w-20 font-semibold py-2 px-4 border border-tertiary rounded shadow">
                  From
                </button>
            </div>
            <div className="from ml-4 w-full">
                <DatePick dateList={props.dateList} />
            </div>
        </div>
        <div className="flex mt-5 lg:mt-0">
            <div className="from">
                <button className="bg-secondary text-neutralB w-20 font-semibold py-2 px-4 border border-tertiary rounded shadow">
                  To
                </button>
            </div>
            <div className="from ml-4 w-full">
                <DatePick dateList={props.dateList} />
            </div>
        </div>
    </div>
  )
}

function FilterSearch(props) {
  // Store the place selected by the user
  const [place, setPlace] = useState(null);
  // Store in an array the two date selected by the user
  const dateList = useRef([]);

  return (
    <div className="mb-8 bg-gray-200 p-5 lg:p-10 rounded max-w-full border-2 border-tertiary">
      <div className="md:grid grid-cols-6 gap-5 lg:gap-10">
        <div className="col-span-5 flex flex-col">
            <SearchBar setPlace={setPlace} />
            <FilterBar dateList={dateList} />
        </div>
        <ButtonSearch className="col-span-5" datePicked={props.datePicked} dateList={dateList} setAddress={props.setAddressPlaceSelected} place={place}/>
      </div>
    </div>
  );
}

export default FilterSearch;
