import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

function LoginScreen() {
    const { colors } = useTheme();
  return (
    <ScrollView style={{ backgroundColor: colors.background, padding: 5 }}>
      <View></View>
    </ScrollView>
  );
}

export default LoginScreen