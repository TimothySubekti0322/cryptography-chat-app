import { Modal, Portal, Text, PaperProvider } from "react-native-paper";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Stack, Link } from "expo-router";

// const contactList = [
//   "Nadira",
//   "Jodi",
//   "Carissa",
//   "Nadine",
//   "Nadine",
//   "Nadine",
//   "Nadine",
//   "Nadine",
//   "Nadine",
// ];

const containerStyle = {
  backgroundColor: "#FFF9E2",
  width: "80%",
  alignSelf: "center",
  borderRadius: 15,
  borderWidth: 4,
  borderColor: "#C4E0B4",
  paddingTop: 30,
  paddingBottom: 20,
  paddingHorizontal: 15,
};

const Index = () => {
  const [visible, setVisible] = useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <Link replace href="/mainRoom">
        <Text>Go To Main Room</Text>
      </Link>
      {/* <Stack.Screen options={{ headerShown: false }} />
      <PaperProvider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text
              className="w-full text-2xl text-center"
              style={{ fontFamily: "Nunito_800ExtraBold" }}
            >
              Add Contact
            </Text>
            <Text className="mt-8" style={{ fontFamily: "Nunito_500Medium" }}>
              Insert Username
            </Text>
            <TextInput className="border-[1px] border-[#BCA29A] rounded-full mt-2 py-2 px-4" />
            <View className="items-center justify-center w-full mt-8 ">
              <View className="w-1/2 bg-[#C4E0B4] border-[1px] border-[#95B584] rounded-full overflow-hidden">
                <Pressable
                  android_ripple={{ color: "#91c574" }}
                  className="items-center justify-center py-3"
                >
                  <Text style={{ fontFamily: "Nunito_500Medium" }}>Add</Text>
                </Pressable>
              </View>
            </View>

            <Pressable onPress={hideModal}>
              <Text className="w-full mt-3 text-center text-[#BCA29A]">
                cancel
              </Text>
            </Pressable>
          </Modal>
        </Portal>
        <View className="items-center justify-center" style={{ flex: 1 }}>
          <Pressable
            className="items-center justify-center w-1/2 py-3 bg-orange-700"
            onPress={showModal}
          >
            <Text variant="titleMedium" className="text-white">
              Open Modal
            </Text>
          </Pressable>
        </View>
      </PaperProvider> */}
    </>
  );
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
