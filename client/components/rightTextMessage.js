import { View, Text, Pressable } from "react-native";
import React from "react";
import { encrypt } from "../utils/encrypt"


const RightTextMessage = ({ message, cipher, encrypted }) => {
  const setEncrypted = () => {
    encrypted = !encrypted;
  }
  return (
    <View className="items-end w-full pr-6 mb-6">
      <View className="bg-[#C4E0B4] max-w-[70%] py-2 px-4 rounded-t-xl rounded-bl-xl">
        <Text style={{ fontFamily: "Nunito_400Regular" }}>{encrypted ? message : cipher}</Text>
      </View>
      <Pressable
        onPress={setEncrypted}>
        <Text
          className="text-[#BCA29A] mt-1"
          style={{ fontFamily: "Nunito_400Regular" }}
        >
          see encrypted text
        </Text>
      </Pressable>
    </View>
  );
};

export default RightTextMessage;
