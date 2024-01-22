import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { publicLinks } from "./Links";
import { AppTheme } from "../assets/themes/Themes";
import CustomNavigationBar from "../components/layouts/CustomNavigationBar";
import { useAuth } from "../context/useAuth";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CardScreen from "../screens/CardScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { AuthContext } from "../context/authContext";

const Stack = createNativeStackNavigator();

function BaseNavigation() {
  const { isLoading, isSignedIn } = useContext(AuthContext);

  // if (isLoading) {
  //   // We haven't finished checking for the token yet
  //   return <SplashScreen />;
  // }
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      >
        
        {isSignedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Tech Africa Wallet" }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: "Profile" }}
            />
            <Stack.Screen
              name="Card"
              component={CardScreen}
              options={{ title: "Card" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={publicLinks.Login} component={LoginScreen} />
            <Stack.Screen name={publicLinks.Signup} component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default BaseNavigation;
