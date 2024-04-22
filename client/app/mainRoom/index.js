import React, { useState } from "react";
import { Modal, Portal, Text, PaperProvider } from "react-native-paper";
import { Pressable, TextInput, View, Alert } from "react-native";
import { Stack } from "expo-router";
import MainRoomComponent from "./MainRoomComponent";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_DEV from "../../static/api";

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
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [newContact, setNewContact] = useState("");
  const [newContactError, setNewContactError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const username1 = await AsyncStorage.getItem("username");
      const username2 = newContact;

      const formData = {
        username1: username1,
        username2: username2,
      };

      console.log(formData);

      const response = await axios.post(`${API_DEV}/room`, formData);

      console.log(response.data);

      if (response.data.message == "user not found") {
        setLoading(false);
        setNewContactError("User not found");
      } else if (response.data.message == "success") {
        setLoading(false);
        hideModal();
        setNewContactError(null);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.message, [
        {
          text: "Ok",
          onPress: () => {
            hideModal();
          },
        },
      ]);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <PaperProvider>
        <Portal>
          <Modal
            visible={visible}
            dismissable={false}
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
                newContactError ? "border-[#BC4B48]" : "border-[#BCA29A] "
              } border-[1px] rounded-full mt-2 py-2 px-4`}
              style={{ fontFamily: "Nunito_500Medium" }}
              value={newContact}
              onChangeText={(text) => setNewContact(text)}
            />
            {newContactError && (
              <Text className="text-[#BC4B48] mt-1">{newContactError}</Text>
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
        <MainRoomComponent showModal={showModal} visible={visible} />
      </PaperProvider>
    </>
  );
};

export default Index;
