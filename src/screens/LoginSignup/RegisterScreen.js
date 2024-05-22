import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const iconSize = Platform.OS === "android" ? 43 : 35; //for password eye size for differenct screen
const RegisterScreen = () => {
  const navigation = useNavigation();
  // for show hide password

  // // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // for calling api for registr from backend
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState(""); // Default role set to 'customer'
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [items, setItems] = useState([
    { label: "Admin", value: "Admin" },
    { label: "Travel", value: "Travel" },
    { label: "Hotel", value: "Hotel" },
    { label: "Vehicle", value: "Vehicle" },
  ]);
  console.log("you have selected ", role);
  const handleRegister = () => {
    // making api response to handle  register api
    axios
      .post(`${BASE_URL}Auth/register`, {
        userName,
        email,
        password,
        role: role,
      })
      .then((response) => {
        //handle succssfully
        Alert.alert("Registration Successful", response.data);
        navigation.navigate("RegisterVerifyOtp", {
          email: email,
        });
      })
      .catch((error) => {
        Alert.alert("Registration Failure", error.response.data);
      });
  };
  return (
    <View className="bg-[#CB0A31] h-full w-full">
      {/* making status white  */}
      <StatusBar style="light" />
      <View className="flex-row justify-around w-full absolute">
        <Image
          className="h-[150] w-[220] mt-10"
          source={require("../../../assets/images/logo.png")}
        />
      </View>
      {/* Input and Title */}
      <View className="h-full w-full flex justify-around pt-40 pb-10">
        {/* Title */}
        <View className="form  p-10 space-y-2">
          {/* User Name */}
          <Text className="text-white font-light text-xl">User Name</Text>
          <TextInput
            className="p-4 bg-white  rounded-2xl"
            style={style.Shadow}
            onChangeText={(text) => setUserName(text)} //for connnecting backend and frontend
            placeholder="UserName"
          />
          <Text className="text-white font-light text-xl">Email</Text>
          <TextInput
            className="p-4 bg-white  rounded-2xl"
            style={style.Shadow}
            onChangeText={(text) => setEmail(text)} //for connnecting backend and frontend
            placeholder="Email Address"
          />
          <Text className="text-white font-light text-xl">Password</Text>
          <View>
            <TextInput
              className="p-4 bg-white  rounded-2xl"
              style={style.Shadow}
              // Set secureTextEntry prop to hide
              //password when showPassword is false
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
              placeholder="Enter Password"
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
          <Text style={style.label}>Role</Text>
          <DropDownPicker
            open={open}
            value={role}
            items={items}
            setOpen={setOpen}
            setValue={setRole}
            setItems={setItems}
          />

          <View className="flex items-end mb-5 mr-5"></View>
          {/* sign in button */}
          <TouchableOpacity
            style={style.Shadow2}
            className="py-4 m-4 rounded-xl bg-gray-100"
            onPress={handleRegister}
          >
            <Text className="text-black font-bold text-center">
              Create Account
            </Text>
          </TouchableOpacity>
          <Text className="text-xl text-white text-center "> Or</Text>
        </View>
        {/* <View className="flex flex-row  justify-center items-center">
          <TouchableOpacity className="p-5">
            <Image source={require("../../../assets/images/google.png")} />
          </TouchableOpacity>
          <TouchableOpacity className="p-5">
            <Image source={require("../../../assets/images/facebook.png")} />
          </TouchableOpacity>
        </View> */}
        {/* For SinUp */}
        <View className="flex-row justify-center pt-5">
          <Text className="text-white">Already have account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text className="text-blue-800 font-bold ">Login</Text>
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
    top: 289,
    fontSize: 35,
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});
export default RegisterScreen;
