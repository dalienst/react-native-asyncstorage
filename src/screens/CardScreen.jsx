import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { AuthContext } from "../context/authContext";
import { useTheme } from "@react-navigation/native";
import HomeProfileCard from "../components/atoms/home/HomeProfileCard";
import { api } from "../api/axios";
import base64 from "react-native-base64";

function CardScreen() {
  const { colors } = useTheme();
  const { tokens, user } = useContext(AuthContext);
  const [person, setPerson] = useState([]);

  const decodedTokens = base64.decode(tokens.split(".")[1]);
  const decodedTokensObject = JSON.parse(decodedTokens);
  const userID = decodedTokensObject.user_id;

  const fetchPerson = async () => {
    if (!userID) {
      return;
    }
    try {
      const response = await api.get(`me/${userID}/`, {
        headers: {
          Authorization: `Bearer ${tokens}`,
        },
      });
      setPerson(response?.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPerson();
  }, [user]);

  return (
    <ScrollView style={{ backgroundColor: colors.background, padding: 5 }}>
      <HomeProfileCard
        title={person.username}
        subtitle={person.email}
        imageSource={require("../assets/images/home/2024logo.png")}
      />
      <View></View>
    </ScrollView>
  );
}

export default CardScreen;
