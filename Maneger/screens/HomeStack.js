import { createStackNavigator } from "@react-navigation/stack";
import HomeTabs from "./HomeTabs";
import HelpScreen from "./HelpScreen";
import AboutScreen from "./About";
// import AboutScreen from "./AboutScreen";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={HomeTabs} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}
