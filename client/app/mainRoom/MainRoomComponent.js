import { useContext, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Stack, router } from "expo-router";

import { CredentialContext } from "../../store/context/credential-context";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Contact from "../../components/contact";

const contactList = [
  {
    name: "Nadira",
    lastMessage: "Nadira sent a file",
  },
  {
    name: "Jodi",
    lastMessage: "Jangan lupa Absen",
  },
  {
    name: "Carissa",
    lastMessage: "Gimana kabar kamu?",
  },
  {
    name: "Nadine",
    lastMessage: "Tim lo dimana ?",
  },
  {
    name: "Marvel",
    lastMessage: "Kapan kita main?",
  },
  {
    name: "Lim",
    lastMessage: "udh kerjain AE tim ?",
  },
  {
    name: "Marcel",
    lastMessage: "Tim udh kerjain assement paragon ?",
  },
];

const MainRoomComponent = ({ showModal }) => {
  const credentialCtx = useContext(CredentialContext);

  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUsername = async () => {
      const username = await AsyncStorage.getItem("username");
      setUsername(username);
    };
    getUsername();
  }, []);

  const signOutHandler = () => {
    credentialCtx.setUsername("");
    credentialCtx.setPassword("");

    router.replace("/");
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar backgroundColor="#C4E0B4" barStyle="dark-content" />
      <SafeAreaView className="" style={{ flex: 1 }}>
        <View className="flex-row items-center w-full px-6 py-6 bg-[#C4E0B4]">
          <Image source={require("../../assets/header-avatar.png")} />
          <Text className="ml-4 text-2xl font-bold">{username}</Text>
        </View>

        {/* Contact List */}
        <View
          className="bg-[#FFE6AB] w-full px-[10%] pt-[10%]"
          style={{ flex: 1 }}
        >
          <Text className="mb-4 text-2xl font-bold">Contacts</Text>
          <ScrollView className="h-[70%]" showsVerticalScrollIndicator={false}>
            {contactList.map((contact, index) => (
              <Contact
                key={index}
                contact={contact.name}
                lastMessage={contact.lastMessage}
              />
            ))}
            <View className="">
              <Pressable
                className="flex-row items-center w-full py-3"
                android_ripple={{ color: "#DAD4C0" }}
                onPress={showModal}
              >
                <Image source={require("../../assets/plus.png")} />
                <View className="flex-col ml-4">
                  <Text className="text-lg">Add Contact</Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>
          <View
            className="flex-row items-center justify-end w-full py-4"
            style={{ flex: 1 }}
          >
            <Pressable
              className="flex-row items-center px-2 py-1"
              android_ripple={{ color: "#E5242B" }}
              onPress={signOutHandler}
            >
              <Text>Log Out</Text>
              <Image
                source={require("../../assets/logout.png")}
                className="ml-2"
              />
            </Pressable>

            <Image
              source={require("../../assets/cat-logo.png")}
              className="w-20"
              style={{ resizeMode: "contain" }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default MainRoomComponent;
