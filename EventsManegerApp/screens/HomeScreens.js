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
import { services, services1 } from "./commonData";

const { width } = Dimensions.get("window");

// Custom Pie Chart Component (SVG-free implementation)
const PieChart = ({ data, size = 100 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let accumulatedAngle = 0;

  return (
    <View style={[styles.pieContainer, { width: size, height: size }]}>
      {data.map((item, index) => {
        const angle = (item.value / total) * 360;
        const style = {
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "transparent",
          borderWidth: size / 2,
          borderColor: item.color,
          transform: [
            { rotate: `${accumulatedAngle}deg` },
            { skewX: `${angle}deg` },
          ],
        };
        accumulatedAngle += angle;
        return <View key={index} style={style} />;
      })}
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Budget pie chart data
  const budgetData = [
    { value: 40000, color: "#FF6B6B", name: "Spent" },
    { value: 160000, color: "#4CAF50", name: "Remaining" },
  ];

  // Vendors pie chart data
  const vendorsData = [
    { value: 5, color: "#2a5298", name: "Venues" },
    { value: 3, color: "#6a1b9a", name: "Caterers" },
    { value: 2, color: "#c2185b", name: "Photographers" },
  ];

  const filteredVendors =
    selectedCategory === "All"
      ? services
      : services.filter((service) => service.type === selectedCategory);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerOverlay}>
          {/* <Text style={styles.timer}>{formatTime(timer)}</Text> */}
        </View>
      </View>

      {/* Pie Charts Row */}
      <View style={styles.chartsContainer}>
        {/* Budget Pie Chart */}
        <View style={styles.chartBox}>
          <Text style={styles.chartTitle}>Budget</Text>
          <PieChart data={budgetData} size={80} />
          <View style={styles.legendContainer}>
            {budgetData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendText}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Vendors Pie Chart */}
        <View style={styles.chartBox}>
          <Text style={styles.chartTitle}>Guest List (Total: 500)</Text>
          <PieChart
            data={[
              { name: "Invited", value: 600, color: "#4CAF50" },
              { name: "Pending", value: 200, color: "#FF9800" },
            ]}
            size={80}
          />
          <View style={styles.legendContainer}>
            {[
              { name: "Invited (300)", value: 300, color: "#4CAF50" },
              { name: "Pending (200)", value: 200, color: "#FF9800" },
            ].map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendText}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Task Progress */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Task Progress</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "80%" }]} />
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
          <View style={styles.budgetProgressBar}>
            <View style={[styles.budgetProgressFill, { width: "20%" }]} />
          </View>
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
        </View>

        {/* Vendors List */}
        <FlatList
          data={services1}
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
                <Text style={styles.vendorName}>{item.type}</Text>
                <View style={styles.vendorDetail}>
                  {/* <MaterialIcons name="star" size={16} color="#FFD700" /> */}
                  {/* <Text style={styles.vendorText}>{item.rating}</Text> */}
                </View>
                <View style={styles.vendorDetail}>
                  {/* <MaterialIcons name="attach-money" size={16} color="#666" /> */}
                  {/* <Text style={styles.vendorText}>{item.price}</Text> */}
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.vendorsList}
        />

        {/* Feature Cards */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Task List")}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Plan and Track Your Tasks</Text>
            <Text style={styles.cardDescription}>
              Create a structured to-do list for your event and mark tasks as
              completed to ensure nothing is missed.
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Guest List")}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Create Your Guest List</Text>
            <Text style={styles.cardDescription}>
              Easily add, edit, and manage guest information. Track invitations,
              responses, and special requests.
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Build a Website for Your Event</Text>
            <Text style={styles.cardDescription}>
              Provide your guests with a central hub for all event details,
              including schedules, locations, and FAQs.
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerContainer: {
    height: 600,
    backgroundColor: "#2a5298",
    justifyContent: "center",
    alignItems: "center",
  },
  headerOverlay: {
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
  },
  chartsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
  },
  chartBox: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pieContainer: {
    position: "relative",
    marginVertical: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
    marginVertical: 2,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: "#666",
  },
  contentContainer: {
    padding: 16,
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2a5298",
  },
  progressText: {
    fontSize: 14,
    color: "#666",
  },
  guestSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  guestSummaryItem: {
    alignItems: "center",
    flex: 1,
  },
  guestSummaryNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2a5298",
  },
  guestSummaryLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  budgetProgressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 16,
  },
  budgetProgressFill: {
    height: "100%",
    backgroundColor: "#2a5298",
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
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  vendorsList: {
    paddingBottom: 8,
  },
  vendorCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 150,
    padding: 12,
    alignItems: "center",
    marginRight: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vendorInfo: {
    alignItems: "center",
    marginTop: 8,
  },
  vendorName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  vendorDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  vendorText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default HomeScreen;
