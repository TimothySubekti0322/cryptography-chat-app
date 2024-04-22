const uploadFile = () => {
  // 1. initialize request
  const xhr = new XMLHttpRequest();
  // 2. open request
  xhr.open("POST", uploadUrl);
  // 3. set up callback for request
  xhr.onload = () => {
    const response = JSON.parse(xhr.response);

    console.log(response);
    // ... do something with the successful response
  };
  // 4. catch for request error
  xhr.onerror = (e) => {
    console.log(e, "upload failed");
  };
  // 4. catch for request timeout
  xhr.ontimeout = (e) => {
    console.log(e, "upload timeout");
  };
  // 4. create fileInput to upload
  let fileInput = new FormData();

  fileInput.append("file", {
    uri: "some-file-path", // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
    type: `${type}/${fileEnding}`, // example: image/jpg
    name: `upload.${fileEnding}`, // example: upload.jpg
  });
  // 6. upload the request
  xhr.send(fileInput);
  // 7. track upload progress
  if (xhr.upload) {
    // track the upload progress
    xhr.upload.onprogress = ({ total, loaded }) => {
      const uploadProgress = loaded / total;
      console.log(uploadProgress);
    };
  }
};
