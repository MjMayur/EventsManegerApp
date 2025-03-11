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

        {/* <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Task Progress</Text>
            <View style={styles.progressBar}>
              <View
                style={
                  [
                    // styles.progressFill,
                    // {
                    //   width: `${
                    //     (taskProgress.completed / taskProgress.total) * 100
                    //   }%`,
                    // },
                  ]
                }
              />
            </View>
            <Text style={styles.progressText}>80%</Text>
          </View> */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Task Progress</Text>
          <View style={styles.progressBar}>
            <View
            // style={[
            //   styles.progressFill,
            //   {
            //     width: `${
            //       (taskProgress.completed / taskProgress.total) * 100
            //     }%`,
            //   },
            // ]}
            />
          </View>
          <Text style={styles.progressText}>80% tasks completed</Text>
        </View>
        {/* Guest List Summary */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Guest List Summary</Text>
          <View style={styles.guestSummaryContainer}>
            <View style={styles.guestSummaryItem}>
              <Text style={styles.guestSummaryNumber}>200</Text>
              <Text style={styles.guestSummaryLabel}>Total Guests</Text>
            </View>
            <View style={styles.guestSummaryItem}>
              <Text style={styles.guestSummaryNumber}>150</Text>
              <Text style={styles.guestSummaryLabel}>Confirmed</Text>
            </View>
            <View style={styles.guestSummaryItem}>
              <Text style={styles.guestSummaryNumber}>50</Text>
              <Text style={styles.guestSummaryLabel}>Pending</Text>
            </View>
          </View>
        </View>

        {/* Budget Tracker */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Budget Tracker</Text>
          {/* <View style={styles.budgetCard}> */}
          {/* Progress Bar */}
          <View style={styles.budgetProgressBar}>
            <View
              style={[
                styles.budgetProgressFill,
                { width: `${(40000 / 200000) * 100}%` }, // Calculate percentage spent
              ]}
            />
          </View>

          {/* Spent and Remaining */}
          <View style={styles.budgetDetails}>
            <View style={styles.budgetItem}>
              <MaterialIcons name="money-off" size={20} color="#FF6B6B" />
              <Text style={[styles.budgetText, { color: "#FF6B6B" }]}>
                Spent: ₹40,000
              </Text>
            </View>
            <View style={styles.budgetItem}>
              <MaterialIcons name="savings" size={20} color="#4CAF50" />
              <Text style={[styles.budgetText, { color: "#4CAF50" }]}>
                Remaining: ₹1,60,000
              </Text>
            </View>
          </View>
          {/* </View> */}
        </View>

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
                  <MaterialIcons name="chevron-right" size={16} color="#666" />
                  <Text style={styles.vendorText}>{item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.vendorsContainer}
        />

        <TouchableOpacity
          style={styles.cards}
          onPress={() => navigation.navigate("Task List")} // Navigate to TaskList screen
        >
          <View style={styles.textContainer}>
            <Text style={styles.vendors}>Plan and Track Your Tasks</Text>

            <Text style={styles.detailText}>
              Create a structured to-do list for your event and mark tasks as
              completed to ensure nothing is missed. Keep everything on schedule
              effortlessly.
            </Text>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>

        <View style={styles.cards}>
          <View style={styles.textContainer}>
            <Text style={styles.vendors}>Create Your Guest List</Text>

            <Text style={styles.detailText}>
              Easily add, edit, and manage guest information. Track invitations,
              responses, and special requests to ensure a smooth guest
              experience.
            </Text>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color="#000"
            style={styles.icon}
          />
        </View>

        <View style={styles.cards}>
          <View style={styles.textContainer}>
            <Text style={styles.vendors}>Build a Website for Your Event</Text>

            <Text style={styles.detailText}>
              Provide your guests with a central hub for all event details,
              including schedules, locations, and FAQs. Make it easy for them to
              stay informed.
            </Text>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color="#000"
            style={styles.icon}
          />
        </View>
        <View style={styles.cards}>
          <View style={styles.textContainer}>
            <Text style={styles.vendors}>Track Your Budget</Text>
            <Text style={styles.detailText}>
              Keep your event finances in check by setting budgets, tracking
              expenses, and ensuring you stay within your planned costs.
            </Text>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color="#000"
            style={styles.icon}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  budgetCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  budgetProgressBar: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 16,
  },
  budgetProgressFill: {
    height: "100%",
    backgroundColor: "#2a5298",
    borderRadius: 5,
  },
  budgetDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  budgetItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  budgetText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  // sectionContainer: {
  //   backgroundColor: "#fff",
  //   borderRadius: 12,
  //   padding: 16,
  //   margin: 8,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 3,
  // },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2a5298",
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  guestSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  guestSummaryItem: {
    alignItems: "center",
  },
  guestSummaryNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2a5298",
  },
  guestSummaryLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  budgetContainer: {
    marginTop: 8,
  },
  budgetText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  cards: {
    flexDirection: "row", // Keep text & icon in the same row
    justifyContent: "space-between", // Push icon to the right
    alignItems: "center", // Align everything vertically
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    // marginBottom: 10,
    // marginTop: 5,
    margin: 8,
  },
  detailText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  textContainer: {
    flex: 1, // Allow text to take full width except for the icon
  },
  vendors: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4, // Space between title and description
  },
  icon: {
    marginLeft: 10, // Add space between text and icon
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
