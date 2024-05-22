import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../../Context/AuthContext";
import HomeScreen from "../HomeScreen/HomeScreen";
const iconSize = Platform.OS === "android" ? 43 : 35; //for password eye size for differenct screen
const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    navigation.push("LoginVerifyOtp");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await login(userName, password);
      // navigation.goBack();
      console.log(userName, password);
      navigation.navigate("BottomTab");
    } catch (error) {
      let errorMessage = "An error occurred. Please try again later."; // Default error message
      if (error.response && error.response.status === 400) {
        errorMessage = "Invalid userName or password. Please try again."; // Custom error message for 400 status
      }
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="bg-[#CB0A31] h-full w-full">
      {/* making status white  */}
      <StatusBar style="light" />

      <View className="flex-row justify-around w-full absolute">
        <Image
          className="h-[160] w-[220] mt-10"
          source={require("../../../assets/images/logo.png")}
        />
      </View>
      {/* Input and Title */}

      <View className="h-full w-full flex justify-around pt-40 pb-10">
        {/* Title */}

        <View className="form  p-10 space-y-2">
          <Text className="text-white font-light text-xl">UserName</Text>

          <TextInput
            className="p-4 bg-white  rounded-2xl"
            style={style.Shadow}
            value={userName}
            onChangeText={(text) => setuserName(text)}
            placeholder="UserName "
          />

          <Text className="text-white font-light text-xl">Password</Text>
          <View>
            <TextInput
              className="p-4 bg-white  rounded-2xl"
              style={style.Shadow}
              // Set secureTextEntry prop to hide
              //password when showPassword is false
              secureTextEntry={!showPassword}
              placeholder="Enter Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            {password !== "" && (
              <MaterialCommunityIcons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={iconSize}
                color="black"
                onPress={toggleShowPassword}
                style={{
                  position: "absolute",
                  right: 20,
                  marginTop: 7,
                }}
              />
            )}
          </View>
          {/* forget button */}

          <TouchableOpacity
            className="flex items-end mb-5 mr-5"
            onPress={() => navigation.navigate("ForgetPassword")}
          >
            <Text className="text-white font-light">Forget Password</Text>
          </TouchableOpacity>

          {/* sign in button */}

          <TouchableOpacity
            style={style.Shadow2}
            className="py-4 m-4 rounded-xl bg-white"
            onPress={handleSignIn}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-black font-bold text-center">Sign in</Text>
            )}
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-white text-center "> Or</Text>

        {/* <View className="flex flex-row  justify-center items-center">
          <TouchableOpacity className="p-5">
            <Image source={require("../../../assets/images/google.png")} />
          </TouchableOpacity>

          <TouchableOpacity className="p-5">
            <Image source={require("../../../assets/images/facebook.png")} />
          </TouchableOpacity>
        </View> */}
        {/* For SinUp */}
        <View className="flex-row justify-center">
          <Text className="text-white">Don't have an account ?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text className="text-[#2B3384] font-bold ">Sign Up</Text>
            {/* <Text className="text-red-500 font-bold ">{Test}</Text> */}
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-3">
          <Text className="text-white">Haven't verify email ?</Text>
          <TouchableOpacity onPress={handleVerify}>
            <Text className="text-[#2B3384] font-bold   ">Verify Now </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  Shadow: {
    borderColor: "black",
    borderWidth: 2,
    overflow: "visible",
    shadowColor: "black",
    shadowRadius: 2,
    shadowOpacity: 2,
  },
  Shadow2: {
    borderColor: "red",
    borderWidth: 1,
    overflow: "visible",
    shadowColor: "#7B061E",
    shadowRadius: 1,
    shadowOpacity: 1,
  },
  icon: {
    position: "absolute",
    right: 60,
    top: 188,
    fontSize: 30,
  },
});
export default LoginScreen;
