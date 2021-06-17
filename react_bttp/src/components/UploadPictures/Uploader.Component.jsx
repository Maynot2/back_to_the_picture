import React, { useState } from "react";
import SuccessMsg from "./SuccessMsg.Component";

function Uploader({ url, success, setUrl, setSuccess }) {
  const [uploadInput, setUploadInput] = useState(null);

  function handleUpload() {
    let file = uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = uploadInput.files[0].name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: fileName + "." + fileType,
        fileType: fileType,
      }),
    };
    fetch("http://localhost:5000/api/sign_s3", requestOptions)
      .then((res) => res.json())
      .then((response) => {
        var returnData = response.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        setUrl(url);
        console.log("Recieved a signed request " + signedRequest);

        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": fileType },
          body: file,
        };

        fetch(signedRequest, requestOptions)
          .then(() => {
            console.log("Response from s3");
            setSuccess(true);
          })
          .catch((error) => {
            alert("ERROR " + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  }

  return (
    <div className="bg-neutralW my-5 p-4 rounded flex flex-col">
      <div className="">
        <h3>Upload a picture here</h3>
        {success ? <SuccessMsg url={url} /> : null}
        <input
          className="mt-4"
          onChange={() => {
            setUrl("");
            setSuccess(false);
          }}
          ref={(ref) => {
            setUploadInput(ref);
          }}
          type="file"
        />
        <button
          className="py-2 px-5 mt-4 border-solid border-2 border-neutralB rounded-full"
          onClick={handleUpload}
        >
          UPLOAD
        </button>
      </div>
    </div>
  );
}

export default Uploader;
