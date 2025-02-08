import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeTabs from "./HomeTabs";
import LogoutScreen from "./Logout";
import AboutScreen from "./About";
import HelpScreen from "./HelpScreen";

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen name="Help" component={HomeTabs} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}
