import React from "react";

function SubmitForm({ name, label, set, isNewAlbum }) {
  return (
    <>
      {isNewAlbum ? (
        <input
          className="rounded mb-2 border-solid border-2 border-neutralB"
          type="text"
          placeholder={`${label.replace(/^\w/, (c) => c.toUpperCase())} Name`}
          value={name}
          onChange={(e) => set(e.target.value)}
        />
      ) : (
        ""
      )}
      <button
        type="submit"
        className="mx-auto bg-secondary py-4 px-8 rounded font-semibold text-neutralW"
      >
        {`Save ${label.replace(/^\w/, (c) => c.toUpperCase())}`}
      </button>
    </>
  );
}

export default SubmitForm;
