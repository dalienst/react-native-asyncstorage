import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { AuthContext } from "../context/authContext";
import { useTheme } from "@react-navigation/native";
import HomeProfileCard from "../components/atoms/home/HomeProfileCard";
import { api } from "../api/axios";
import base64 from "react-native-base64";

function ProfileScreen() {
  const { colors } = useTheme();
  const { tokens, user } = useContext(AuthContext);
  const [person, setPerson] = useState([]);
  const [profile, setProfile] = useState([]);

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

  const fetchProfile = async () => {
    if (!userID) {
      return;
    }
    try {
      const response = await api.get(`profile/${userID}/`, {
        headers: {
          Authorization: `Bearer ${tokens}`,
        },
      });
      setProfile(response?.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPerson();
    fetchProfile();
  }, [user]);


  return (
    <ScrollView style={{ backgroundColor: colors.background, padding: 5 }}>
      <HomeProfileCard
        title={`${profile.firstname} ${profile.lastname}`}
        imageSource={
          profile.image
            ? { uri: profile.image }
            : require("../assets/images/home/2024logo.png")
        }
      />
    </ScrollView>
  );
}

export default ProfileScreen;
