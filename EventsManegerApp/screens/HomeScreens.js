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
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: "https://example.com/party-header-image.jpg" }} // Replace with your image URL
          style={styles.headerImage}
        />
        <View style={styles.headerOverlay}>
          <View>
            <Text style={styles.greeting}>Hey it's Party time.</Text>
            <Text style={styles.date}>{new Date().toDateString()}</Text>
          </View>
          <TouchableOpacity
            style={styles.greeting}
            onPress={() => navigation.navigate("Notifications")}
          >
            <MaterialIcons name="notifications" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
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
      {selectedCategory === "All" ? (
        services.map((service) => (
          <View key={service.id} style={styles.serviceSection}>
            <Text style={styles.sectionTitle}>{service.type}</Text>

            <FlatList
              data={service.vendors}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              // onScroll={(e) => handleScroll(service.id, e)}
              snapToInterval={width - 32}
              snapToAlignment="start"
              decelerationRate="fast"
              renderItem={({ item: vendor }) => (
                <TouchableOpacity
                  key={vendor.id}
                  style={styles.serviceCard}
                  onPress={() =>
                    navigation.navigate("VendorDetails", { vendor })
                  }
                >
                  <Image
                    source={{ uri: vendor.image }}
                    style={styles.serviceImage}
                  />
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{vendor.name}</Text>
                    <View style={styles.vendorDetail}>
                      <MaterialIcons name="star" size={16} color="#FFD700" />
                      <Text style={styles.vendorText}>{vendor.rating}</Text>
                    </View>
                    <View style={styles.vendorDetail}>
                      <MaterialIcons
                        name="attach-money"
                        size={16}
                        color="#666"
                      />
                      <Text style={styles.vendorText}>{vendor.price}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookNowButton}>
                      <Text style={styles.bookNowButtonText}>Book Now</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
            />

            {/* Pagination Dots */}
            {/* <View style={styles.dotsContainer}>
              {service.vendors.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    activeIndices[service.id] === index && styles.activeDot,
                  ]}
                />
              ))}
            </View> */}
          </View>
        ))
      ) : (
        // Vertical scroll layout for selected category
        <FlatList
          data={filteredVendors[0].vendors} // Use the first item's vendors array
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.serviceCardVertical}
              onPress={() =>
                navigation.navigate("VendorDetails", { vendor: item })
              }
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
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  serviceSection: {
    marginBottom: 24,
  },
  serviceScrollContainer: {
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: "#fff",
    borderRadius: 12,

    marginBottom: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: width - 32, // Full width minus padding
  },
  serviceImage: {
    width: "100%",
    height: 200, // Increased height for full-screen cards
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  serviceInfo: {
    padding: 15,
  },
  serviceCardVertical: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImageVertical: {
    width: "100%",
    height: 200, // Increased height for full-screen cards
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
  headerContainer: {
    height: 200,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerImage: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  greeting: {
    marginTop: 120,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  date: {
    fontSize: 14,
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  // Add these new styles
  // dotsContainer: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 12,
  // },
  // dot: {
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   backgroundColor: "#ccc",
  //   marginHorizontal: 4,
  // },
  // activeDot: {
  //   width: 8,
  //   backgroundColor: "#2a5298",
  // },
});

export default HomeScreen;
