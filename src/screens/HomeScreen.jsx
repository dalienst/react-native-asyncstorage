import React, { useContext, useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import HomeProfileCard from "../components/atoms/home/HomeProfileCard";
import { useTheme } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import { api } from "../api/axios";

function HomeScreen() {
  const { colors } = useTheme();
  const { user, tokens } = useContext(AuthContext);
  const [person, setPerson] = useState([]);

  console.log(user)

  const fetchPerson = async () => {
    if (!user?.user_id) {
      return;
    }
    try {
      const response = await api.get(`me/${user?.user_id}/`, {
        headers: {
          Authorization: `Bearer ${tokens?.access}`,
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
        subtitle="Dalienst Owino"
        imageSource={require("../assets/images/home/2024logo.png")}
      />
    </ScrollView>
  );
}

export default HomeScreen;
