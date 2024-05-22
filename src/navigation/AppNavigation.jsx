import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../screens/OnboardingScreen.js";
import BottomTab from "../navigation/BottomTab.jsx";
import { getItem } from "../screens/utils/asyncStorage.js";
import LoginScreen from "../screens/LoginSignup/LoginScreen.js";
import RegisterScreen from "../screens/LoginSignup/RegisterScreen.js";
import HelpPage from "../screens/ProfileScreen/button/HelpPage.js";
import SafetyRulesPage from "../screens/ProfileScreen/button/SafetyRulesPage.js";
import PrivacyPolicyPage from "../screens/ProfileScreen/button/PrivacyPolicyPage.js";
import UserDetailsPage from "../screens/ProfileScreen/button/UserDetailsPage.js";
import ProfileSign from "../screens/ProfileScreen/ProfileSign.js";
import UserProfile from "../screens/ProfileScreen/UserProfile.js";
import { AuthContext } from "../Context/AuthContext.js";
import HomeScreen from "../screens/HomeScreen/HomeScreen.js";
import SearchResultScreen from "../screens/HomeScreen/SearchResultScreen.js";
import ChatHome from "../screens/ChatScreen/ChatHome.jsx";
import GroupPage from "../screens/ChatScreen/Private Message/GroupPage.jsx";
import ProfileHome from "../screens/ProfileScreen/ProfileHome.js";
import PopularScreen from "../screens/HomeScreen/Popular/PopularScreen.jsx";
import RecommendScreen from "../screens/HomeScreen/Popular/RecommendScreen.jsx";
import ForgetPassword from "../screens/LoginSignup/ForgetPassword.jsx";
import ResetPasswordScreen from "../screens/LoginSignup/ResetPasswordScreen.jsx";
import Friends from "../screens/ChatScreen/Private Message/Friends.jsx";
import MessagePage from "../screens/ChatScreen/Private Message/MessagePage.js";
import OtpCode from "../screens/LoginSignup/OtpCode.jsx";
import RegisterVerifyOtp from "../screens/LoginSignup/RegisterVerifyOtp.jsx";
import LoginVerifyOtp from "../screens/LoginSignup/LoginVerifyOtp.jsx";
import Favorite from "../screens/HomeScreen/Popular/Favorite.jsx";

const Stack = createStackNavigator();

const AppNavigation = () => {
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem("onboarded");

    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="ButtomTab"> */}
        <Stack.Navigator initialRouteName="BottomTab">
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{ headerShown: false }}
          />
          {/* Onboarding Screen */}
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          {/* Login Screen */}
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          {/* Sin Up */}
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          {/* comment review screen */}

          {/* HelpPage */}
          <Stack.Screen
            name="HelpPage"
            component={HelpPage}
            options={{ headerShown: false }}
          />
          {/* SafetyRulesPage */}
          <Stack.Screen
            name="SafetyRulesPage"
            component={SafetyRulesPage}
            options={{ headerShown: false }}
          />
          {/* PrivacyPolicyPage */}
          <Stack.Screen
            name="PrivacyPolicyPage"
            component={PrivacyPolicyPage}
            options={{ headerShown: false }}
          />
          {/* UserDetailsPage */}
          <Stack.Screen
            name="UserDetailsPage"
            component={UserDetailsPage}
            options={{ headerShown: false }}
          />
          {/* profile sign */}
          <Stack.Screen
            name="ProfileSign"
            component={ProfileSign}
            options={{ headerShown: false }}
          />
          {/* user profile */}
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AuthContext"
            component={AuthContext}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SearchResultScreen"
            component={SearchResultScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChatHome"
            component={ChatHome}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="GroupPage"
            component={GroupPage}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ProfileHome"
            component={ProfileHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PopularScreen"
            component={PopularScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecommendScreen"
            component={RecommendScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Friends"
            component={Friends}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MessagePage"
            component={MessagePage}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="OtpCode"
            component={OtpCode}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterVerifyOtp"
            component={RegisterVerifyOtp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginVerifyOtp"
            component={LoginVerifyOtp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Favorite"
            component={Favorite}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default AppNavigation;
