import NavBar from "./components/NavBar";
import FilterSearch from "./components/FilterSearch/FilterSearch.Component";
import React, { useState, useRef } from "react";
import GMap from "./components/GoogleMap";
import ModeChoice from "./components/ModeChoice/ModeChoice.Component";
import { Link } from "react-router-dom";

function App() {
  // Address selected by the user send/update by FilterSearch Component (ButtonSearch OnClick())
  const [addressPlaceSelected, setAddressPlaceSelected] = useState(null);
  // Two date selected by the user send/update by FilterSearch Component (ButtonSearch OnClick())
  const today = new Date()
  const dateObject = {
    from: new Date(new Date().setDate(today.getDate() - 30)),
    to: today
  }

  const date = useRef(dateObject);
  const [datePicked, setDatePicked] = useState(dateObject);

  // Decides if user in is in search or upload picture mode
  const [isSearchPic, setIsSearchPic] = useState(true); // defaults to search mode
  const [isUploadPic, setIsUploadPic] = useState(false);

  const [albums, setAlbums] = useState([]);

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
          <div
            className={`container bg-neutralW mx-auto p-4 md:p-8 border-2 ${
              isSearchPic ? "border-tertiary" : "border-secondary"
            } rounded font-mono`}
          >
            <ModeChoice
              updateSetSearchPic={updateSetSearchPic}
              updateSetIsUploadPic={updateSetIsUploadPic}
              isSearchPic={isSearchPic}
              isUploadPic={isUploadPic}
            />
            <FilterSearch
              isSearchPic={isSearchPic}
              date={date}
              datePicked={datePicked}
              setDatePicked={setDatePicked}
              setAddressPlaceSelected={setAddressPlaceSelected}
              addressPlaceSelected={addressPlaceSelected}
            />
            <div className="lg:grid grid-cols-3 gap-8">
              <div
                className={`map col-span-2 bg-secondary rounded border-2 ${
                  isSearchPic ? "border-tertiary" : "border-secondary"
                }`}
              >
                <GMap place={addressPlaceSelected} setAddressPlaceSelected={setAddressPlaceSelected} datePicked={datePicked} setAlbums={setAlbums}/>
              </div>
              <div className={isSearchPic ? "bg-tertiary" : "bg-secondary"}>
                {albums.map((album) => {
                  return (
                    <Link to={`album/${album.id}`} >
                      <div>{album.name}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
