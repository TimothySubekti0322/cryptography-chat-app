import { View, Text, Pressable, Image } from "react-native";
import React from "react";

const leftFileMessage = ({ fileName }) => {
  return (
    <View className="items-start w-full pl-6 mb-6">
      <View className="bg-[#FFE6AB] max-w-[70%] py-3 px-4 rounded-t-xl rounded-br-xl flex-row items-center">
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
            download encrypted file
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default leftFileMessage;
