import { View, Text, Pressable, Image } from "react-native";
import React from "react";

import { router } from "expo-router";

const Contact = ({ contact, lastMessage }) => {
  return (
    <View className="border-b-[1px] border-[#FCF6E0]">
      <Pressable
        className="flex-row items-center w-full py-3"
        android_ripple={{ color: "#DAD4C0" }}
        onPress={() => router.push("../chatRoom")}
      >
        <Image source={require("../assets/contact-avatar.png")} />
        <View className="flex-col ml-4">
          <Text className="text-lg">{contact}</Text>
          <Text className="text-[#BCA29A]">{lastMessage}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Contact;
