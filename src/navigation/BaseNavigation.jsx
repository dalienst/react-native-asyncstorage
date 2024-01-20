import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { publicLinks } from "./Links";
import { AppTheme } from "../assets/themes/Themes";
import CustomNavigationBar from "../components/layouts/CustomNavigationBar";
import { useAuth } from "../context/useAuth";

const Stack = createNativeStackNavigator();

const Home = React.lazy(() => import("../screens/HomeScreen"));
const Profile = React.lazy(() => import("../screens/ProfileScreen"));
const Card = React.lazy(() => import("../screens/CardScreen"));
const Login = React.lazy(() => import("../screens/LoginScreen"));
const Signup = React.lazy(() => import("../screens/SignupScreen"));

function BaseNavigation() {
  const { user, isLoading } = useAuth();
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      >
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: "Tech Africa Wallet" }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ title: "Profile" }}
            />
            <Stack.Screen
              name="Card"
              component={Card}
              options={{ title: "Card" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={publicLinks.Login} component={Login} />
            <Stack.Screen name={publicLinks.Signup} component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default BaseNavigation;
