import React, { useState } from "react";
import axios from "axios";
import { Empty } from "antd";

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [folderName, setFolderName] = useState("");

  const handleFileChange = (e) => {
    setFiles([]);
    const selectedFiles = e.target.files;
    const newFiles = Array.from(selectedFiles).slice(0, 3);
    setFiles((prevFiles) => [...prevFiles, ...Array.from(newFiles)]);
  };

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleUpload = () => {
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append("files", file);
    });

    formData.append("folderName", folderName || "defaultFolder");

    axios
      .post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });

    // Clear the files and folderName state after upload
    setFiles([]);
    setFolderName("");
  };

  return (
    <div>
      <h1>File Upload</h1>
      <label>
        Folder Name:
        <input
          type="text"
          value={folderName}
          onChange={handleFolderNameChange}
        />
      </label>
      <label className="px-4 py-2 bg-purple text-white rounded hover:bg-purpler my-2 cursor-pointer ">
      {files ? `${files.length} uploaded` : "Upload Photo"}
      <input
        type="file"
        name="photos"
        accept="image/*"
        onChange={handleFileChange}
        multiple
        require
        hidden
      />
      </label>
      <div className="mt-10 flex">
        {files.map((photo) => (
          <div className="text-center mx-2">
            <img
              src={URL.createObjectURL(photo)}
              alt="product"
              className="h-[200px]"
            />
          </div>
          ))}
      </div>
      <button className="px-4 py-2 bg-purple text-white rounded hover:bg-purpler my-2 cursor-pointer " onClick={handleUpload}>Submit</button>
    </div>
  );
}

export default FileUpload;
