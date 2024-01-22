import React from "react";
import { Image, View } from "react-native";
import { Card } from "react-native-paper";

function BannerImage({source}) {
  return (
    <View style={{ flex: 1, marginBottom: 3, padding: 3, justifyContent:"center", alignItems:"center" }}>
      <Image
        source={source}
        style={{height:300, width:300, objectFit:"cover"}}
      />
    </View>
  );
}

export default BannerImage;
