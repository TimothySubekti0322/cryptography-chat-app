import React, { useState } from "react";
import { Alert, Button, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import API_DEV from "../../static/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";

const DocPicker = () => {
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const uploadDocument = async () => {
    // Set loading to true
    setLoading(true);

    // Pick the document
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      console.log("response = ", response.canceled);
      if (!response.canceled) {
        console.log("success");
        const { name, size, uri } = response.assets[0];
        const nameParts = name.split(".");
        const fileType = nameParts[nameParts.length - 1];
        const fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType,
        };
        console.log(fileToUpload, "...............file");
        setDoc(fileToUpload);

        // Upload the Document
        console.log("Posting Document........");
        const url = `${API_DEV}/send-file/`;
        const formData = new FormData();
        console.log(fileToUpload);
        formData.append("file", doc);
        formData.append("sender", "jodi");

        console.log("Form Data------------------ : " + formData);
        console.log("URL ------------------- : " + url);

        const repsonse = await axios.post(url, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(repsonse);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
      setDoc(null);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="items-center justify-center" style={{ flex: 1 }}>
        <Button title="Upload file" onPress={uploadDocument} />
        {loading && (
          <ActivityIndicator animating={true} color="#C4E0B4" size="large" />
        )}
        {/* <Button title="Upload" onPress={postDocument} /> */}
      </SafeAreaView>
    </>
  );
};

export default DocPicker;
