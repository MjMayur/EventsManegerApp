import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  Linking,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function VendorDetailsScreen({ navigation }) {
  const vendor = {
    name: "Gourmet Catering Services",
    established: "Established 2015",
    location: "123 Main Street, New York, NY 10001",
    contact: "contact@gourmetcatering.com\n(555) 123-4567",
    hours: "Mon-Fri: 9AM - 7PM\nSat-Sun: 10AM - 5PM",
    category: "Catering & Events",
    services: [
      "Wedding Catering",
      "Corporate Events",
      "Custom Menu Planning",
      "Full-service Staffing",
      "Delivery & Setup",
    ],
    rating: 4.8,
    reviews: 112,
    description:
      "Premier catering service specializing in creating unforgettable culinary experiences for weddings, corporate events, and private parties. Committed to using locally-sourced ingredients and providing exceptional service.",
    socialMedia: {
      website: "https://gourmetcatering.com",
      facebook: "gourmetcateringny",
      instagram: "@gourmetcatering",
    },
    // image: require("../assets/catering.jpg"),
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this vendor: ${vendor.name}\n${vendor.location}\n${vendor.contact}`,
      });
    } catch (error) {
      Alert.alert("Error sharing vendor details");
    }
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(vendor.rating);
    const hasHalfStar = vendor.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <MaterialCommunityIcons
          key={`full-${i}`}
          name="star"
          size={20}
          color="#FFD700"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <MaterialCommunityIcons
          key="half"
          name="star-half-full"
          size={20}
          color="#FFD700"
        />
      );
    }

    return (
      <View style={styles.ratingContainer}>
        {stars}
        <Text style={styles.reviewText}>({vendor.reviews} reviews)</Text>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.imageContainer}>
        <Image source={vendor.image} style={styles.vendorImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{vendor.name}</Text>
        </View>
        {renderStars()}

        <View style={styles.chip}>
          <Text style={styles.chipText}>{vendor.category}</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="history" size={20} color="#2E7D32" />
            <Text style={styles.infoText}>{vendor.established}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color="#2E7D32"
            />
            <Text style={styles.infoText}>{vendor.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="clock" size={20} color="#2E7D32" />
            <Text style={styles.infoText}>{vendor.hours}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="email" size={20} color="#2E7D32" />
            <Text style={styles.infoText}>{vendor.contact}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Services Offered</Text>
        <View style={styles.servicesContainer}>
          {vendor.services.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <MaterialCommunityIcons
                name="check-circle"
                size={16}
                color="#2E7D32"
              />
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity
            onPress={() => Linking.openURL(vendor.socialMedia.website)}
          >
            <MaterialCommunityIcons
              name="web"
              size={32}
              color="#2E7D32"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                `https://facebook.com/${vendor.socialMedia.facebook}`
              )
            }
          >
            <MaterialCommunityIcons
              name="facebook"
              size={32}
              color="#2E7D32"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                `https://instagram.com/${vendor.socialMedia.instagram}`
              )
            }
          >
            <MaterialCommunityIcons
              name="instagram"
              size={32}
              color="#2E7D32"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 250,
    position: "relative",
  },
  vendorImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  favoriteButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d4150",
    flex: 1,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewText: {
    color: "#666",
    marginLeft: 8,
    fontSize: 14,
  },
  chip: {
    backgroundColor: "#E8F5E9",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  chipText: {
    color: "#2E7D32",
    fontWeight: "500",
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: "#555",
    marginLeft: 10,
    flex: 1,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2d4150",
  },
  servicesContainer: {
    marginBottom: 20,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 15,
    color: "#555",
    marginLeft: 8,
  },
  description: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "flex-center",
    marginBottom: 20,
  },
  socialIcon: {
    marginRight: 20,
  },
  footer: {
    height: 80,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconButton: {
    padding: 12,
    marginRight: 15,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#2E7D32",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
