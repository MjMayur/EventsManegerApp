import { createDrawerNavigator } from "@react-navigation/drawer";
import LogoutScreen from "./Logout";
import HomeTabs from "./HomeTabs";
import HelpScreen from "./HelpScreen";
import AboutScreen from "./About";

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen name="Help" component={HelpScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}
