import React from "react";
import { ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import BannerImage from "../components/atoms/login/BannerImage";

function SignupScreen() {
  const { colors } = useTheme();
  return (
    <ScrollView style={{ backgroundColor: colors.background, padding: 5 }}>
      <BannerImage
        source={require("../assets/images/authentication/signupnobg.png")}
      />
    </ScrollView>
  );
}

export default SignupScreen;
