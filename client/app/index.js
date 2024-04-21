import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Stack } from "expo-router";
import { Link, router } from "expo-router";
import { useState } from "react";

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

const Index = () => {
  // [ publicKey, setPublicKey ] = useState();
  // [ privateKey, setPrivateKey ] = useState();
  // console.log("test");
  
  // const [ publicKey, privateKey ] = generateRSAKeyPair(22123n, 25951n);
  // console.log(publicKey, privateKey)
  // const message = "12345";
  // const encryptedMessage = rsaEncrypt(message, publicKey);
  // console.log("Encrypted Message:", encryptedMessage);
  // const decryptedMessage = rsaDecrypt(encryptedMessage, privateKey);
  // console.log("Decrypted Message:", decryptedMessage);

  return <>
    {/* <Text>
      { publicKey }
    </Text> */}
  </>;
};

export default Index;

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
