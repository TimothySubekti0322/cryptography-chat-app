import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from 'expo-document-picker';

import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { encrypt } from "../utils/encrypt"
import { App } from "../app/downloadFileTest/index"

const RightFileMessage = ({ fileName, cypherFileName }) => {
  // async function downloadFile() {
  //   const result = await FileSystem.downloadAsync(
  //     "https://res.cloudinary.com/djkckue0o/image/upload/v1713633552/pq4auddctp2hedunpdtr.pdf",
  //     FileSystem.documentDirectory + fileName
  //   );

  //   // Log the download result
  //   console.log(result.headers["content-type"]);

  //   // Save the downloaded file
  //   saveFile(result.uri, filename, result.headers["content-type"]);
  // }

  return (
    <View className="items-end w-full pr-6 mb-6">
      <View className="bg-[#C4E0B4] max-w-[70%] py-3 px-4 rounded-t-xl rounded-bl-xl flex-row items-center">
        <Text style={{ fontFamily: "Nunito_400Regular" }}>{fileName}</Text>
        <Image source={require("../assets/file.png")} className="ml-2" />
      </View>
      <View className="flex-row items-center mt-1 gap-x-1">
        <Pressable 
        // onPress={downloadFile}
        >
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
        <Pressable 
        // onPress={downloadCypherFile}
        >
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
