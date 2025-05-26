import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import HomeScreen from "./HomeScreens";
import ProfileScreen from "./Profile/Profile";
import SettingsScreen from "./Profile/SettingsScreen";
import HelpScreen from "./Profile/HelpScreen"; // Ensure this file exists
import AboutScreen from "./Profile/About";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import NewEventScreen from "./Event/NewEvent";
import MyEventsScreens from "./Event/MyEventsScreens";
import ChangePasswordScreen from "./Authentication/ChangePasswordScreen";
import EventDetailsScreen from "./Vendors Screen/VendorDetail";
import Vendors from "./Vendors Screen/Vendors";
import Notifications from "./Profile/Notifications";
import VendorDetailsScreen from "./Vendors Screen/VendorDetail";
import TaskList from "./Event/TaskList";
import GuestList from "./Event/GuestList";
import { Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 60,
        },
        headerRight: () => (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")} // Help is in Stack now
              style={{ marginRight: 15 }}
            >
              <Ionicons name="notifications-outline" size={30} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")} // Help is in Stack now
              style={{ marginRight: 15 }}
            >
              <MaterialIcons name="account-circle" size={30} color="gray" />
            </TouchableOpacity>
          </>
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="My Events"
        component={MyEventsScreens}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="celebration" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Vendors"
        component={Vendors}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="group-add" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="New Event Screen"
        component={NewEventScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-heart"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }} // Hide header for bottom tabs
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen} // Now HelpScreen is registered in Stack
        options={{ title: "Help" }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen} // Now HelpScreen is registered in Stack
        options={{ title: "About" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen} // Now HelpScreen is registered in Stack
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name="Change Password"
        component={ChangePasswordScreen} // Now HelpScreen is registered in Stack
        options={{ title: "ChangePassword" }}
      />
      <Stack.Screen
        name="Vendor Details"
        component={VendorDetailsScreen} // Now HelpScreen is registered in Stack
        options={{ title: "VendorDetails" }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications} // Now HelpScreen is registered in Stack
        options={{ title: "Notifications" }}
      />
      <Stack.Screen
        name="Task List"
        component={TaskList} // Now TaskList is registered in Stack
        options={{
          title: "Task List",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")} // Profile is in Stack now
              style={styles.checkButtonContainer}
            >
              <View style={styles.filledCheckButton}>
                <MaterialIcons name="task-alt" size={24} color="white" />
              </View>
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontWeight: "600",
            color: "#2A2F4F",
          },
          headerStyle: {
            backgroundColor: "#F8FAFF",
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name="Guest List"
        component={GuestList}
        options={({ navigation }) => ({
          title: "Guest List",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={styles.checkButtonContainer}
            >
              {/* Option 1: Minimal outline with animation */}
              {/* <Animated.View style={styles.checkButton}>
                <MaterialIcons
                  name="task-alt"
                  size={28}
                  color="#4CAF50"
                  style={styles.checkIcon}
                />
              </Animated.View> */}

              {/* Option 2: Filled button with shadow */}
              <View style={styles.filledCheckButton}>
                <MaterialIcons name="task-alt" size={24} color="white" />
              </View>

              {/* Option 3: Badge with count */}
              {/* <View style={styles.badgeCheckButton}>
          <MaterialIcons name="task-alt" size={24} color="white" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </View> */}
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontWeight: "600",
            color: "#2A2F4F",
          },
          headerStyle: {
            backgroundColor: "#F8FAFF",
            elevation: 0,
            shadowOpacity: 0,
          },
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  middleTab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2a5298",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  middleTabButton: {
    top: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checkButtonContainer: {
    marginRight: 15,
    padding: 5,
  },
  checkButton: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderRadius: 20,
    padding: 8,
    borderWidth: 1.5,
    borderColor: "#4CAF50",
    transform: [{ scale: 1 }],
  },
  checkIcon: {
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  filledCheckButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  badgeCheckButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#FF5252",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
