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

const Login = () => {
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
                onPress={() => router.replace("../mainRoom")}
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
