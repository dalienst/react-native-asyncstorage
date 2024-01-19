import React from "react";
import { Appbar, Menu } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import { publicLinks } from "../../navigation/Links";

function CustomNavigationBar({ navigation, route, options, back }) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { colors } = useTheme();
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header
      style={{ backgroundColor: colors.appbar, color: colors.appbarTitle }}
    >
      {back ? (
        <Appbar.BackAction onPress={navigation.goBack} color="#fff" />
      ) : null}

      <Appbar.Content
        title={title}
        titleStyle={{ color: colors.appbarTitle, fontWeight: "bold" }}
      />
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="#ffffff" onPress={openMenu} />
          }
        >
          <Menu.Item
            title="Profile"
            onPress={() => navigation.navigate(publicLinks.Profile)}
          />
          <Menu.Item
            title="Card"
            onPress={() => navigation.navigate(publicLinks.Card)}
          />
          <Menu.Item title="Sign Up" />
          <Menu.Item title="Log In" />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}

export default CustomNavigationBar;
