import { Text } from "react-native-paper";
import { useContext, useState } from "react";
import {
  Pressable,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { Stack, Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { CredentialContext } from "../../store/context/credential-context";
import { checkNumberPositivePrime } from "../../utils/function";
import axios from "axios";
import API_DEV from "../../static/api";

const Index = () => {
  const credentialCtx = useContext(CredentialContext);

  const [primeNumber1, setPrimeNumber1] = useState("");
  const [primeNumber2, setPrimeNumber2] = useState("");

  const [primeNumber1Error, setPrimeNumber1Error] = useState(null);
  const [primeNumber2Error, setPrimeNumber2Error] = useState(null);

  const checkInput = () => {
    if (!primeNumber1) {
      setPrimeNumber1Error("Prime number 1 is required");
      return false;
    } else {
      setPrimeNumber1Error(null);
    }
    if (!primeNumber2) {
      setPrimeNumber2Error("Prime number 2 is required");
      return false;
    } else {
      setPrimeNumber2Error(null);
    }
    if (primeNumber1 === primeNumber2) {
      setPrimeNumber2Error(
        "Prime number 2 must be different from prime number 1"
      );
      return false;
    } else {
      setPrimeNumber2Error(null);
    }

    const prime1 = parseInt(primeNumber1);
    const checkPrime1 = checkNumberPositivePrime(prime1);
    if (checkPrime1 !== "Number is prime") {
      setPrimeNumber1Error(checkPrime1);
      return false;
    } else {
      setPrimeNumber1Error(null);
    }

    const prime2 = parseInt(primeNumber2);
    const checkPrime2 = checkNumberPositivePrime(prime2);
    if (checkPrime2 !== "Number is prime") {
      setPrimeNumber2Error(checkPrime2);
      return false;
    } else {
      setPrimeNumber2Error(null);
    }
    return true;
  };

  const handleSignUp = async () => {
    // Handle login here
    console.log("Username: ", credentialCtx.username);
    console.log("Password: ", credentialCtx.password);
    console.log("Prime 1: ", primeNumber1);
    console.log("Prime 2: ", primeNumber2);

    const isValid = checkInput();

    if (isValid) {
      try {
        const formData = {
          username: credentialCtx.username,
          password: credentialCtx.password,
          e: 9,
          d: 1,
          n: 15,
        };

        // const response = await axios.post(API_DEV + "/user", formData);
        const response = await axios.post(`${API_DEV}/user`, formData);

        if (response.data.message === "User already exists") {
          alert("User already exists");
        } else if (response.data.message === "success") {
          ToastAndroid.show("Sign up Success ✅", ToastAndroid.SHORT);
          router.replace("../login");
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
              <Text className="text-[#95B584]">Sign Up</Text> to the
            </Text>
            <Text className="text-2xl font-semibold">Encrypted Chatroom.</Text>
          </View>
          <View className="items-start w-full mt-12">
            <Text className="text-start">choose 2 random number</Text>
            <TextInput
              className={`${
                primeNumber1Error ? "border-[#BC4B48]" : "border-[#BCA29A]"
              } rounded-full border-2 w-full h-12 px-4 mt-2`}
              value={primeNumber1}
              keyboardType="number-pad"
              onChangeText={(text) => setPrimeNumber1(text)}
            />
            {primeNumber1Error && (
              <Text className="text-[#BC4B48] mt-1">{primeNumber1Error}</Text>
            )}
            <TextInput
              className={`${
                primeNumber2Error ? "border-[#BC4B48]" : "border-[#BCA29A]"
              } rounded-full border-2 w-full h-12 px-4 mt-2`}
              value={primeNumber2}
              keyboardType="number-pad"
              onChangeText={(text) => setPrimeNumber2(text)}
            />
            {primeNumber2Error && (
              <Text className="text-[#BC4B48] mt-1">{primeNumber2Error}</Text>
            )}
          </View>
          <View className="items-center w-full mt-8">
            <View
              className="w-1/2 rounded-full border-2 border-[#D6BD82] bg-[#FFE6AB] overflow-hidden"
              style={{ elevation: 5 }}
            >
              <Pressable
                android_ripple={{ color: "#e0be6f" }}
                className="items-center py-3 rounded-full"
                onPress={handleSignUp}
              >
                <Text>sign up</Text>
              </Pressable>
            </View>
          </View>
          <View className="w-full border-[1px] border-[#BCA29A] mt-8"></View>
          <View className="items-center mt-3">
            <Link replace href="../login">
              <Text className="text-[#BCA29A] font-semibold text-lg">
                log in instead
              </Text>
            </Link>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Index;
