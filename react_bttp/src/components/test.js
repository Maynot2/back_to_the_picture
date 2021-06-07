import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

/***
 *                   <input class=" font-mono w-20 text-center m-10 border border-yellow-400 rounded  py-2 px-3 text-gray-700  " id="from"placeholder="From"></input>


<button className=" text-black w-20 font-mono bg-white  font-semibold py-2 px-4 border  border-yellow-400 rounded shadow">
                  From
                </button>
 */

const DatePick = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker className=" text-black  font-mono bg-white  font-semibold py-2 px-4 border  border-yellow-400 rounded shadow " selected={startDate} onChange={(date) => setStartDate(date)} />
  );
};

function SearchBar(){
  return (
    <div className="font-mono w-auto ml-24  mr-64 p-10 search">
              <input type="search" name="serch" placeholder="Search a spot..." class="min-w-full bg-white h-10 px-5 pr-10 rounded text-sm focus:outline-none w-92"></input>
              <button type="submit" class="absolute right-0 top-0 mt-3 mr-4"></button>
    </div>
  );
}

function FilterBar(){
  return (

    <div className="flex flex-row flex-wrap  items-center  max-w-full ">
            <div className="from ml-32">
                <button className=" bg-yellow-500 text-black w-20 font-mono bg-white  font-semibold py-2 px-4 border  border-yellow-400 rounded shadow">
                  From
                </button>
            </div>
            <div className="from ml-2">
              {/* <label className="font-mono block text-gray-700 text-sm font-bold " for="username">
                From
              </label> */}
              <div className="">
                <DatePick  />
              </div>
            </div>
            <div className="from ml-10">
                <button className=" bg-yellow-500 text-black w-20 font-mono bg-white  font-semibold py-2 px-4 border  border-yellow-400 rounded shadow">
                  To
                </button>
            </div>
            <div className="from ml-2">
              {/* <label className="font-mono block text-gray-700 text-sm font-bold " for="username">
                To
              </label> */}
              <div className="">
                <DatePick  />
              </div>
            </div>
            <div>
              <button className="ml-20 font-mono bg-white hover:bg-orange-800 text-orange-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Search
              </button>
            </div>

    </div>
  )
}
// flex flex-row flex-wrap  items-center m-20 h-20 bg-gray-200 rounded max-w-full
function FilterSearch() {
  return (
    <div className="m-20 bg-gray-200 pb-10 rounded max-w-full">
        <SearchBar />
        <FilterBar />

    </div>
  );
}

export default FilterSearch;
