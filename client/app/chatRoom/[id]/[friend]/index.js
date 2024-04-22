import { shareAsync } from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_DEV from "../../../../static/api";

import { useRoute } from '@react-navigation/native';
import { useContext, useEffect, useState } from "react";
import { CredentialContext } from "../../../../store/context/credential-context";

import { Text } from "react-native-paper";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native-paper";

import {
  Image,
  Pressable,
  ScrollView,
  TextInput,
  View,
  Alert,
  Button
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

  const [keys, setKeys] = useState({
    publicKey: 0n,
    privateKey: 0n,
    modulus: 0n
  });

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

        const responseUser = await axios.get(
          `${API_DEV}/user/${username}`
        );

        setKeys({
          publicKey: responseUser.data.e,
          privateKey: responseUser.data.d,
          modulus: responseUser.data.n
        });

        const responseMessages = await axios.get(
          `${API_DEV}/message/${id}`
        );

        console.log("responseMessage = ", responseMessages.data)

        setMessagesList(responseMessages.data.data);

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

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar backgroundColor="#FFE6AB" barStyle="dark-content" />
      {loadingData ?
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
        :
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
                {mess.sender.match(username)?
                
                  <View>
                    {mess.type == "file" ?
                      <RightFileMessage fileName={mess.url} cypheredFileName={mess.urlCipher} />
                      :
                      <RightTextMessage message={mess.message} />
                    }
                  </View>
                  :
                  <View>
                    {mess.type == "file" ?
                      <LeftFileMessage fileName={mess.url} cypheredFileName={mess.urlCipher} />
                      :
                      <LeftTextMessage message={mess.message} />
                    }
                  </View>
                }
              </View>
            ))}
            

          </ScrollView>
          {/* Send Message */}
          <View className="h-16 bg-[#C4E0B4] px-4 flex-row items-center justify-between">
            <Pressable>
              <Image source={require("../../../../assets/add-file.png")} />
            </Pressable>
            <TextInput
              placeholder="type here..."
              className="border-[1px] rounded-xl mx-4 h-10 px-4"
              style={{ flex: 1 }}
            />
            <Pressable>
              <Image source={require("../../../../assets/send-message.png")} />
            </Pressable>
          </View>
        </SafeAreaView>
      }
    </>

  );

};

export default Index;
