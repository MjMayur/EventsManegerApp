import "react-native-gesture-handler";
import React from "react";
import Navigation from "./screens/Navigation";
import { MenuProvider } from "react-native-popup-menu";

export default function App() {
  return (
    <MenuProvider>
      <Navigation />
    </MenuProvider>
  );
}
