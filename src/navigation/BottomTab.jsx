import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ProfileHome from "../screens/ProfileScreen/ProfileHome.js";
import HomeScreen from "../screens/HomeScreen/HomeScreen.js";
import ChatHome from "../screens/ChatScreen/ChatHome.jsx";
import { useColorScheme } from "nativewind";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const { colorScheme } = useColorScheme();

  // using gradiation for better look color
  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      position: "absolute",
      borderTopRightRadius: 200,
      right: 0,
      left: 0,
      height: 65,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 20,
      borderRadius: 50,
      justifyContent: "center",
      // backgroundColor: "#2B3384",
      backgroundColor: colorScheme === "dark" ? "#242323" : "#CB0A31", //for customizing dark mode to button  tab
      marginBottom: 20,

      shadowColor: "#000",
      shadowOffset: {
        width: 4,
        height: 11,
      },
      shadowOpacity: 50.58,
      shadowRadius: 10.5,
      elevation: 646,
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {/* HomeScreen */}
      {/* ProfileHome */}
      <Tab.Screen
        name="ProfileHome"
        component={ProfileHome}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={focused ? 30 : 20}
                color={focused ? "white" : "white"}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "grid" : "home-outline"}
                size={focused ? 35 : 20}
                color={focused ? "white" : "white"}
              />
            );
          },
        }}
      />
      {/* chats */}
      <Tab.Screen
        name="ChatHome"
        component={ChatHome}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={
                  focused ? "chatbubbles-sharp" : "chatbubble-ellipses-outline"
                }
                size={focused ? 30 : 22}
                color={focused ? "white" : "white"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
