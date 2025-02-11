import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Conference",
    "Concert",
    "Workshop",
    "Sports",
    "Festival",
  ];

  const services = [
    {
      id: "1",
      type: "Venue",
      vendors: [
        {
          id: "1",
          name: "Grand Hall",
          image: "https://source.unsplash.com/800x600/?venue",
          rating: "4.5",
          price: "$500/hr",
        },
        {
          id: "2",
          name: "Royal Palace",
          image: "https://source.unsplash.com/800x600/?palace",
          rating: "4.8",
          price: "$700/hr",
        },
        {
          id: "3",
          name: "City Convention",
          image: "https://source.unsplash.com/800x600/?convention",
          rating: "4.3",
          price: "$600/hr",
        },
        {
          id: "4",
          name: "Garden Plaza",
          image: "https://source.unsplash.com/800x600/?garden",
          rating: "4.7",
          price: "$550/hr",
        },
      ],
    },
    {
      id: "2",
      type: "Caterer",
      vendors: [
        {
          id: "1",
          name: "Gourmet Delights",
          image: "https://source.unsplash.com/800x600/?catering",
          rating: "4.6",
          price: "$30/person",
        },
        {
          id: "2",
          name: "Tasty Bites",
          image: "https://source.unsplash.com/800x600/?food",
          rating: "4.4",
          price: "$25/person",
        },
        {
          id: "3",
          name: "Chef's Special",
          image: "https://source.unsplash.com/800x600/?chef",
          rating: "4.9",
          price: "$40/person",
        },
        {
          id: "4",
          name: "Healthy Eats",
          image: "https://source.unsplash.com/800x600/?healthy",
          rating: "4.7",
          price: "$35/person",
        },
      ],
    },
    {
      id: "3",
      type: "Decoration",
      vendors: [
        {
          id: "1",
          name: "Elegant Designs",
          image: "https://source.unsplash.com/800x600/?decoration",
          rating: "4.5",
          price: "$1000/event",
        },
        {
          id: "2",
          name: "Creative Touch",
          image: "https://source.unsplash.com/800x600/?decor",
          rating: "4.8",
          price: "$1200/event",
        },
        {
          id: "3",
          name: "Floral Magic",
          image: "https://source.unsplash.com/800x600/?flowers",
          rating: "4.6",
          price: "$900/event",
        },
        {
          id: "4",
          name: "Luxury Themes",
          image: "https://source.unsplash.com/800x600/?luxury",
          rating: "4.7",
          price: "$1500/event",
        },
      ],
    },
    {
      id: "4",
      type: "Photographer",
      vendors: [
        {
          id: "1",
          name: "Capture Moments",
          image: "https://source.unsplash.com/800x600/?photographer",
          rating: "4.7",
          price: "$300/hr",
        },
        {
          id: "2",
          name: "Lens Master",
          image: "https://source.unsplash.com/800x600/?camera",
          rating: "4.9",
          price: "$400/hr",
        },
        {
          id: "3",
          name: "Photo Artistry",
          image: "https://source.unsplash.com/800x600/?photography",
          rating: "4.8",
          price: "$350/hr",
        },
        {
          id: "4",
          name: "Shutterbug",
          image: "https://source.unsplash.com/800x600/?photo",
          rating: "4.6",
          price: "$320/hr",
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning, User!</Text>
          <Text style={styles.date}>{new Date().toDateString()}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <MaterialIcons name="notifications" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
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
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
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
      {services.map((service) => (
        <View key={service.id}>
          <Text style={styles.sectionTitle}>{service.type}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.serviceScrollContainer}
          >
            {service.vendors.map((vendor) => (
              <TouchableOpacity
                key={vendor.id}
                style={styles.serviceCard}
                onPress={() => navigation.navigate("VendorDetails", { vendor })}
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
                    <MaterialIcons name="attach-money" size={16} color="#666" />
                    <Text style={styles.vendorText}>{vendor.price}</Text>
                  </View>
                  <TouchableOpacity style={styles.bookNowButton}>
                    <Text style={styles.bookNowButtonText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: "#2a5298",
  },
  categoryText: {
    color: "#666",
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
  serviceScrollContainer: {
    marginBottom: 20,
  },
  serviceCard: {
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  serviceInfo: {
    padding: 12,
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
});

export default HomeScreen;
