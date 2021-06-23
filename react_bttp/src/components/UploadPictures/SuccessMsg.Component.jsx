import React from "react";

function SuccessMsg({ url }) {
  return (
    <div>
      <h3 style={{ color: "green" }}>SUCCESSFUL UPLOAD</h3>
      <a href={url[0]}>Access the file here</a>
      <br />
    </div>
  );
}

export default SuccessMsg;
