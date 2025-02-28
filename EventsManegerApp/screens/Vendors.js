import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { services } from "./commonData";

const { width } = Dimensions.get("window"); // Get the screen width

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndices, setActiveIndices] = useState({}); // Track active card index per service

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
      <ScrollView
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
      </ScrollView>
      {/* Services */}
      // Vertical scroll layout for selected category
      <FlatList
        data={filteredVendors[0].vendors} // Use the first item's vendors array
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.serviceCardVertical}
              onPress={() =>
                navigation.navigate("VendorDetails", { vendor: item })
              }
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
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.verticalScrollContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    // margin: 5,
    display: "flex",
    marginTop: 5,
    paddingTop: 15,
    paddingLeft: 10,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
  },
  cards: {
    marginLeft: 20,
  },
  container: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    width: "100%",
  },

  categoriesContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 2,
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

  serviceCardVertical: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 100,
    height: 100,
  },
  serviceImageVertical: {
    width: "100%",
  },
  serviceInfoVertical: {
    display: "flex",
    flexDirection: "row",
    // padding: 15,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    padding: 5,
    width: "100%",
  },
  vendorDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "-5%",
    // backgroundColor: "blue",
  },
  vendorText: {
    marginLeft: 4,
    color: "#666",
  },
});

export default HomeScreen;
