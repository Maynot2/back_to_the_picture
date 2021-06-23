import React from "react";

function SubmitFormAlbum({ name, set, isNewAlbum }) {
  return (
    <>
      {isNewAlbum ? (
        <input
          className="rounded mb-2 border-solid border-2 border-neutralB"
          type="text"
          placeholder="Album Name"
          value={name}
          onChange={(e) => {
            console.log("target:", e.target.value);
            set(e.target.value)}
          }
        />
      ) : (
        ""
      )}
      <button
        type="submit"
        className="mx-auto bg-secondary py-4 px-8 rounded font-semibold text-neutralW"
      >
        Save Album
      </button>
    </>
  );
}

export default SubmitFormAlbum;
