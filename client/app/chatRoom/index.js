import { Text } from "react-native-paper";
import { useState } from "react";
import { Pressable, TextInput, View, Image, ScrollView } from "react-native";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import LeftTextMessage from "../../components/leftTextMessage";
import RightTextMessage from "../../components/rightTextMessage";
import LeftFileMessage from "../../components/leftFileMessage";
import RightFileMessage from "../../components/rightFileMessage";

const Index = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar backgroundColor="#FFE6AB" barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header Section */}
        <View className="flex-row items-center px-8 py-4 bg-[#FFE6AB]">
          <Pressable onPress={() => router.back()}>
            <Image source={require("../../assets/chevron-left.png")} />
          </Pressable>
          <Text
            className="ml-6 text-2xl"
            style={{ fontFamily: "Nunito_700Bold" }}
          >
            Nadira
          </Text>
        </View>

        {/* Body */}
        <ScrollView className="bg-[#FFF9E2] pt-8" style={{ flex: 1 }}>
          {/* Left Text Component */}
          <LeftTextMessage message="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />

          {/* Right Text Component */}
          <RightTextMessage message="Suspendisse ultrices, mi nec rutrum fringilla, nibh nunc consectetur lorem, quis eleifend erat est at purus." />

          {/* Right Component */}
          <RightTextMessage message="Aenean vitae magna tempor, feugiat justo ac, viverra mi. Quisque tristique suscipit sodales. Etiam non ullamcorper sapien." />

          {/* Right Component - File */}
          <RightFileMessage fileName="kriptografinkoding.pdf" />

          {/* Left Component - File */}
          <LeftFileMessage fileName="kriptografinkoding.pdf" />
          
        </ScrollView>
        {/* Send Message */}
        <View className="h-16 bg-[#C4E0B4] px-4 flex-row items-center justify-between">
          <Pressable>
            <Image source={require("../../assets/add-file.png")} />
          </Pressable>
          <TextInput
            placeholder="type here..."
            className="border-[1px] rounded-xl mx-4 h-10 px-4"
            style={{ flex: 1 }}
          />
          <Pressable>
            <Image source={require("../../assets/send-message.png")} />
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Index;
