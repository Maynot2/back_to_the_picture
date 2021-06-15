import React from "react";

function UploadPictures({
  updateSetExistingSpot,
  updateSetNewSpot,
  isExistingSpot,
}) {
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

export default UploadPictures;
