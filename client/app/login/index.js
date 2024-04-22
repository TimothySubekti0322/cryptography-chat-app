import { useContext, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack, router } from "expo-router";
import { CredentialContext } from "../../store/context/credential-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_DEV from "../../static/api";

const Login = () => {
  const credentialCtx = useContext(CredentialContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const checkCredentials = () => {
    if (!username) {
      setUsernameError("Username is required");
      return false;
    } else {
      setUsernameError(null);
    }
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else {
      setPasswordError(null);
    }
    return true;
  };

  const handleLogin = async () => {
    // Handle login here
    console.log("Username: ", username);
    console.log("Password: ", password);

    const isValid = checkCredentials();
    if (isValid) {
      try {
        const formData = {
          username: username,
          password: password,
        };
        const response = await axios.post(`${API_DEV}/user/auth`, formData);

        if (response.data.message === "User not found") {
          setUsernameError("User not found");
        } else if (response.data.message === "Invalid password") {
          setPasswordError("Invalid password");
        } else if (response.data.message === "success") {
          setUsernameError(null);
          setPasswordError(null);
          // Save username and password to Credential Context
          credentialCtx.setUsername(username);
          credentialCtx.setPassword(password);

          console.log("");
          // Save username and password to AsyncStorage
          AsyncStorage.setItem("username", username);
          AsyncStorage.setItem("password", password);

          router.replace("../mainRoom");
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar backgroundColor="#FFF9E2" barStyle="dark-content" />
      <SafeAreaView className="bg-[#FFF9E2] px-[15%]" style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <View className="pt-[10%] items-center">
            <Image source={require("../../assets/cat-logo.png")} />
          </View>
          <View className="items-center w-full pt-4">
            <Text className="text-2xl font-semibold">
              <Text className="text-[#95B584]">Log In</Text> to the
            </Text>
            <Text className="text-2xl font-semibold">Encrypted Chatroom.</Text>
          </View>
          <View className="items-start w-full mt-12">
            <Text className="text-start">Username</Text>
            <TextInput
              className={`${
                usernameError ? "border-[#BC4B48]" : "border-[#BCA29A]"
              } rounded-full border-2 w-full h-12 px-4 mt-2`}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            {usernameError && (
              <Text className="text-[#BC4B48] mt-1">{usernameError}</Text>
            )}
          </View>
          <View className="items-start w-full mt-4">
            <Text className="text-start">Password</Text>
            <TextInput
              className={`${
                passwordError ? "border-[#BC4B48]" : "border-[#BCA29A]"
              } rounded-full border-2 w-full h-12 px-4 mt-2`}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
            {passwordError && (
              <Text className="text-[#BC4B48] mt-1">{passwordError}</Text>
            )}
          </View>
          <View className="items-center w-full mt-8">
            <View
              className="w-1/2 rounded-full border-2 border-[#95B584] bg-[#C4E0B4] overflow-hidden"
              style={{ elevation: 5 }}
            >
              <Pressable
                android_ripple={{ color: "#91c574" }}
                className="items-center py-3 rounded-full"
                onPress={handleLogin}
              >
                <Text>Log in</Text>
              </Pressable>
            </View>
          </View>
          <View className="w-full border-[1px] border-[#BCA29A] mt-8"></View>
          <View className="items-center mt-3">
            <Link replace href="../signup">
              <Text className="text-[#BCA29A] font-semibold text-lg">
                sign up instead
              </Text>
            </Link>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Login;

/* <View className="items-center justify-center" style={{ flex: 1 }}>
      <Text className="font-bold">This Is Index.js</Text>
    </View>*/
