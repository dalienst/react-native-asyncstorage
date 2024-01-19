import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { publicLinks } from "./Links";
import { AppTheme } from "../assets/themes/Themes";
import CustomNavigationBar from "../components/layouts/CustomNavigationBar";

const Stack = createNativeStackNavigator();

const Home = React.lazy(() => import("../screens/HomeScreen"));
const Profile = React.lazy(() => import("../screens/ProfileScreen"));
const Card = React.lazy(() => import("../screens/CardScreen"));

function BaseNavigation() {
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator
        initialRouteName={publicLinks.Home}
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      >
        <Stack.Screen
          name={publicLinks.Home}
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name={publicLinks.Profile}
          component={Profile}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name={publicLinks.Card}
          component={Card}
          options={{ title: "Card" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default BaseNavigation;
