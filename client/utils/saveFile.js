import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

export const saveFile = async (uri, filename, mimetype) => {
  if (Platform.OS === "android") {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log("base64-------------------------", base64);
      try {
        console.log("permissions.directoryUri = ", permissions.directoryUri);
        console.log("filename = ", filename);
        console.log("mimetype = ", mimetype);
        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
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
};

export const createTextFileFromPlainText = async (text, fileName) => {
  try {
    // Write the text to a file
    const fileUri = FileSystem.documentDirectory + fileName + ".txt";
    await FileSystem.writeAsStringAsync(fileUri, text);

    console.log("Text file created successfully:", fileUri);

    await saveFile(fileUri, fileName, "text/plain");
  } catch (error) {
    console.error("Error creating text file:", error);
    throw error;
  }
};
