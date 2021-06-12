import NavBar from "./components/NavBar";
import FilterSearch from "./components/FilterSearch/FilterSearch.Component";
import React, { useState, useRef } from "react";
import GMap from "./components/GoogleMap";
import ModeChoice from "./components/ModeChoice/ModeChoice.Component";
import { Link } from "react-router-dom"

function App() {
  // Address selected by the user send/update by FilterSearch Component (ButtonSearch OnClick())
  const [addressPlaceSelected, setAddressPlaceSelected] = useState(null);
  // Two date selected by the user send/update by FilterSearch Component (ButtonSearch OnClick())
  const datePicked = useRef({});

  // Decides if user in is in search or upload picture mode
  const [isSearchPic, setIsSearchPic] = useState(true); // defaults to search mode
  const [isUploadPic, setIsUploadPic] = useState(false);

  // Helper function to change mode
  function updateSetSearchPic() {
    if (!isSearchPic) {
      setIsSearchPic(true);
    }
    setIsUploadPic(false);
  }

  // Helper function to change mode
  function updateSetIsUploadPic() {
    if (!isUploadPic) {
      setIsUploadPic(true);
    }
    setIsSearchPic(false);
  }

  return (
    <>
      <div className="bg-primary">
        <NavBar />
        <main className="px-4 mt-4 sm:mt-8">
          <div className={`container bg-neutralW mx-auto p-4 md:p-8 border-2 ${isSearchPic ? "border-tertiary" : "border-secondary"} rounded font-mono`}>
            <ModeChoice
              updateSetSearchPic={updateSetSearchPic}
              updateSetIsUploadPic={updateSetIsUploadPic}
              isSearchPic={isSearchPic}
              isUploadPic={isUploadPic}
            />
            <FilterSearch
              isSearchPic={isSearchPic}
              datePicked={datePicked}
              setAddressPlaceSelected={setAddressPlaceSelected}
              addressPlaceSelected={addressPlaceSelected}
            />
            <div className="lg:grid grid-cols-3 gap-8">
              <div className={`map col-span-2 bg-secondary rounded border-2 ${isSearchPic ? "border-tertiary" : "border-secondary"}`}>
                <GMap place={addressPlaceSelected} datePicked={datePicked} />
              </div>
              <div className={isSearchPic ? "bg-tertiary" : "bg-secondary"}>
                <Link to="/albums">
                  albums
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;