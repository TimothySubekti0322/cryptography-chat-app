import { Modal, Portal, Text, PaperProvider } from "react-native-paper";
import { useState } from "react";
import {
  Pressable,
  TextInput,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Stack, Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import API_DEV from "../static/api";

const Index = () => {
  const welcomeAPI = async () => {
    try {
      // const response = await axios.get("http://10.0.2.2:4000/welcome");
      const response = await axios.get(`${API_DEV}/welcome `);
      console.log(response);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Error: " + error);
    }
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar backgroundColor="#FFF9E2" barStyle="dark-content" />
      <SafeAreaView className="bg-[#FFF9E2] px-[15%]" style={{ flex: 1 }}>
        <View className="pt-[10%] items-center">
          <Image source={require("../assets/cat-logo.png")} />
        </View>
        <View className="items-center w-full pt-4">
          <Text className="text-2xl font-semibold">
            <Text className="text-[#95B584]">Welcome</Text> to the
          </Text>
          <Text className="text-2xl font-semibold">Encrypted Chatroom.</Text>
        </View>
        <View className="w-full mt-16">
          <View className="items-center w-full mt-8">
            <View
              className="w-1/2 rounded-full border-2 border-[#95B584] bg-[#C4E0B4] overflow-hidden"
              style={{ elevation: 5 }}
            >
              <Pressable
                android_ripple={{ color: "#91c574" }}
                className="items-center py-3 rounded-full"
                onPress={() => {
                  router.push("/login");
                }}
              >
                <Text>Log In</Text>
              </Pressable>
            </View>
          </View>
          <View className="items-center w-full mt-4">
            <View
              className="w-1/2 rounded-full border-2 border-[#D6BD82] bg-[#FFE6AB] overflow-hidden"
              style={{ elevation: 5 }}
            >
              <Pressable
                android_ripple={{ color: "#e0be6f" }}
                className="items-center py-3 rounded-full"
                onPress={() => {
                  router.push("/signup");
                }}
              >
                <Text>Sign Up</Text>
              </Pressable>
            </View>
          </View>
          {/* <View className="items-center w-full mt-4">
            <View
              className="w-1/2 rounded-full border-2 border-[#40a5a9] bg-[#76d3d6] overflow-hidden"
              style={{ elevation: 5 }}
            >
              <Pressable
                android_ripple={{ color: "#40a5a9" }}
                className="items-center py-3 rounded-full"
                onPress={() => {
                  router.push("/downloadFileTest");
                }}
              >
                <Text>Download File Test</Text>
              </Pressable>
            </View>
          </View>
          <View className="items-center w-full mt-4">
            <View
              className="w-1/2 rounded-full border-2 border-[#df5fc3] bg-[#d676c1] overflow-hidden"
              style={{ elevation: 5 }}
            >
              <Pressable
                android_ripple={{ color: "#df5fc3" }}
                className="items-center py-3 rounded-full"
                onPress={welcomeAPI}
              >
                <Text>welcome API</Text>
              </Pressable>
            </View>
          </View>
          <View className="items-center w-full mt-4">
            <View
              className="w-1/2 rounded-full border-2 border-[#38876a] bg-[#4ba182] overflow-hidden"
              style={{ elevation: 5 }}
            >
              <Pressable
                android_ripple={{ color: "#38876a" }}
                className="items-center py-3 rounded-full"
                onPress={() => router.push("/uploadFileTest")}
              >
                <Text>Upload File Test</Text>
              </Pressable>
            </View>
          </View>*/}
        </View> 
      </SafeAreaView>
    </>
  );
};

export default Index;
