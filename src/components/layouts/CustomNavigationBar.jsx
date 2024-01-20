import React from "react";
import { Appbar, Menu } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import CustomMenu from "../atoms/appbar/CustomMenu";
import BackAction from "../atoms/appbar/BackAction";

function CustomNavigationBar({ navigation, route, options, back }) {
  const { colors } = useTheme();
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header
      style={{ backgroundColor: colors.appbar, color: colors.appbarTitle }}
    >
      {back ? <BackAction onPress={navigation.goBack} /> : null}

      <Appbar.Content
        title={title}
        titleStyle={{ color: colors.appbarTitle, fontWeight: "bold" }}
      />
      {!back ? <CustomMenu navigation={navigation} /> : null}
    </Appbar.Header>
  );
}

export default CustomNavigationBar;
