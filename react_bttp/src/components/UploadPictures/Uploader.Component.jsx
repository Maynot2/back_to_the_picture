import React, { useState } from "react";
import SuccessMsg from "./SuccessMsg.Component";

function Uploader({ url, success, setSuccess }) {
  const [uploadInput, setUploadInput] = useState(null);

  function handleUpload() {
    // Loop on all pictures added
    for (const value of Object.values(uploadInput.files)) {
      let file = value;
      // Split the filename to get the name and type
      let fileParts = value.name.split(".");
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
      fetch(
        `${
          process.env.NODE_ENV === "production"
            ? "https://"
            : "http://localhost:5000/"
        }api/sign_s3`,
        requestOptions
      )
        .then((res) => res.json())
        .then((response) => {
          var returnData = response.data.returnData;
          var signedRequest = returnData.signedRequest;
          var imgUrl = returnData.url;
          url.current.push(imgUrl);
          //setUrl(url);
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
  }

  return (
    <div className="bg-neutralW my-5 p-4 rounded flex flex-col">
      <div className="">
        <h3>Upload a picture here</h3>
        {success ? <SuccessMsg url={url} /> : null}
        <div className="mt-4 overflow-x-hidden">
          <input
            onChange={() => {
              url.current = [];
              setSuccess(false);
            }}
            ref={(ref) => {
              setUploadInput(ref);
            }}
            type="file"
            multiple
          />
        </div>
        <div>
          <button
            className="py-2 px-5 mt-4 font-semibold border-solid border-2 border-neutralB rounded-full"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default Uploader;
