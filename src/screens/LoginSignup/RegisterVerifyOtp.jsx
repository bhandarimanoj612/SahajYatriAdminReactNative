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

const RegisterVerifyOtp = ({ navigation, route }) => {
  const [otp, setOtp] = useState("");
  const { email } = route.params;

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
        className="h-[150] w-[220] mt-32 mb-11"
        source={require("../../../assets/images/logo.png")}
      />
      <Text style={styles.title}>Enter OTP</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CB0A31",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
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

export default RegisterVerifyOtp;
