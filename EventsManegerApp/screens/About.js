import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AboutScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          {/* App Logo/Icon Section */}
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons
              name="calendar-star"
              size={80}
              color="#6D28D9"
            />
            <Text style={styles.appName}>Manager</Text>
            <Text style={styles.tagline}>Discover your Events</Text>
          </View>

          {/* App Info Card */}
          <View style={styles.card}>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="information-outline"
                size={24}
                color="#2d4150"
              />
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Description</Text>
                <Text style={styles.infoDescription}>
                  Manager is your ultimate event discovery platform, connecting
                  you with the best local events, concerts, and activities in
                  your area.
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="cellphone-information"
                size={24}
                color="#2d4150"
              />
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Version</Text>
                <Text style={styles.infoValue}>1.0.0</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="account-group"
                size={24}
                color="#2d4150"
              />
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Developed By</Text>
                <Text style={styles.infoValue}>Manager Team</Text>
              </View>
            </View>
          </View>

          {/* Social Links */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <MaterialCommunityIcons
                name="facebook"
                size={24}
                color="#1877F2"
              />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <MaterialCommunityIcons
                name="twitter"
                size={24}
                color="#1DA1F2"
              />
              <Text style={styles.socialText}>Twitter</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <MaterialCommunityIcons name="web" size={24} color="#6D28D9" />
              <Text style={styles.socialText}>Website</Text>
            </TouchableOpacity>
          </View>

          {/* Legal Info */}
          <Text style={styles.legalText}>
            © 2025 Manager. All rights reserved.{"\n"}
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate("Terms")}
            >
              Terms of Service
            </Text>{" "}
            |{" "}
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate("Privacy")}
            >
              Privacy Policy
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d4150",
    marginLeft: 15,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6D28D9",
    marginTop: 15,
  },
  tagline: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    marginBottom: 25,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 15,
  },
  infoText: {
    flex: 1,
    marginLeft: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: "#2d4150",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  infoDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  socialButton: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    marginHorizontal: 5,
    elevation: 2,
  },
  socialText: {
    color: "#2d4150",
    marginTop: 8,
    fontSize: 12,
    fontWeight: "500",
  },
  legalText: {
    textAlign: "center",
    color: "#666",
    fontSize: 12,
    lineHeight: 18,
  },
  linkText: {
    color: "#6D28D9",
    fontWeight: "500",
  },
});
