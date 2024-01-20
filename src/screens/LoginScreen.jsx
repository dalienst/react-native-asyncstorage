import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import { TextInput, useTheme, Button, Text } from "react-native-paper";
import BannerImage from "../components/atoms/login/BannerImage";
import { AuthContext } from "../context/authContext";
import { Formik } from "formik";
import { LoginSchema } from "../validation/LoginValidation";

const LoginScreen = () => {
  const { loginUser, setIsSignedIn } = useContext(AuthContext);
  const { colors } = useTheme();
  return (
    <ScrollView style={{ backgroundColor: colors.background, padding: 5 }}>
      <BannerImage
        source={require("../assets/images/authentication/loginnobg.png")}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          padding: 10,
        }}
      >
        <Formik
          validationSchema={LoginSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await loginUser(values);
              // TODO: Add snackbar
              alert("Welcome Back");
              setIsSignedIn(true);
            } catch (error) {
              alert("Wrong Password or Email");
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <TextInput
                name="email"
                mode="outlined"
                label="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
                style={{ width: "100%", marginTop: 10 }}
              />
              {errors.email && (
                <Text
                  style={{
                    color: "red",
                    fontStyle: "italic",
                    textAlign: "left",
                  }}
                >
                  {errors.email}
                </Text>
              )}
              <TextInput
                name="password"
                mode="outlined"
                label="Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
                style={{ width: "100%", marginTop: 10 }}
              />
              {errors.password && (
                <Text
                  style={{
                    color: "red",
                    fontStyle: "italic",
                    textAlign: "left",
                  }}
                >
                  {errors.password}
                </Text>
              )}
              <Button
                mode="contained"
                onPress={handleSubmit}
                disabled={!isValid}
                style={{ width: "100%", marginTop: 10 }}
              >
                Log In
              </Button>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
