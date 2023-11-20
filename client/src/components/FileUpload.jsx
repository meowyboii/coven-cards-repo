import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles([...files, ...Array.from(selectedFiles)]);
  };

  const handleUpload = () => {
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    axios
      .post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUpload}>Upload Files</button>
    </div>
  );
}

export default FileUpload;