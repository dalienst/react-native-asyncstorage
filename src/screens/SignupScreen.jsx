import React from "react";
import { ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

function SignupScreen() {
  const { colors } = useTheme();
  return (
    <ScrollView style={{ backgroundColor: colors.background, padding: 5 }}>
      <View>
        <Text>Signup Screen</Text>
      </View>
    </ScrollView>
  );
}

export default SignupScreen;
