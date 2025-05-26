import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Photo Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <MaterialCommunityIcons name="account" size={60} color="#fff" />
              <View style={styles.cameraIcon}>
                <MaterialCommunityIcons
                  name="camera-plus"
                  size={20}
                  color="#fff"
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.changePhotoButton}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* User Info Section */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="phone" size={24} color="#2d4150" />
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>+1 234 567 890</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="lock" size={24} color="#2d4150" />
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Password</Text>
              <Text style={styles.infoValue}>••••••••</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Change Password")}
          >
            <MaterialCommunityIcons name="key" size={24} color="#2d4150" />
            <Text style={styles.menuText}>Change Password</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#a3a3a3"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("About")}
          >
            <MaterialCommunityIcons
              name="information"
              size={24}
              color="#2d4150"
            />
            <Text style={styles.menuText}>About</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#a3a3a3"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Help")}
          >
            <MaterialCommunityIcons
              name="help-circle"
              size={24}
              color="#2d4150"
            />
            <Text style={styles.menuText}>Help & Support</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#a3a3a3"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.lastMenuItem]}
            onPress={() => navigation.navigate("Login")}
          >
            <MaterialCommunityIcons name="logout" size={24} color="#2d4150" />
            <Text style={styles.menuText}>Log Out</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#a3a3a3"
            />
          </TouchableOpacity>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d4150",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#2d4150",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4a90e2",
    borderRadius: 15,
    padding: 5,
  },
  changePhotoButton: {
    marginTop: 10,
  },
  changePhotoText: {
    color: "#4a90e2",
    fontSize: 16,
    fontWeight: "500",
  },
  infoContainer: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  infoText: {
    marginLeft: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: "#a3a3a3",
  },
  infoValue: {
    fontSize: 16,
    color: "#2d4150",
    marginTop: 5,
  },
  menuContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 15,
    paddingHorizontal: 20,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#2d4150",
    marginLeft: 15,
  },
});
