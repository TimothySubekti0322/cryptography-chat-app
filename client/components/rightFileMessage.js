import { View, Text, Pressable, Image } from "react-native";
import React from "react";

const RightFileMessage = ({ fileName }) => {
  return (
    <View className="items-end w-full pr-6 mb-6">
      <View className="bg-[#C4E0B4] max-w-[70%] py-3 px-4 rounded-t-xl rounded-bl-xl flex-row items-center">
        <Text style={{ fontFamily: "Nunito_400Regular" }}>{fileName}</Text>
        <Image source={require("../assets/file.png")} className="ml-2" />
      </View>
      <View className="flex-row items-center mt-1 gap-x-1">
        <Pressable>
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
        <Pressable>
          <Text
            className="text-[#BCA29A] mt-1"
            style={{ fontFamily: "Nunito_400Regular" }}
          >
            download file
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RightFileMessage;
