import React, { useState } from "react";
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
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                latitude: lat.toFixed(4),
                longitude: lng.toFixed(4),
                name: spotName,
              }),
            };
            fetch("http://localhost:5000/api/spots", requestOptions)
              .then((response) => response.json())
              .then((newSpot) => {
                console.log(newSpot);
                spotID.current = newSpot.id;
                updateSetExistingSpot();
              });
          } else {
            alert(
              "Please place a pin on the map and give a name before saving"
            );
          }
        }}
      >
        <input
          className="rounded mb-2 border-solid border-2 border-neutralB"
          type="text"
          placeholder="spot name"
          value={spotName}
          onChange={(e) => setSpotName(e.target.value)}
        />
        <button
          type="submit"
          className="mx-auto bg-secondary py-4 px-8 rounded font-semibold text-neutralW"
        >
          Save Spot
        </button>
      </form>
      {/* <FaArrowCircleUp size="3em" className="text-secondary mt-2 mx-auto animate-pulse"/> */}
    </div>
  );
}

export default SubmitSpot;