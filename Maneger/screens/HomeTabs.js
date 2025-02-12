import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreens";
import ProfileScreen from "./Profile";
import SettingsScreen from "./SettingsScreen";
import HelpScreen from "./HelpScreen";
import AboutScreen from "./About";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import NewEventScreen from "./NewEvent";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 60, // Adjust the height of the tab bar
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="My Events"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="celebration" size={size} color={color} />
          ),
        }}
      />

      {/* Middle Tab with Custom Size */}
      <Tab.Screen
        name="New Event"
        component={NewEventScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.middleTab}>
              <MaterialIcons name="add-circle" size={32} color="white" />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="AboutTab"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  middleTab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2a5298", // Custom background color for the middle tab
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40, // Adjust this to position the tab properly
  },
  middleTabButton: {
    top: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
