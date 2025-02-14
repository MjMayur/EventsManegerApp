import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { services } from "./commonData";

export default function MyEventsScreens() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "upcoming", title: "Upcoming" },
    { key: "old", title: "Old" },
  ]);

  // Filter data for upcoming and old events
  const upcomingEvents = services[1].vendors.filter((item) => item.isUpcoming);
  const oldEvents = services[1].vendors.filter((item) => !item.isUpcoming);

  // Render scenes for each tab
  const renderScene = SceneMap({
    upcoming: () => <EventList data={upcomingEvents} />,
    old: () => <EventList data={oldEvents} />,
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.tabIndicator}
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
            activeColor="#2a5298"
            inactiveColor="#666"
          />
        )}
      />
    </View>
  );
}

// EventList component to render the list of events
const EventList = ({ data }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.serviceCardVertical}
        onPress={() => navigation.navigate("VendorDetails", { vendor: item })}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.serviceImageVertical}
        />
        <View style={styles.serviceInfoVertical}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <View style={styles.vendorDetail}>
            <MaterialIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.vendorText}>{item.rating}</Text>
          </View>
          <View style={styles.vendorDetail}>
            <MaterialIcons name="attach-money" size={16} color="#666" />
            <Text style={styles.vendorText}>{item.price}</Text>
          </View>
          <TouchableOpacity style={styles.bookNowButton}>
            <Text style={styles.bookNowButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )}
    contentContainerStyle={styles.verticalScrollContainer}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  tabBar: {
    backgroundColor: "#fff",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  tabIndicator: {
    backgroundColor: "#2a5298",
    height: 3,
  },
  serviceCardVertical: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImageVertical: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  serviceInfoVertical: {
    padding: 15,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  vendorDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  vendorText: {
    marginLeft: 4,
    color: "#666",
  },
  bookNowButton: {
    backgroundColor: "#2a5298",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 8,
  },
  bookNowButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  verticalScrollContainer: {
    paddingBottom: 20,
  },
});
