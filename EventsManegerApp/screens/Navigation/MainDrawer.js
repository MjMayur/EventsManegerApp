// MainDrawer.js
import { createDrawerNavigator } from "@react-navigation/drawer";
import LogoutScreen from "../Authentication/Logout";
import HomeTabs from "../HomeTabs";
import HelpScreen from "../Profile/HelpScreen";

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "left",
      }}
    >
      <Drawer.Screen name="Main" component={HomeTabs} />
      <Drawer.Screen name="Help" component={HelpScreen} />
      <Drawer.Screen name="About" component={HomeTabs} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}
