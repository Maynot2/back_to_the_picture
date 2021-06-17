import NavBar from "./components/NavBar";
import FilterSearch from "./components/FilterSearch/FilterSearch.Component";
import React, { useState, useRef } from "react";
import GMap from "./components/GoogleMap";
import ModeChoice from "./components/ModeChoice/ModeChoice.Component";
import ViewAlbums from "./components/viewAlbums/viewAlbums.Component";
import UploadPictures from "./components/UploadPictures/UploadPictures.Component";
import SubmitSpot from "./components/SubmitSpot/SubmitSpot.Component";

function App() {
  // Address selected by the user send/update by FilterSearch Component (ButtonSearch OnClick())
  const [addressPlaceSelected, setAddressPlaceSelected] = useState(null);
  // Two date selected by the user send/update by FilterSearch Component (ButtonSearch OnClick())
  const today = new Date();
  const dateObject = {
    from: new Date(new Date().setDate(today.getDate() - 30)),
    to: today,
    taken: today,
  };

  const date = useRef(dateObject);
  const [datePicked, setDatePicked] = useState(dateObject);

  // Decides if user in is in search or upload picture mode
  const [isSearchPic, setIsSearchPic] = useState(true); // defaults to search mode
  const [isUploadPic, setIsUploadPic] = useState(false);

  // Helper function to change Picture mode
  function updateSetSearchPic() {
    if (!isSearchPic) {
      setIsSearchPic(true);
    }
    setIsUploadPic(false);
  }

  // Helper function to change Picture mode
  function updateSetIsUploadPic() {
    if (!isUploadPic) {
      setIsUploadPic(true);
    }
    setIsSearchPic(false);
  }

  // Initializes albums for searchPic state
  const [albums, setAlbums] = useState([]);

  // On upload 2 possibilities are given create new spot or use existing
  const [isExistingSpot, setIsExistingSpot] = useState(null);
  const [isNewSpot, setIsNewSpot] = useState(null);

  // Helper function to change Spot mode
  function updateSetExistingSpot() {
    setIsExistingSpot(true);
    setIsNewSpot(false);
  }

  // Helper function to change Spot mode
  function updateSetNewSpot() {
    setIsNewSpot(true);
    setIsExistingSpot(false);
  }

  // Google Map spot-marker object created in upload mode
  const spotCreated = useRef(null);

  // Spot ID for newly created spot in upload mode
  const spotID = useRef(null);

  // Spot id of the selected marker in upload mode
  const spotSelectedID = useRef(null)

  // Image upload states
  const [imgUrl, setImgUrl] = useState("");
  const [imgUrlSuccess, setImgUrlSuccess] = useState(false);


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
              setAlbums={setAlbums}
            />
            <FilterSearch
              isSearchPic={isSearchPic}
              date={date}
              datePicked={datePicked}
              setDatePicked={setDatePicked}
              setAddressPlaceSelected={setAddressPlaceSelected}
              addressPlaceSelected={addressPlaceSelected}
              setAlbums={setAlbums}
            />
            <div className="lg:grid grid-cols-3 gap-8">
              <div
                className={`map col-span-2 bg-secondary rounded border-2 ${
                  isSearchPic ? "border-tertiary" : "border-secondary"
                }`}
              >
                <div className="absolute-btn-wrapper">
                  <SubmitSpot
                    isNewSpot={isNewSpot}
                    spotCreated={spotCreated}
                    spotID={spotID}
                    updateSetExistingSpot={updateSetExistingSpot}
                  />
                  <GMap
                    place={addressPlaceSelected}
                    setAddressPlaceSelected={setAddressPlaceSelected}
                    datePicked={datePicked}
                    setAlbums={setAlbums}
                    isSearchPic={isSearchPic}
                    isExistingSpot={isExistingSpot}
                    isNewSpot={isNewSpot}
                    spotCreated={spotCreated}
                    isUploadPic={isUploadPic}
                    spotID={spotID}
                    spotSelectedID={spotSelectedID}
                  />
                </div>
              </div>
              {isSearchPic ? (
                <ViewAlbums albums={albums} />
              ) : (
                <UploadPictures
                  setIsExistingSpot={setIsExistingSpot}
                  setIsNewSpot={setIsNewSpot}
                  isExistingSpot={isExistingSpot}
                  spotID={spotID}
                  spotSelectedID={spotSelectedID}
                  datePicked={datePicked}
                  isNewSpot={isNewSpot}
                  imgUrl={imgUrl}
                  setImgUrl={setImgUrl}
                  imgUrlSuccess={imgUrlSuccess}
                  setImgUrlSuccess={setImgUrlSuccess}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
