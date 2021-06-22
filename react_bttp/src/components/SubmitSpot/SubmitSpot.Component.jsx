import React, { useState } from "react";
import SubmitFormSpot from "./SubmitFormSpot.Component";
// import { FaArrowCircleUp } from "react-icons/fa";

function SubmitSpot({ isNewSpot, spotCreated, spotID, updateSetExistingSpot }) {
  const [spotName, setSpotName] = useState("");

  return (
    <div className={`${isNewSpot ? "horizontal-center-btn z-10" : "hidden"}`}>
      <form
        className="flex flex-col bg-gray-500 rounded p-2 border-solid border-2 border-neutralB"
        onSubmit={(e) => {
          e.preventDefault();
          if (spotCreated.current && spotName) {
            const lat = spotCreated.current.internalPosition.lat();
            const lng = spotCreated.current.internalPosition.lng();
            console.log("lat marker :", Number(lat.toFixed(4)));
            console.log("lng marker :", lng);

            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                latitude: Number(lat.toFixed(4)),
                longitude: Number(lng.toFixed(4)),
                name: spotName,
              }),
            };
            fetch(
              `http://${
                process.env.NODE_ENV === "production" ? "" : "localhost:5000/"
              }api/spots`,
              requestOptions
            )
              .then((response) => response.json())
              .then((newSpot) => {
                spotCreated.current = null;
                spotID.current = newSpot.spot.id;
                updateSetExistingSpot();
              });
          } else {
            alert(
              "Please place a pin on the map and give a name before saving"
            );
          }
        }}
      >
        <SubmitFormSpot name={spotName} set={setSpotName} />
      </form>
      {/* <FaArrowCircleUp size="3em" className="text-secondary mt-2 mx-auto animate-pulse"/> */}
    </div>
  );
}

export default SubmitSpot;
