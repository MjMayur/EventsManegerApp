import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";

const HelpScreen = () => {
  const faqs = [
    {
      question: "How do I create a new event?",
      answer:
        "Go to the 'Create Event' screen, fill in the required details, and click 'Create Event'.",
    },
    {
      question: "Can I edit an event after creating it?",
      answer:
        "Currently, editing events is not supported. You can delete and recreate the event.",
    },
    {
      question: "How do I upload an event banner?",
      answer:
        "Click the 'Upload Event Banner' button and select an image from your gallery.",
    },
    {
      question: "What is the maximum number of attendees I can set?",
      answer:
        "You can set any positive number, but ensure it complies with your event venue's capacity.",
    },
  ];

  const contactSupport = () => {
    Linking.openURL("mailto:support@eventapp.com");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Help & Support</Text>

      {/* FAQ Section */}
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqContainer}>
          <Text style={styles.question}>
            <MaterialIcons name="help-outline" size={16} color="#007bff" />{" "}
            {faq.question}
          </Text>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      ))}

      {/* Contact Support Section */}
      <Text style={styles.sectionTitle}>Contact Support</Text>
      <TouchableOpacity style={styles.contactButton} onPress={contactSupport}>
        <FontAwesome name="envelope" size={20} color="#fff" />
        <Text style={styles.contactButtonText}>Email Support</Text>
      </TouchableOpacity>

      {/* Quick Guide Section */}
      <Text style={styles.sectionTitle}>Quick Guide</Text>
      <View style={styles.guideContainer}>
        <View style={styles.guideStep}>
          <Ionicons name="create-outline" size={24} color="#007bff" />
          <Text style={styles.guideText}>
            1. Create an event with all required details.
          </Text>
        </View>
        <View style={styles.guideStep}>
          <MaterialIcons name="upload-file" size={24} color="#007bff" />
          <Text style={styles.guideText}>
            2. Upload an event banner for better visibility.
          </Text>
        </View>
        <View style={styles.guideStep}>
          <FontAwesome name="share-alt" size={24} color="#007bff" />
          <Text style={styles.guideText}>
            3. Share the event link with attendees.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  faqContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eee",
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007bff",
    marginBottom: 5,
  },
  answer: {
    fontSize: 14,
    color: "#666",
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  contactButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  guideContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eee",
  },
  guideStep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  guideText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
});

export default HelpScreen;
