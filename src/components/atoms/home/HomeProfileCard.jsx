import React from "react";
import { View } from "react-native";
import { Card, Avatar, Text, Button } from "react-native-paper";

function HomeProfileCard({ title, subtitle, email, imageSource }) {
  return (
    <View style={{ flex: 1, marginBottom: 3, padding: 3 }}>
      <Card
        style={{
          backgroundColor: "#f7f7f7",
          height: "auto",
          paddingTop: 5,
          paddingBottom: 5,
        }}
        elevation={2}
      >
        <Card.Content>
          <Avatar.Image source={imageSource} />
          <Text variant="titleLarge">{title}</Text>
          <Text variant="bodyLarge">{subtitle}</Text>
          <Text variant="bodyLarge">{email}</Text>
          <Card.Actions>
            <Button>Update</Button>
          </Card.Actions>
        </Card.Content>
      </Card>
    </View>
  );
}

export default HomeProfileCard;
