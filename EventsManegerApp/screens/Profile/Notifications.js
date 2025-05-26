import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {/* Replace with your notification list or message components */}
      <Text style={styles.message}>No new notifications</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Adjust background color as needed
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: "#999999", // Adjust text color
  },
});
