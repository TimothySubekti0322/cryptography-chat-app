import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { encrypt } from "../utils/encrypt";
import { App } from "../app/downloadFileTest/index";
import { saveFile, saveFile2 } from "../utils/saveFile";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RightFileMessage = ({ fileName, cypherFileName, url, urlCipher }) => {
  console.log("fileName = ", fileName);
  console.log("cypherFileName = ", cypherFileName);
  console.log("url = ", url);
  console.log("urlCipher = ", urlCipher);
  async function downloadFile() {
    const filename = fileName;

    const result = await FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + filename
    );

    console.log("result --------------- ", result);

    // Log the download result
    console.log("result.uri ------------------- ", result.uri);
    console.log("filename -------------------- ", filename);
    console.log(
      "result.header ---------------- ",
      result.headers["Content-Type"]
    );

    // Save the downloaded file
    await saveFile(result.uri, filename, result.headers["Content-Type"]);
  }

  async function downloadCipherFile() {
    const filename = cypherFileName;

    const result = await FileSystem.downloadAsync(
      urlCipher,
      FileSystem.documentDirectory + filename
    );

    // Log the download result
    console.log("result.uri ------------------- ", result.uri);
    console.log("filename -------------------- ", filename);
    console.log(
      "result.header ---------------- ",
      result.headers["Content-Type"]
    );

    let e = await AsyncStorage.getItem("e");
    e = BigInt(e);
    let n = await AsyncStorage.getItem("n");
    n = BigInt(n);
    // Save the downloaded file
    await saveFile2(result.uri, filename, result.headers["Content-Type"], e, n);
  }

  return (
    <View className="items-end w-full pr-6 mb-6">
      <View className="bg-[#C4E0B4] max-w-[70%] py-3 px-4 rounded-t-xl rounded-bl-xl flex-row items-center">
        <Text style={{ fontFamily: "Nunito_400Regular" }}>{fileName}</Text>
        <Image source={require("../assets/file.png")} className="ml-2" />
      </View>
      <View className="flex-row items-center mt-1 gap-x-1">
        <Pressable onPress={downloadFile}>
          <Text
            className="text-[#BCA29A] mt-1"
            style={{ fontFamily: "Nunito_400Regular" }}
          >
            download file
          </Text>
        </Pressable>
        <Text
          className="text-[#BCA29A] mt-1"
          style={{ fontFamily: "Nunito_400Regular" }}
        >
          |
        </Text>
        <Pressable onPress={downloadCipherFile}>
          <Text
            className="text-[#BCA29A] mt-1"
            style={{ fontFamily: "Nunito_400Regular" }}
          >
            download encrypted file
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RightFileMessage;
