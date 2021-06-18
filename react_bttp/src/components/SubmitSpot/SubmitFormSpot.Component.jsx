import React from "react";

function SubmitFormSpot({ name, set }) {
  return (
    <>
      <input
        className="rounded mb-2 border-solid border-2 border-neutralB"
        type="text"
        placeholder={`Spot Name`}
        value={name}
        onChange={(e) => set(e.target.value)}
      />
      <button
        type="submit"
        className="mx-auto bg-secondary py-4 px-8 rounded font-semibold text-neutralW"
      >
        Save Spot
      </button>
    </>
  );
}

export default SubmitFormSpot;
