import React, { useState, useRef } from "react";
import SubmitForm from "../SubmitForm/SubmitForm.Component";
import Uploader from "./Uploader.Component";

function UploadMode({ setIsNewSpot, setIsExistingSpot, isExistingSpot }) {
  return (
    <div className={"bg-secondary flex flex-col p-4 content-between"}>
      <button
        onClick={() => {
          setIsExistingSpot(true);
          setIsNewSpot(false);
        }}
        className={`${
          isExistingSpot === null || !isExistingSpot
            ? "border-solid border-4 border-neutralW scale-90"
            : "scale-100 bg-primary"
        } text-neutralW transform transition duration-300 hover:scale-100 text-center font-semibold w-full h-full rounded mb-4`}
      >
        Use existing Spot
      </button>
      <button
        onClick={() => {
          setIsNewSpot(true);
          setIsExistingSpot(false);
        }}
        className={`${
          isExistingSpot === null || isExistingSpot
            ? "border-solid border-4 border-neutralW scale-90"
            : "scale-100 bg-primary"
        } text-neutralW transform transition duration-300 hover:scale-100 text-center font-semibold w-full h-full rounded`}
      >
        Create new Spot
      </button>
    </div>
  );
}

function AddPictures({
  setIsNewSpot,
  setIsExistingSpot,
  spotSelectedID,
  datePicked,
  imgUrl,
  imgUrlSuccess,
  setImgUrl,
  setImgUrlSuccess,
}) {
  const [albumName, setAlbumName] = useState(null);
  let albumIdCreated = useRef(null);
  return (
    <>
      <div className={"bg-secondary flex flex-col p-4 content-between"}>
        <button
          className="bg-primary text-neutralW"
          onClick={() => {
            setIsNewSpot(null);
            setIsExistingSpot(null);
          }}
        >
          Back
        </button>
        Create album and add picture
        <div>
          {spotSelectedID.current
            ? `Spot ${spotSelectedID.current} selected`
            : "No spot selected"}
          <Uploader
            url={imgUrl}
            success={imgUrlSuccess}
            setSuccess={setImgUrlSuccess}
            setUrl={setImgUrl}
          />
          <form
            className="flex flex-col bg-gray-500 rounded p-2 border-solid border-2 border-neutralB"
            onSubmit={(e) => {
              e.preventDefault();
              const dateTakenAtAlbum = datePicked.taken;
              if (!spotSelectedID.current) {
                alert("Please select a spot to create an album");
              } else {
                const requestOptions = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: albumName,
                    userId: 1,
                    spotId: spotSelectedID.current,
                    takenAt: dateTakenAtAlbum.toISOString().split("T")[0],
                  }),
                };
                // Create album
                fetch("http://localhost:5000/api/albums", requestOptions)
                  .then((response) => {
                    return response.json();
                  })
                  .then((res) => {
                    albumIdCreated.current = res.album.id;
                  });
                const options = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    albumId: albumIdCreated.current,
                    url: imgUrl,
                  }),
                };
                // Add picture to album created
                fetch(
                  "http://localhost:5000/api/pictures/upload",
                  options
                ).then((response) => {
                  return response.json();
                });
                setIsNewSpot(null);
                setIsExistingSpot(null);
              }
            }}
          >
            <SubmitForm name={albumName} set={setAlbumName} label={"album"} />
          </form>
        </div>
      </div>
    </>
  );
}
function UploadPictures({
  setIsExistingSpot,
  setIsNewSpot,
  isExistingSpot,
  spotID,
  spotSelectedID,
  datePicked,
  imgUrl,
  imgUrlSuccess,
  setImgUrl,
  setImgUrlSuccess,
}) {
  return (
    <>
      {isExistingSpot || (isExistingSpot && spotID.current) ? (
        <AddPictures
          datePicked={datePicked}
          spotSelectedID={spotSelectedID}
          setIsExistingSpot={setIsExistingSpot}
          setIsNewSpot={setIsNewSpot}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          setImgUrlSuccess={setImgUrlSuccess}
          imgUrlSuccess={imgUrlSuccess}
        />
      ) : (
        <UploadMode
          setIsExistingSpot={setIsExistingSpot}
          setIsNewSpot={setIsNewSpot}
          isExistingSpot={isExistingSpot}
        />
      )}
    </>
  );
}

export default UploadPictures;
