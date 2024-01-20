import React from "react";
import { Appbar } from "react-native-paper";

const BackAction = ({ onPress }) => {
  return <Appbar.BackAction onPress={onPress} color="#fff" />;
};

export default BackAction;
