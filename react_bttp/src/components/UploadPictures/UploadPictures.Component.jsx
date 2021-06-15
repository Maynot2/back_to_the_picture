import React, { useState, useRef } from "react";


function UploadMode({
  updateSetExistingSpot,
  updateSetNewSpot,
  isExistingSpot,}){
  return (
      <div className={"bg-secondary flex flex-col p-4 content-between"}>
        <button
          onClick={updateSetExistingSpot}
          className={`${
            isExistingSpot
              ? "scale-100 bg-primary"
              : "border-solid border-4 border-neutralW"
          } text-neutralW transform scale-90 transition duration-300 hover:scale-100 text-center font-semibold w-full h-full rounded mb-4`}
        >
          Use existing Spot
        </button>
        <button
          onClick={updateSetNewSpot}
          className={`${
            !isExistingSpot
              ? "scale-100 bg-primary"
              : "border-solid border-4 border-neutralW"
          } text-neutralW transform scale-90 transition duration-300 hover:scale-100 text-center font-semibold w-full h-full rounded`}
        >
          Create new Spot
        </button>
      </div>
    );

  }

function AddPictures({ updateSetNewSpot, spotSelectedID, datePicked }){
  const [albumName, setAlbumName] = useState(null)
  let albumIdCreated = useRef(null);
  return (
    <>
      <div className={"bg-secondary flex flex-col p-4 content-between"}>
        <button
          className="bg-primary text-neutralW"
          onClick={updateSetNewSpot}>
          Back
        </button>
        Create album and add picture
        <div>
          {spotSelectedID.current ? `Spot ${spotSelectedID.current} selected`: 'No spot selected'}
            <form
            className="flex flex-col bg-gray-500 rounded p-2 border-solid border-2 border-neutralB"
            onSubmit={(e) => {
              e.preventDefault();
              const dateTakenAtAlbum = datePicked.taken;
              if(!spotSelectedID.current) {
                alert('Please select a spot to create an album')
              } else {
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: albumName,
                      userId: 1,
                      spotId: spotSelectedID.current,
                      takenAt: dateTakenAtAlbum.toISOString().split("T")[0]
                    }),
                };
                // Create album
                 fetch("http://localhost:5000/api/albums", requestOptions)
                  .then((response) => { return response.json()})
                  .then((res) => {albumIdCreated.current = res.album.id})
                const options = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      albumId: albumIdCreated.current,
                      url: 'https://images.unsplash.com/photo-1622601803978-1addc5aa109a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80'
                    }),
                };
                // Add picture to album created 
                 fetch("http://localhost:5000/api/pictures/upload", options)
                  .then((response) => { return response.json()})
                  updateSetNewSpot()
              }
            }}>
            <input
              className="rounded mb-2 border-solid border-2 border-neutralB"
              type="text"
              placeholder="Album Name"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
            />
            <button
              type="submit"
              className="mx-auto bg-secondary py-4 px-8 rounded font-semibold text-neutralW"
            >
              Save Spot
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
function UploadPictures({
  updateSetExistingSpot,
  updateSetNewSpot,
  isExistingSpot,
  spotID,
  spotSelectedID,
  datePicked
}) {
  return (
    <>
      {isExistingSpot || isExistingSpot && spotID.current ? <AddPictures datePicked={datePicked} spotSelectedID={spotSelectedID} updateSetNewSpot={updateSetNewSpot}/> : <UploadMode updateSetExistingSpot={updateSetExistingSpot} updateSetNewSpot={updateSetNewSpot} isExistingSpot={isExistingSpot}/>}
    </>
  );
}

export default UploadPictures;
