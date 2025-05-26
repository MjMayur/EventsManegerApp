import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { services, services1 } from "../commonData";

const { width } = Dimensions.get("window");
const responsiveSize = (size) => {
  const ratio = size / 375; // Base size from iPhone 13 mini
  return Math.round(ratio * width);
};
const Vendors = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("Cake");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndices, setActiveIndices] = useState({});

  const categories = [
    "Cake",
    "Children Entertainment",
    "Comedian",
    "DJ",
    "Event Decorator",
    "Event Equipment",
    "Event Security Staff",
    "Florist",
    "Hair Stylist",
    "Live Band",
    "Magician",
    "Makeup Artist",
    "MC / Host",
    "Photo Booth",
    "Photographer",
    "Singer",
    "Solo Musician",
    "Videographer",
  ];

  const filteredVendors = services1.filter(
    (service) => service.type === selectedCategory
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item)}
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.selectedCategoryButton,
      ]}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderVendorItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.serviceCardVertical}
        onPress={() => navigation.navigate("Vendor Details")}
      >
        <View style={styles.serviceInfoVertical}>
          <Image
            source={{ uri: item.image }}
            style={styles.serviceImageVertical}
          />
          <View style={styles.cards}>
            <Text style={styles.serviceName}>{item.name}</Text>
            <View style={styles.vendorDetail}>
              <Text style={styles.vendorText}>{item.price}</Text>
            </View>
            <View style={styles.vendorDetail}>
              <MaterialIcons name="star" size={16} color="#FFD700" />
              <Text style={styles.vendorText}>{item.rating}</Text>
            </View>
            <View style={styles.vendorDetail}>
              <MaterialIcons name="pin-drop" size={16} color="green" />
              <Text>{item.address} </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Horizontal Categories FlatList */}
      {/* <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
        renderItem={renderCategoryItem}
      /> */}
      {/* Vertical Vendors FlatList */}
      <FlatList
        data={filteredVendors[0].vendors}
        keyExtractor={(item) => item.id}
        renderItem={renderVendorItem}
        contentContainerStyle={styles.verticalScrollContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  verticalScrollContainer: {
    paddingTop: 14, // Reduced from 10
  },
  container: {
    backgroundColor: "#f8f9fa",
    flex: 1,
    paddingHorizontal: 16, // Changed from padding: 16
    paddingTop: 8, // Added separate top padding
  },
  categoriesContainer: {
    paddingVertical: 4, // Added vertical padding instead of fixed height
    marginBottom: 2, // Added bottom margin to reduce gap
    backgroundColor: "red",
  },
  categoryButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    elevation: 3,
    // marginBottom: -100,
    height: 40,
  },
  selectedCategoryButton: {
    backgroundColor: "#2a5298",
  },
  categoryText: {
    color: "#666",
    fontWeight: "500",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  card: {
    // marginTop: ,
    paddingTop: "5%",
    marginLeft: "8%",
    paddingLeft: 10,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
  },
  cards: {
    marginLeft: 30,
  },
  serviceCardVertical: {
    backgroundColor: "#fff",
    borderRadius: 1,
    marginBottom: 16,
    // elevation: 2,
  },
  serviceImageVertical: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 8,
    // elevation: 2,
    marginLeft: "-10%",
    marginTop: "-8%",
  },
  serviceInfoVertical: {
    flexDirection: "row",
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    // padding: 5,
    width: "100%",
  },
  vendorDetail: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: "-2%",
  },
  vendorText: {
    marginLeft: 4,
    color: "#666",
  },
});

export default Vendors;
