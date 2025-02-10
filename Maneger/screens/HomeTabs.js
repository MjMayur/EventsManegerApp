import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
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
  const upcomingEvents = [
    {
      id: "1",
      title: "Tech Summit 2024",
      date: "March 15, 2024",
      location: "Convention Center",
      image: "https://source.unsplash.com/800x600/?conference",
    },
    {
      id: "2",
      title: "Music Festival",
      date: "April 20, 2024",
      location: "Central Park",
      image: "https://source.unsplash.com/800x600/?concert",
    },
    // Add more events...
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
          placeholder="Search events..."
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

      {/* Upcoming Events */}
      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      <FlatList
        data={upcomingEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventCard}
            onPress={() => navigation.navigate("EventDetails", { event: item })}
          >
            <Image source={{ uri: item.image }} style={styles.eventImage} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <View style={styles.eventDetail}>
                <MaterialIcons name="date-range" size={18} color="#666" />
                <Text style={styles.eventText}>{item.date}</Text>
              </View>
              <View style={styles.eventDetail}>
                <MaterialIcons name="location-on" size={18} color="#666" />
                <Text style={styles.eventText}>{item.location}</Text>
              </View>
              <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Register Now</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
      />
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
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  eventInfo: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  eventDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  eventText: {
    marginLeft: 8,
    color: "#666",
  },
  registerButton: {
    backgroundColor: "#2a5298",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
