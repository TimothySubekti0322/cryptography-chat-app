import { Text } from "react-native-paper";
import { useState } from "react";
import { Pressable, TextInput, View, Image, ScrollView } from "react-native";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

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
          {/* Left Component */}
          <View className="items-start w-full pl-6 mb-6">
            <View className="bg-[#FFE6AB] max-w-[70%] py-2 px-4 rounded-t-xl rounded-br-xl">
              <Text
                className="text-balance"
                style={{ fontFamily: "Nunito_400Regular" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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

          {/* Right Component */}
          <View className="items-end w-full pr-6 mb-6">
            <View className="bg-[#C4E0B4] max-w-[70%] py-2 px-4 rounded-t-xl rounded-bl-xl">
              <Text style={{ fontFamily: "Nunito_400Regular" }}>
                Suspendisse ultrices, mi nec rutrum fringilla, nibh nunc
                consectetur lorem, quis eleifend erat est at purus.
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

          {/* Right Component */}
          <View className="items-end w-full pr-6 mb-6">
            <View className="bg-[#C4E0B4] max-w-[70%] py-2 px-4 rounded-t-xl rounded-bl-xl">
              <Text style={{ fontFamily: "Nunito_400Regular" }}>
                Aenean vitae magna tempor, feugiat justo ac, viverra mi. Quisque
                tristique suscipit sodales. Etiam non ullamcorper sapien.
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

          {/* Right Component - File */}
          <View className="items-end w-full pr-6 mb-6">
            <View className="bg-[#C4E0B4] max-w-[70%] py-3 px-4 rounded-t-xl rounded-bl-xl flex-row items-center">
              <Text style={{ fontFamily: "Nunito_400Regular" }}>
                kriptografinkoding.pdf
              </Text>
              <Image
                source={require("../../assets/file.png")}
                className="ml-2"
              />
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

          {/* Left Component - File */}
          <View className="items-start w-full pl-6 mb-6">
            <View className="bg-[#FFE6AB] max-w-[70%] py-3 px-4 rounded-t-xl rounded-br-xl flex-row items-center">
              <Text style={{ fontFamily: "Nunito_400Regular" }}>
                kriptografinkoding.pdf
              </Text>
              <Image
                source={require("../../assets/file.png")}
                className="ml-2"
              />
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
