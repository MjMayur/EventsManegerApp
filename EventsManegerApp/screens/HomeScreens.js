import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { services } from "./commonData";

const { width } = Dimensions.get("window"); // Get the screen width

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [timer, setTimer] = useState(0); // Timer state

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    // const minutes = Math.floor(time / 60);
    // const seconds = time % 60;
    // return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const categories = [
    "All",
    "Venues",
    "Caterers",
    "Photographer",
    "Decorations",
  ];

  // Filter vendors based on the selected category
  const filteredVendors =
    selectedCategory === "All"
      ? services
      : services.filter((service) => service.type === selectedCategory);

  return (
    <ScrollView style={styles.container}>
      {/* Header with enlarged image and timer */}
      <View style={styles.headerContainer}>
        <View style={styles.headerOverlay}>
          <Text style={styles.timer}>{formatTime(timer)}</Text>
        </View>
      </View>

      {/* Categories */}
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      {/* Vendors in horizontal row */}
      <View style={styles.vendorsContainerWithBorder}>
        {/* <Text style={styles.vendors}>Vendors</Text> */}

        <FlatList
          data={filteredVendors[0].vendors} // Use the first item's vendors array
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.vendorCard}
              onPress={() => navigation.navigate("Vendor Details")}
            >
              <MaterialIcons name="store" size={40} color="#2a5298" />
              <View style={styles.vendorInfo}>
                <Text style={styles.vendorName}>{item.name}</Text>
                <View style={styles.vendorDetail}>
                  <MaterialIcons name="star" size={16} color="#FFD700" />
                  <Text style={styles.vendorText}>{item.rating}</Text>
                </View>
                <View style={styles.vendorDetail}>
                  <MaterialIcons name="attach-money" size={16} color="#666" />
                  <Text style={styles.vendorText}>{item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.vendorsContainer}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  vendors: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    // marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,

    // marginLeft: 12,
  },
  vendorsContainerWithBorder: {
    // borderWidth: 1, // Border width
    // borderColor: "#ccc", // Border color
    borderRadius: 8, // Rounded corners
    // padding: 16, // Padding inside the border
    marginBottom: 5, // Margin at the bottom
    // margin: 8,
    backgroundColor: "#f8f9fa",
  },
  headerContainer: {
    height: 450, // Reduced height for the header
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2a5298",
    marginBottom: 5, // Solid background color instead of an image
  },
  headerOverlay: {
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  categoriesContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  categoryButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  vendorsContainer: {
    // paddingHorizontal: 16,
  },
  vendorCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 127, // Smaller card width
    // marginRight: 16,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    // marginBottom: 20,
    margin: 5,
  },
  vendorInfo: {
    alignItems: "center",
    marginTop: 8,
  },
  vendorName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  vendorDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  vendorText: {
    // marginLeft: 4,
    color: "#666",
    fontSize: 12,
  },
});

export default HomeScreen;
