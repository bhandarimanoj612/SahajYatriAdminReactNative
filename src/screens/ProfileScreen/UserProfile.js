//import liraries
import React, { Component, useContext, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Info from "./button/Info";
import { AuthContext } from "../../Context/AuthContext";
var { width, height } = Dimensions.get("window");
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Image } from "expo-image";

import { BASE_URL, IMG_URL } from "../utils/config";
import axios from "axios";
// create a component
const UserProfile = ({}) => {
  const navigation = useNavigation();
  const [userImage, setUserImage] = useState(null); // State to hold user image path for user profile
  const isFocused = useIsFocused(); //this is used for making the item auto refresh

  const { userName, userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}ProfileImg/get/${userInfo.email}`
        );
        if (response.status === 200) {
          setUserImage(response.data.imageUrl);
        } else {
          console.error("Failed to fetch user image:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };

    if (isFocused) fetchUserImage();
    // // Poll the server every 10 seconds to fetch the updated user image
    // const interval = setInterval(fetchUserImage, 3000);

    // // Clean up the interval on component unmount
    // return () => clearInterval(interval);
  }, [isFocused]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      className="  dark:bg-neutral-950 "
      contentContainerStyle={{ paddingBottom: 20, marginTop: 10 }}
    >
      <StatusBar style="light" />
      <View className="w-full dark:bg-neutral-950  flex-row  justify-between items-center mt-10"></View>

      {/* Person Details  */}
      <View>
        <View
          className="flex-row justify-center "
          style={{
            shadowColor: "black",
            shadowRadius: 3,
            shadowOffset: { width: 4, height: 7 },
            shadowOpacity: 1,
          }}
        >
          <View className="items-center rounded-full overflow-hidden h-44 w-44 ">
            <TouchableOpacity
              onPress={() => navigation.navigate("UserDetailsPage")}
            >
              <Image
                source={
                  userImage
                    ? { uri: `${IMG_URL}${userImage}` }
                    : require("../../../assets/images/welcome.png")
                }
                style={{ height: height * 0.21, width: width * 0.5 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          className="mt-10 bg-white rounded-full items-center dark:bg-neutral-950  ml-14 mr-14"
          style={{
            shadowColor: "black",
            shadowRadius: 1,
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 1,
          }}
        >
          <Text className="text-center text-xl  dark:text-white  font-light">
            {userName} {/* Manoj Bhandari */}
          </Text>
        </View>

        <View className=" dark:bg-neutral-950 mt-10">
          <Info />
        </View>
      </View>
    </ScrollView>
  );
};

//make this component available to the app
export default UserProfile;
