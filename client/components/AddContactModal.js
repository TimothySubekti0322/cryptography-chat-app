import { Modal, Portal, Text, PaperProvider } from "react-native-paper";
import { useState, useEffect } from "react";
import { Alert, Pressable, TextInput, View } from "react-native";
import { Stack, router } from "expo-router";
import axios from "axios";

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

const AddContactModal = () => {
  const [visible, setVisible] = useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("clicked");
    router.replace("/mainroom");
    // try {
    //   const username1 = await AsyncStorage.getItem("username");
    //   const username2 = username;

    //   const formData = {
    //     username1: username1,
    //     username2: username2,
    //   };

    //   const response = await axios.post(`${API_DEV}/room`, formData);

    //   if (response.data.message == "user not found") {
    //     setUsernameError("User not found");
    //   } else if (response.data.message == "success") {
    //     setLoading(false);
    //   }
    // } catch (error) {
    //   Alert.alert("Error", error.message, [
    //     {
    //       text: "Ok",
    //       onPress: () => {
    //         router.replace("/mainroom");
    //       },
    //     },
    //   ]);
    // }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
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
            <TextInput
              className={`${
                usernameError ? "border-[#BC4B48]" : "border-[#BCA29A] "
              } border-[1px] rounded-full mt-2 py-2 px-4`}
              value={username}
              onChange={(text) => setUsername(text)}
            />
            {usernameError && (
              <Text className="text-[#BC4B48] mt-1">{usernameError}</Text>
            )}
            <View className="items-center justify-center w-full mt-8 ">
              <View className="w-1/2 bg-[#C4E0B4] border-[1px] border-[#95B584] rounded-full overflow-hidden">
                <Pressable
                  android_ripple={{ color: "#91c574" }}
                  className="items-center justify-center py-3"
                  onPress={handleSubmit}
                >
                  {loading ? (
                    <ActivityIndicator animating={true} color="#221a07" />
                  ) : (
                    <Text style={{ fontFamily: "Nunito_500Medium" }}>Add</Text>
                  )}
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
      </PaperProvider>
    </>
  );
};

export default AddContactModal;
