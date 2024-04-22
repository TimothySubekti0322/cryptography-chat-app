import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from 'expo-document-picker';
import { Platform } from "react-native";
import React from "react";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  async function download() {
    const filename = "dummy.pdf";

    const result = await FileSystem.downloadAsync(
      "https://res.cloudinary.com/djkckue0o/image/upload/v1713633552/pq4auddctp2hedunpdtr.pdf",
      FileSystem.documentDirectory + filename
    );

    // Log the download result
    console.log(result.headers["content-type"]);

    // Save the downloaded file
    saveFile(result.uri, filename, result.headers["content-type"]);
  }

  async function saveFile(uri, filename, mimetype) {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        try {
          console.log("permissions.directoryUri = ", permissions.directoryUri);
          console.log("filename = ", filename);
          console.log("mimetype = ", mimetype);
          const fileUri =
            await FileSystem.StorageAccessFramework.createFileAsync(
              permissions.directoryUri,
              filename,
              mimetype
            );

          console.log("File created at: " + fileUri);

          await FileSystem.writeAsStringAsync(fileUri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });
        } catch (error) {
          console.log("Error creating or writing to file:", error);
        }
      } else {
        console.log("Permission denied");
        console.log(uri);
        shareAsync(uri);
      }
    } else {
      console.log("Permission denied");
      console.log(uri);
      shareAsync(uri);
    }
  }
    const upload = () => {
    // 1. initialize request
    const xhr = new XMLHttpRequest();
    // 2. open request
    xhr.open('POST', upload);
    // 3. set up callback for request
    xhr.onload = () => {
        const response = JSON.parse(xhr.response);

        console.log(response);
        // ... do something with the successful response
    };
    // 4. catch for request error
    xhr.onerror = e => {
        console.log(e, 'upload failed');
    };
    // 4. catch for request timeout
    xhr.ontimeout = e => {
        console.log(e, 'upload timeout');
    };
    // 4. create fileInput to upload
    let fileInput = new FormData();

    fileInput.append('file', {
        uri: 'some-file-path', 			// this is the path to your file. see Expo ImagePicker or React Native ImagePicker
        type: `${type}/${fileEnding}`,  // example: image/jpg
        name: `upload.${fileEnding}`    // example: upload.jpg
    });
    // 6. upload the request
    xhr.send(fileInput);
    // 7. track upload progress
    if (xhr.upload) {
        // track the upload progress
        xhr.upload.onprogress = ({ total, loaded }) => {
            const uploadProgress = (loaded / total);
            console.log(uploadProgress);
        };
    }


}

  return (
    <SafeAreaView className="items-center justify-center" style={{ flex: 1 }}>
      <Button title="Download" onPress={download} />
      <Button title="Upload" onPress={upload} />
    </SafeAreaView>
  );
}
