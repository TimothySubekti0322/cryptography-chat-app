import { shareAsync } from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_DEV from "../../../../static/api";
import * as DocumentPicker from "expo-document-picker";

import { useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { CredentialContext } from "../../../../store/context/credential-context";

import { Text } from "react-native-paper";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native-paper";
import { encrypt } from "../../../../utils/encrypt";

import {
  Image,
  Pressable,
  ScrollView,
  TextInput,
  View,
  Alert,
  Button,
} from "react-native";

import LeftTextMessage from "../../../../components/leftTextMessage";
import RightTextMessage from "../../../../components/rightTextMessage";
import LeftFileMessage from "../../../../components/leftFileMessage";
import RightFileMessage from "../../../../components/rightFileMessage";

const Index = () => {
  const route = useRoute();
  const { id, friend } = route.params;
  const [username, setUsername] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  const [messagesList, setMessagesList] = useState([]);
  const [messageNew, setMessageNew] = useState("");

  const [sendKey, setSendKey] = useState({
    e: 0n,
    n: 0n,
  });
  const [sendMessageError, setSendMessageError] = useState(null);

  // const [keys, setKeys] = useState({
  //   publicKey: 0n,
  //   privateKey: 0n,
  //   modulus: 0n,
  // });

  useEffect(() => {
    const loadData = async () => {
      setLoadingData(true);
      try {
        const username = await AsyncStorage.getItem("username");
        setUsername(username);
        console.log(username);

        if (!username) {
          Alert.alert("Error", "username not found", [
            { text: "Back to Home", onPress: () => router.replace("/") },
          ]);
        }

        // // get user data
        // const responseUser = await axios.get(`${API_DEV}/user/${username}`);

        // setSendKey({
        //   publicKey: responseUser.data.e,
        //   privateKey: responseUser.data.d,
        //   modulus: responseUser.data.n,
        // });

        // get messages
        const responseMessages = await axios.get(`${API_DEV}/message/${id}`);
        console.log("responseMessage = ", responseMessages.data);
        setMessagesList(responseMessages.data.data);

        // get friend key
        const responseSendKey = await axios.get(`${API_DEV}/user/${friend}`);
        console.log("friend:", responseSendKey.data);
        setSendKey({
          e: responseSendKey.data.user.e,
          n: responseSendKey.data.user.n,
        });
        console.log(sendKey);
      } catch (error) {
        Alert.alert("Error", error.message, [
          { text: "Back to Home", onPress: () => router.replace("/") },
        ]);
      } finally {
        console.log("finally = ", messagesList);
        setLoadingData(false);
      }
    };
    loadData();
  }, []);

  const sendMessage = async () => {
    setLoadingData(true);
    try {
      var currentdate = new Date();
      var datetime =
        "Last Sync: " +
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " @ " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();

      const formData = {
        cipher: encrypt.encryptText(
          messageNew,
          BigInt(sendKey.e),
          BigInt(sendKey.n)
        ),
        // "createdAt": datetime,
        message: messageNew,
        sender: username,
        // "type": "text"
      };

      console.log("formData", formData);
      const response = await axios.post(`${API_DEV}/message/${id}`, formData);

      console.log("response data", response.data);

      if (response.data.message == "user not found") {
        console.log("user not found");
        setLoadingData(false);
        setNewContactError(response.data.message);
      } else if (response.data.message == "Success") {
        console.log("success");
        setLoadingData(false);
        setSendMessageError(null);
      }
      // {"cipher": "xasaqw", "createdAt": [Object], "message": "hai tim", "sender": "jodi", "type": "text"}], "message": "success", "status": 200}
    } catch (error) {
      setLoadingData(false);
      Alert.alert("Error", error.message);
    }
  };

  /* ------------------------ Send File -------------------------------- */
  const [doc, setDoc] = useState(null);
  // const [loading, setLoading] = useState(false);
  const uploadDocument = async () => {
    // Pick the document
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      console.log("response = ", response);

      console.log("response = ", response.canceled);

      console.log(response);
      console.log("success");
      const { name, size, uri } = response.assets[0];
      const nameParts = name.split(".");
      const fileType = nameParts[nameParts.length - 1];
      const fileToUpload = {
        name: name,
        size: size,
        uri: uri,
        type: "application/" + fileType,
      };
      console.log(fileToUpload, "...............file");
      // setDoc(fileToUpload);

      // Upload the Document
      console.log("Posting Document........");
      const url = `${API_DEV}/send-file/${id}`;
      const formData = new FormData();
      console.log(fileToUpload);
      formData.append("file", fileToUpload);
      formData.append("sender", username);

      console.log("Form Data------------------ : " + formData);
      console.log("URL ------------------- : " + url);

      const response2 = await axios.post(url, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response2);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  /* --------------------------------------------------------*/

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar backgroundColor="#FFE6AB" barStyle="dark-content" />
      {loadingData ? (
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header Section */}
          <View className="flex-row items-center px-8 py-4 bg-[#FFE6AB]">
            <Pressable onPress={() => router.back()}>
              <Image source={require("../../../../assets/chevron-left.png")} />
            </Pressable>
            <Text
              className="ml-6 text-2xl"
              style={{ fontFamily: "Nunito_700Bold" }}
            >
              {friend}
            </Text>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header Section */}
          <View className="flex-row items-center px-8 py-4 bg-[#FFE6AB]">
            <Pressable onPress={() => router.back()}>
              <Image source={require("../../../../assets/chevron-left.png")} />
            </Pressable>
            <Text
              className="ml-6 text-2xl"
              style={{ fontFamily: "Nunito_700Bold" }}
            >
              {friend}
            </Text>
          </View>

          {/* Body */}
          <ScrollView className="bg-[#FFF9E2] pt-8" style={{ flex: 1 }}>
            {messagesList.map((mess) => (
              <View key={mess.id}>
                {mess.sender.match(username) ? (
                  <View>
                    {mess.type == "file" ? (
                      <RightFileMessage
                        fileName={mess.fileName}
                        cypherFileName={mess.fileNameCipher}
                        url={mess.url}
                        urlCipher={mess.urlCipher}
                      />
                    ) : (
                      <RightTextMessage
                        message={mess.message}
                        cipher={mess.cipher}
                      />
                    )}
                  </View>
                ) : (
                  <View key={mess.id}>
                    {mess.type == "file" ? (
                      <LeftFileMessage
                        fileName={mess.fileName}
                        cypherFileName={mess.fileNameCipher}
                        url={mess.url}
                        urlCipher={mess.urlCipher}
                      />
                    ) : (
                      <LeftTextMessage
                        message={mess.message}
                        cipher={mess.cipher}
                      />
                    )}
                  </View>
                )}
              </View>
            ))}

            <Text className="text-[#BC4B48] mt-1">{sendMessageError}</Text>
          </ScrollView>
          {/* Send Message */}
          <View className="h-16 bg-[#C4E0B4] px-4 flex-row items-center justify-between">
            <Pressable onPress={uploadDocument}>
              <Image source={require("../../../../assets/add-file.png")} />
            </Pressable>
            <TextInput
              placeholder="type here..."
              className="border-[1px] rounded-xl mx-4 h-10 px-4"
              value={messageNew}
              onChangeText={(text) => setMessageNew(text)}
              style={{ flex: 1 }}
            />
            <Pressable onPress={sendMessage}>
              <Image source={require("../../../../assets/send-message.png")} />
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Index;
