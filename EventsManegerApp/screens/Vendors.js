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
import { services } from "./commonData";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndices, setActiveIndices] = useState({});

  const categories = [
    "All",
    "Venues",
    "Caterers",
    "Photographer",
    "Decorations",
  ];

  const filteredVendors =
    selectedCategory === "All"
      ? services
      : services.filter((service) => service.type === selectedCategory);

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
        onPress={() => navigation.navigate("VendorDetails", { vendor: item })}
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
  );

  return (
    <View style={styles.container}>
      {/* Horizontal Categories FlatList */}
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
        renderItem={renderCategoryItem}
      />

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
    marginTop: 20,
  },
  container: {
    backgroundColor: "#f8f9fa",
    flex: 1,
    padding: 16,
  },
  categoriesContainer: {
    paddingBottom: 10,
  },
  categoryButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    elevation: 3,
    marginBottom: "-100%",
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
    marginTop: 5,
    paddingTop: 15,
    marginLeft: 50,
    paddingLeft: 10,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
  },
  cards: {
    marginLeft: 20,
  },
  serviceCardVertical: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    // elevation: 2,
  },
  serviceImageVertical: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    marginLeft: "-20%",
    marginTop: "-10%",
  },
  serviceInfoVertical: {
    flexDirection: "row",
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
    // marginTop: "-2%",
  },
  vendorText: {
    marginLeft: 4,
    color: "#666",
  },
});

export default HomeScreen;
