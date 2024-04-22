import { View, Text, Pressable } from "react-native";
import React from "react";
import { encrypt } from "../utils/encrypt"
import { useContext, useEffect, useState } from "react";



const RightTextMessage = ({ message, cipher }) => {
  const [encrypted, setEncrypted] = useState(false);

  const onEncrypt = () => {
    setEncrypted(!encrypted);
  }

  return (
    <View className="items-end w-full pr-6 mb-6">
      <View className="bg-[#C4E0B4] max-w-[70%] py-2 px-4 rounded-t-xl rounded-bl-xl">
        <Text style={{ fontFamily: "Nunito_400Regular" }}>{encrypted ? cipher : message}</Text>
      </View>
      <Pressable
        onPress={onEncrypt}>
        <Text
          className="text-[#BCA29A] mt-1"
          style={{ fontFamily: "Nunito_400Regular" }}
        >
          {encrypted ? "see decyphered text" : "see encrypted text"}
          
        </Text>
      </Pressable>
    </View>
  );
};

export default RightTextMessage;
