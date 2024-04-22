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
            <Text className="text-[#95B584]">Sign Up</Text> to the
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
                <Text>Log in</Text>
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
                <Text>sign up</Text>
              </Pressable>
            </View>
          </View>
          <View className="items-center w-full mt-4">
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
        </View>
      </SafeAreaView>
    </>
  );
};

export default Index;

/* chat room */
// <Stack.Screen options={{ headerShown: false }} />
// <StatusBar backgroundColor="#FFE6AB" barStyle="dark-content" />
// <SafeAreaView style={{ flex: 1 }}>
//   {/* Header Section */}
//   <View className="flex-row items-center px-8 py-4 bg-[#FFE6AB]">
//     <Pressable>
//       <Image source={require("../assets/chevron-left.png")} />
//     </Pressable>
//     <Text
//       className="ml-6 text-2xl"
//       style={{ fontFamily: "Nunito_700Bold" }}
//     >
//       Nadira
//     </Text>
//   </View>

//   {/* Body */}
//   <ScrollView className="bg-[#FFF9E2] pt-8" style={{ flex: 1 }}>
//     {/* Left Component */}
//     <View className="items-start w-full pl-6 mb-6">
//       <View className="bg-[#FFE6AB] max-w-[70%] py-2 px-4 rounded-t-xl rounded-br-xl">
//         <Text
//           className="text-balance"
//           style={{ fontFamily: "Nunito_400Regular" }}
//         >
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//         </Text>
//       </View>
//       <Pressable>
//         <Text
//           className="text-[#BCA29A] mt-1"
//           style={{ fontFamily: "Nunito_400Regular" }}
//         >
//           see encrypted text
//         </Text>
//       </Pressable>
//     </View>

//     {/* Right Component */}
//     <View className="items-end w-full pr-6 mb-6">
//       <View className="bg-[#C4E0B4] max-w-[70%] py-2 px-4 rounded-t-xl rounded-bl-xl">
//         <Text style={{ fontFamily: "Nunito_400Regular" }}>
//           Suspendisse ultrices, mi nec rutrum fringilla, nibh nunc
//           consectetur lorem, quis eleifend erat est at purus.
//         </Text>
//       </View>
//       <Pressable>
//         <Text
//           className="text-[#BCA29A] mt-1"
//           style={{ fontFamily: "Nunito_400Regular" }}
//         >
//           see encrypted text
//         </Text>
//       </Pressable>
//     </View>

//     {/* Right Component */}
//     <View className="items-end w-full pr-6 mb-6">
//       <View className="bg-[#C4E0B4] max-w-[70%] py-2 px-4 rounded-t-xl rounded-bl-xl">
//         <Text style={{ fontFamily: "Nunito_400Regular" }}>
//           Aenean vitae magna tempor, feugiat justo ac, viverra mi. Quisque
//           tristique suscipit sodales. Etiam non ullamcorper sapien.
//         </Text>
//       </View>
//       <Pressable>
//         <Text
//           className="text-[#BCA29A] mt-1"
//           style={{ fontFamily: "Nunito_400Regular" }}
//         >
//           see encrypted text
//         </Text>
//       </Pressable>
//     </View>

//     {/* Right Component - File */}
//     <View className="items-end w-full pr-6 mb-6">
//       <View className="bg-[#C4E0B4] max-w-[70%] py-3 px-4 rounded-t-xl rounded-bl-xl flex-row items-center">
//         <Text style={{ fontFamily: "Nunito_400Regular" }}>
//           kriptografinkoding.pdf
//         </Text>
//         <Image source={require("../assets/file.png")} className="ml-2" />
//       </View>
//       <View className="flex-row items-center mt-1 gap-x-1">
//         <Pressable>
//           <Text
//             className="text-[#BCA29A] mt-1"
//             style={{ fontFamily: "Nunito_400Regular" }}
//           >
//             download file
//           </Text>
//         </Pressable>
//         <Text
//           className="text-[#BCA29A] mt-1"
//           style={{ fontFamily: "Nunito_400Regular" }}
//         >
//           |
//         </Text>
//         <Pressable>
//           <Text
//             className="text-[#BCA29A] mt-1"
//             style={{ fontFamily: "Nunito_400Regular" }}
//           >
//             download file
//           </Text>
//         </Pressable>
//       </View>
//     </View>

//     {/* Left Component - File */}
//     <View className="items-start w-full pl-6 mb-6">
//       <View className="bg-[#FFE6AB] max-w-[70%] py-3 px-4 rounded-t-xl rounded-br-xl flex-row items-center">
//         <Text style={{ fontFamily: "Nunito_400Regular" }}>
//           kriptografinkoding.pdf
//         </Text>
//         <Image source={require("../assets/file.png")} className="ml-2" />
//       </View>
//       <View className="flex-row items-center mt-1 gap-x-1">
//         <Pressable>
//           <Text
//             className="text-[#BCA29A] mt-1"
//             style={{ fontFamily: "Nunito_400Regular" }}
//           >
//             download file
//           </Text>
//         </Pressable>
//         <Text
//           className="text-[#BCA29A] mt-1"
//           style={{ fontFamily: "Nunito_400Regular" }}
//         >
//           |
//         </Text>
//         <Pressable>
//           <Text
//             className="text-[#BCA29A] mt-1"
//             style={{ fontFamily: "Nunito_400Regular" }}
//           >
//             download file
//           </Text>
//         </Pressable>
//       </View>
//     </View>
//   </ScrollView>
//   {/* Send Message */}
//   <View className="h-16 bg-[#C4E0B4] px-4 flex-row items-center justify-between">
//     <Pressable>
//       <Image source={require("../assets/add-file.png")} />
//     </Pressable>
//     <TextInput
//       placeholder="type here..."
//       className="border-[1px] rounded-xl mx-4 h-10 px-4"
//       style={{ flex: 1 }}
//     />
//     <Pressable>
//       <Image source={require("../assets/send-message.png")} />
//     </Pressable>
//   </View>
// </SafeAreaView>

/* mainRoom */

// <>
//   <Stack.Screen options={{ headerShown: false }} />
//   <StatusBar backgroundColor="#C4E0B4" barStyle="dark-content" />
//   <SafeAreaView className="" style={{ flex: 1 }}>
//     <View className="flex-row items-center w-full px-6 py-6 bg-[#C4E0B4]">
//       <Image source={require("../assets/header-avatar.png")} />
//       <Text className="ml-4 text-2xl font-bold">Timothy</Text>
//     </View>

//     {/* Contact List */}
//     <View
//       className="bg-[#FFE6AB] w-full px-[10%] pt-[10%]"
//       style={{ flex: 1 }}
//     >
//       <Text className="mb-4 text-2xl font-bold">Contacts</Text>
//       <ScrollView className="h-[70%]" showsVerticalScrollIndicator={false}>
//         {contactList.map((contact, index) => (
//           <View key={index} className="border-b-[1px] border-[#FCF6E0]">
//             <Pressable
//               className="flex-row items-center w-full py-3"
//               android_ripple={{ color: "#DAD4C0" }}
//             >
//               <Image source={require("../assets/contact-avatar.png")} />
//               <View className="flex-col ml-4">
//                 <Text className="text-lg">{contact}</Text>
//                 <Text className="text-[#BCA29A]">
//                   {contact} sent a file
//                 </Text>
//               </View>
//             </Pressable>
//           </View>
//         ))}
//         <View className="">
//           <Pressable
//             className="flex-row items-center w-full py-3"
//             android_ripple={{ color: "#DAD4C0" }}
//           >
//             <Image source={require("../assets/plus.png")} />
//             <View className="flex-col ml-4">
//               <Text className="text-lg">Add Contact</Text>
//             </View>
//           </Pressable>
//         </View>
//       </ScrollView>
//       <View
//         className="flex-row items-center justify-end w-full py-4"
//         style={{ flex: 1 }}
//       >
//         <Pressable
//           className="flex-row items-center px-2 py-1"
//           android_ripple={{ color: "#E5242B" }}
//         >
//           <Text>Log Out</Text>
//           <Image
//             source={require("../assets/logout.png")}
//             className="ml-2"
//           />
//         </Pressable>

//         <Image
//           source={require("../assets/cat-logo.png")}
//           className="w-20"
//           style={{ resizeMode: "contain" }}
//         />
//       </View>
//     </View>
//   </SafeAreaView>
// </>;

/* <View className="items-center justify-center" style={{ flex: 1 }}>
      <Text className="font-bold">This Is Index.js</Text>
    </View>*/

/*    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar backgroundColor="#FFF9E2" barStyle="dark-content" />
      <SafeAreaView className="bg-[#FFF9E2] px-[15%]" style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <View className="pt-[10%] items-center">
            <Image source={require("../assets/cat-logo.png")} />
          </View>
          <View className="items-center w-full pt-4">
            <Text className="text-2xl font-semibold">
              <Text className="text-[#95B584]">Log In</Text> to the
            </Text>
            <Text className="text-2xl font-semibold">Encrypted Chatroom.</Text>
          </View>
          <View className="items-start w-full mt-12">
            <Text className="text-start">Username</Text>
            <TextInput className="rounded-full border-2 border-[#BCA29A] w-full h-12 px-4 mt-2" />
          </View>
          <View className="items-start w-full mt-4">
            <Text className="text-start">Password</Text>
            <TextInput className="rounded-full border-2 border-[#BCA29A] w-full h-12 px-4 mt-2" />
          </View>
          <View className="items-center w-full mt-8">
            <View
              className="w-1/2 rounded-full border-2 border-[#95B584] bg-[#C4E0B4] overflow-hidden"
              style={{ elevation: 5 }}
            >
              <Pressable
                android_ripple={{ color: "#91c574" }}
                className="items-center py-3 rounded-full"
              >
                <Text>Log in</Text>
              </Pressable>
            </View>
          </View>
          <View className="w-full border-[1px] border-[#BCA29A] mt-8"></View>
          <View className="items-center mt-3">
            <Link replace href="/signup">
              <Text className="text-[#BCA29A] font-semibold text-lg">
                log in instead
              </Text>
            </Link>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </> */
