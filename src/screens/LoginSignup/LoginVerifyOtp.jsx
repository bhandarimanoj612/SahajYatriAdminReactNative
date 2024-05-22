import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import OTPTextView from "react-native-otp-textinput";
import { Image } from "react-native";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { TextInput } from "react-native";

const LoginVerifyOtp = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${BASE_URL}Auth/verify-email`, {
        email: email,
        verificationCode: otp,
      });

      if (response.status === 200) {
        Alert.alert("Success", "OTP verified successfully");
        navigation.navigate("LoginScreen", {
          email: email,
          OTP: otp,
        });
      } else {
        Alert.alert("Error", "OTP verification failed");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Error",
        "An error occurred while verifying OTP. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        className="h-[150] w-[220] mt-10 mb-5"
        source={require("../../../assets/images/logo.png")}
      />

      <Text style={styles.title} className="mr-44">
        Email
      </Text>
      <TextInput
        className="pl-4 w-80 h-11 mb-5  bg-white  rounded-2xl"
        style={styles.Shadow}
        value={email}
        onChangeText={setEmail}
        placeholder="Please enter your email address"
      />
      <Text style={styles.title} className="mr-40">
        Enter OTP
      </Text>
      <OTPTextView
        containerStyle={styles.otpInput}
        handleTextChange={setOtp}
        inputCount={6}
        keyboardType="numeric"
        tintColor="#2B3384"
        textInputStyle={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
      {/* For SinUp */}
      <View className="flex-row justify-center mt-10">
        <Text className="text-white">Don't have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text className="text-blue-800 font-bold ">Sign Up</Text>
          {/* <Text className="text-red-500 font-bold ">{Test}</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#CB0A31",
  },
  Shadow: {
    borderColor: "black",
    borderWidth: 2,
    overflow: "visible",
    shadowColor: "black",
    shadowRadius: 2,
    shadowOpacity: 2,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: "#fff",
  },
  otpInput: {
    width: "80%",
    height: 60,
    marginBottom: 20,
    marginRight: 30,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 10,
    fontSize: 20,
    color: "#fff",
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});

export default LoginVerifyOtp;
