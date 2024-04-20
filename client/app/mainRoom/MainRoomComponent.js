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

const contactList = [
  "Nadira",
  "Jodi",
  "Carissa",
  "Nadine",
  "Nadine",
  "Nadine",
  "Nadine",
  "Nadine",
  "Nadine",
];

const MainRoomComponent = ({ showModal }) => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar backgroundColor="#C4E0B4" barStyle="dark-content" />
      <SafeAreaView className="" style={{ flex: 1 }}>
        <View className="flex-row items-center w-full px-6 py-6 bg-[#C4E0B4]">
          <Image source={require("../../assets/header-avatar.png")} />
          <Text className="ml-4 text-2xl font-bold">Timothy</Text>
        </View>

        {/* Contact List */}
        <View
          className="bg-[#FFE6AB] w-full px-[10%] pt-[10%]"
          style={{ flex: 1 }}
        >
          <Text className="mb-4 text-2xl font-bold">Contacts</Text>
          <ScrollView className="h-[70%]" showsVerticalScrollIndicator={false}>
            {contactList.map((contact, index) => (
              <View key={index} className="border-b-[1px] border-[#FCF6E0]">
                <Pressable
                  className="flex-row items-center w-full py-3"
                  android_ripple={{ color: "#DAD4C0" }}
                  onPress={() => router.push("../chatRoom")}
                >
                  <Image source={require("../../assets/contact-avatar.png")} />
                  <View className="flex-col ml-4">
                    <Text className="text-lg">{contact}</Text>
                    <Text className="text-[#BCA29A]">
                      {contact} sent a file
                    </Text>
                  </View>
                </Pressable>
              </View>
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
              onPress={() => router.push("/")}
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
