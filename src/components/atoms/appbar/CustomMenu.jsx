import React from "react";
import { Appbar, Menu } from "react-native-paper";
import { useAuth } from "../../../context/useAuth";
import { publicLinks } from "../../../navigation/Links";

const CustomMenu = ({ navigation }) => {
  const { user } = useAuth;
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action icon="menu" color="#ffffff" onPress={openMenu} />
        }
      >
        {user ? (
          <>
            <Menu.Item
              title="Dashboard"
              onPress={() => navigation.navigate(publicLinks.Home)}
            />
            <Menu.Item
              title="Profile"
              onPress={() => navigation.navigate(publicLinks.Profile)}
            />
            <Menu.Item
              title="Card"
              onPress={() => navigation.navigate(publicLinks.Card)}
            />
          </>
        ) : (
          <>
            {/* Menu items for non-authenticated users */}
            <Menu.Item
              title="Sign Up"
              onPress={() => navigation.navigate(publicLinks.Signup)}
            />
            <Menu.Item
              title="Log In"
              onPress={() => navigation.navigate(publicLinks.Login)}
            />
          </>
        )}
      </Menu>
    </>
  );
};

export default CustomMenu;
