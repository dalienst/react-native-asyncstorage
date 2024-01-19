import React from "react";
import { ScrollView, Text, View } from "react-native";
import HomeProfileCard from "../components/atoms/home/HomeProfileCard";
import { avatar } from "../assets/images/home/2024logo.png";

function HomeScreen() {
  return (
    <ScrollView style={{backgroundColor:"#d5d5d5", padding:5}}>
      <HomeProfileCard
        title="Dalienst"
        subtitle="Dalienst Owino"
        imageSource={require("../assets/images/home/2024logo.png")}
      />
    </ScrollView>
  );
}

export default HomeScreen;
