import React, { useEffect } from "react";
import { View, Text } from "react-native";

export default function LogoutScreen({ navigation }) {
  useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Logging out...</Text>
    </View>
  );
}
