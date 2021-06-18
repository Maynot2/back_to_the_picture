import React, { useState, useRef } from "react";
import SubmitFormAlbum from "./SubmitFormAlbum.Component";
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
  spotSelectedObject,
  datePicked,
  imgUrl,
  imgUrlSuccess,
  setImgUrlSuccess,
  albums
}) {
  const [albumName, setAlbumName] = useState(null);
  let albumIdCreated = useRef(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isNewAlbum, setIsNewAlbum] = useState(false);
  const [isAddPicture, setIsAddPicture] = useState(true);

  return (
    <>
      <div className={"bg-secondary flex flex-col p-4 content-between"}>
        <div className="flex mb-4">
          <button
            className={`${
              isAddPicture
                ? "scale-100 bg-primary text-neutralW shadow-xl"
                : "border-solid border-4 border-neutralW scale-90 text-neutralW hover:scale-100 hover:shadow-xl"
            } flex-1 p-2 text-center font-semibold rounded mr-2 transform transition duration-300`}
            onClick={() => {
              setIsNewAlbum(false);
              setIsAddPicture(true);
            }}
          >
            Add Picture to Album
          </button>
          <button
            className={`${
              isNewAlbum
                ? "scale-100 bg-primary text-neutralW shadow-xl"
                : "border-solid border-4 border-neutralW scale-90 text-neutralW hover:scale-100 hover:shadow-xl"
            } flex-1 p-2 text-center font-semibold rounded mr-2 transform transition duration-300`}
            onClick={() => {
              setIsNewAlbum(true);
              setIsAddPicture(false);
            }}
          >
            Create Album
          </button>
          <button
            className="flex-1 p-2 bg-neutralW border-solid border-4 border-primary text-primary text-center font-semibold rounded-full mr-2"
            onClick={() => {
              setIsNewSpot(null);
              setIsExistingSpot(null);
            }}
          >
            Back
          </button>
        </div>
        <div>
          <div className="mb-4">
            {spotSelectedObject.current["id"] !== undefined
              ? `${spotSelectedObject.current["name"]} selected`
              : "No spot selected"}
          </div>
          <select
            className={`${isNewAlbum ? "hidden" : "visible p-4 rounded-full"}`}
            name="albums"
            id="album-select"
            value={selectedAlbum}
            onChange={(e) => {
              setSelectedAlbum(e.target.value);
            }}
          >
            <option disabled selected value>
              {" "}
              -- select an album --{" "}
            </option>
            {albums.map((album) => {
              return <option value={album.id}>{album.name}</option>;
            })}
          </select>
          <Uploader
            url={imgUrl}
            success={imgUrlSuccess}
            setSuccess={setImgUrlSuccess}
          />
          <form
            className="flex flex-col bg-primary rounded p-2 border-solid border-2 border-neutralB"
            onSubmit={(e) => {
              e.preventDefault();
              const dateTakenAtAlbum = datePicked.taken;
              if (spotSelectedObject.current["id"] == undefined) {
                alert("Please select a spot to create an album");
              } else {
                /// Create album and add image only if the user has uploaded the picture
                if (imgUrlSuccess) {
                  // Check an album name has been send
                  if (albumName && isNewAlbum) {
                    console.log("rentre pas stp!");
                    const requestOptions = {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: albumName,
                        userId: 1,
                        spotId: spotSelectedObject.current["id"],
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
                        imgUrl.current.map((url) => {
                          const options = {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              albumId: albumIdCreated.current,
                              url: url,
                            }),
                          };
                          
                            // Add picture to album created
                            fetch(
                              "http://localhost:5000/api/pictures/upload",
                              options
                            ).then((response) => {
                              return response.json();
                            }).catch((err) => {
                              alert(err)
                            });
                            setIsNewSpot(null);
                            setIsExistingSpot(null);
                            // setImgUrl("");
                            setImgUrlSuccess(false);
                            imgUrl.current = [];
                          });
                        });
                  } else if (isAddPicture) {
                    console.log("rentre stp!!!");
                    imgUrl.current.map((url) => {
                      const options = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          albumId: selectedAlbum,
                          url: url,
                        }),
                      };
                      
                        // Add picture to album created
                        fetch(
                          "http://localhost:5000/api/pictures/upload",
                          options
                        ).then((response) => {
                          return response.json();
                        }).catch((err) => {
                          alert(err)
                        });
                        
                    });
                    setIsNewSpot(null);
                    setIsExistingSpot(null);
                    imgUrl.current = [];
                    // setImgUrl("");
                    setImgUrlSuccess(false);
                  } else {
                    alert("please enter an album name");
                  }
                } else {
                  alert("please upload a picture before");
                }
              }
            }}
          >
            <SubmitFormAlbum
              name={albumName}
              set={setAlbumName}
              isNewAlbum={isNewAlbum}
            />
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
  spotSelectedObject,
  datePicked,
  imgUrl,
  imgUrlSuccess,
  setImgUrlSuccess,
  albums
}) {
  return (
    <>
      {isExistingSpot || (isExistingSpot && spotID.current) ? (
        <AddPictures
          datePicked={datePicked}
          spotSelectedObject={spotSelectedObject}
          setIsExistingSpot={setIsExistingSpot}
          setIsNewSpot={setIsNewSpot}
          imgUrl={imgUrl}
          setImgUrlSuccess={setImgUrlSuccess}
          imgUrlSuccess={imgUrlSuccess}
          albums={albums}
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
