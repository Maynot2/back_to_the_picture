import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useRef, useState, useEffect } from "react";

const DatePick = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker showTimeSelect className=" text-black  font-mono bg-white  font-semibold py-2 px-4 border  border-yellow-400 rounded shadow " selected={startDate} onChange={(date) => {setStartDate(date); console.log(startDate)}} />
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
      let place = autocomplete.getPlace();
      props.setAdress(place);
      setPlace({
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    });
  };
  return (
    <div className="font-mono w-auto ml-32 search">
      <input type="search" ref={placeInputRef} name="serch" placeholder="Search a spot..." class="min-w-full bg-white h-10 px-5 pr-10 rounded text-sm focus:outline-none w-92"></input>
      <button type="submit" class="absolute right-0 top-0 mt-3 mr-4"></button>
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
    <div className="mt-10 ml-10 h-auto md:min-w-10">
          <button onClick={() => { console.log(props.placeSelected)} } className="shadow-2xl h-full w-44 transition duration-300 transform hover:scale-90 motion-reduce:transform-none font-mono bg-tertiary hover:bg-neutralW hover:text-tertiary border-tertiary border-2  text-primary font-semibold py-2 px-4 rounded">
            Search
          </button>
    </div>
  );
}
function FilterBar(){
  return (
    <div className="flex flex-row flex-wrap  mt-5 items-center  max-w-full ">
            <div className="from ml-32">
                <button className=" bg-secondary text-black w-20 font-mono bg-white  font-semibold py-2 px-4 border  border-yellow-400 rounded shadow">
                  From
                </button>
            </div>
            <div className="from ml-2">
              <div className="">
                <DatePick  />
              </div>
            </div>
            <div className="from ml-10">
                <button className=" bg-secondary text-black w-20 font-mono bg-white  font-semibold py-2 px-4 border  border-yellow-400 rounded shadow">
                  To
                </button>
            </div>
            <div className="from ml-2">
              <div className="">
                <DatePick  />
              </div>
            </div>
    </div>
  )
}
function FilterSearch(props) {
  return (
    <div className="m-20 bg-gray-200 pb-10 rounded max-w-full">
      <div className="flex">
        <div className="flex mt-10 flex-col">
            <SearchBar setAdress={props.setAdressPlaceSelected}/>
            <FilterBar />
        </div>
          <ButtonSearch placeSelected={props.adressPlaceSelected}/>
      </div>
    </div>
  );
}

export default FilterSearch;
