import { View, Text, Pressable } from "react-native";
import React from "react";

const LeftTextMessage = ({ message }) => {
  return (
    <View className="items-start w-full pl-6 mb-6">
      <View className="bg-[#FFE6AB] max-w-[70%] py-2 px-4 rounded-t-xl rounded-br-xl">
        <Text
          className="text-balance"
          style={{ fontFamily: "Nunito_400Regular" }}
        >
          {message}
        </Text>
      </View>
      <Pressable>
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

export default LeftTextMessage;
