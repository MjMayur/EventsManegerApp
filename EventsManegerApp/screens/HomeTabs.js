import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreens";
import ProfileScreen from "./Profile";
import SettingsScreen from "./SettingsScreen";
import HelpScreen from "./HelpScreen"; // Ensure this file exists
import AboutScreen from "./About";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import NewEventScreen from "./NewEvent";
import MyEventsScreens from "./MyEventsScreens";
import ChangePasswordScreen from "./ChangePasswordScreen";

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
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")} // Help is in Stack now
            style={{ marginRight: 15 }}
          >
            <MaterialIcons name="account-circle" size={24} color="gray" />
          </TouchableOpacity>
        ),
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
        name="New Event"
        component={NewEventScreen}
        options={{
          tabBarIcon: () => (
            <View style={styles.middleTab}>
              <MaterialIcons name="add-circle" size={32} color="white" />
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={styles.middleTabButton}
              activeOpacity={0.8}
              onPress={() => {
                props.onPress();
              }}
            />
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
});
