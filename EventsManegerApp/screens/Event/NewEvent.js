import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Switch,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";

const eventSchema = yup.object().shape({
  eventName: yup.string().required("Event Name is required"),
  category: yup.string().required("Select a category"),
  date: yup.date().required("Event date is required"),
  time: yup.string().required("Event time is required"),
  location: yup.string().required("Location is required"),
  description: yup.string().required("Event description is required"),
  maxAttendees: yup
    .number()
    .required("Max attendees required")
    .positive()
    .integer(),
  ticketPrice: yup.number().nullable().min(0, "Price must be positive"),
  organizerName: yup.string().required("Organizer name is required"),
  contactEmail: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  contactPhone: yup
    .string()
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
    .required("Phone number required"),
});

const NewEventScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(eventSchema),
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isRSVP, setRSVP] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  const onSubmit = (data) => {
    console.log("Event Data:", { ...data, isRSVP, eventImage: imageUri });
    Alert.alert("Success", "Event Created Successfully!");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.innerContainer}>
        {/* Event Name */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="event" size={22} style={styles.icon} />
          <Controller
            control={control}
            name="eventName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Event Name"
                placeholderTextColor="#A0AEC0"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        {errors.eventName && (
          <Text style={styles.error}>{errors.eventName.message}</Text>
        )}

        {/* Category Picker */}
        <View style={styles.inputContainer}>
          <FontAwesome name="list-alt" size={22} style={styles.icon} />
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
                dropdownIconColor="#4C51BF"
              >
                <Picker.Item
                  label="Select Category"
                  value=""
                  style={styles.pickerPlaceholder}
                />
                <Picker.Item label="Music" value="music" />
                <Picker.Item label="Technology" value="tech" />
                <Picker.Item label="Business" value="business" />
                <Picker.Item label="Sports" value="sports" />
              </Picker>
            )}
          />
        </View>
        {errors.category && (
          <Text style={styles.error}>{errors.category.message}</Text>
        )}

        {/* Date Picker */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setDatePickerVisible(true)}
          activeOpacity={0.8}
        >
          <MaterialIcons name="date-range" size={22} style={styles.icon} />
          <View style={styles.dateTime}>
            <Text style={styles.dateTimeText}>
              {selectedDate.toDateString()}
            </Text>
            <MaterialIcons name="chevron-right" size={24} color="#CBD5E0" />
          </View>
        </TouchableOpacity>

        {/* Time Picker */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setTimePickerVisible(true)}
          activeOpacity={0.8}
        >
          <MaterialIcons name="access-time" size={22} style={styles.icon} />
          <View style={styles.dateTime}>
            <Text style={styles.dateTimeText}>
              {selectedTime.toLocaleTimeString()}
            </Text>
            <MaterialIcons name="chevron-right" size={24} color="#CBD5E0" />
          </View>
        </TouchableOpacity>

        {/* Location */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="location-on" size={22} style={styles.icon} />
          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Location"
                placeholderTextColor="#A0AEC0"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        {errors.location && (
          <Text style={styles.error}>{errors.location.message}</Text>
        )}

        {/* Image Upload */}
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={selectImage}
          activeOpacity={0.8}
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <>
              <MaterialIcons
                name="cloud-upload"
                size={40}
                style={styles.uploadIcon}
              />
              <Text style={styles.imagePickerText}>
                Tap to upload event banner
              </Text>
              <Text style={styles.imagePickerSubText}>
                Recommended ratio: 4:3
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* RSVP Switch */}
        <View style={styles.switchContainer}>
          <View style={styles.switchLabel}>
            <Ionicons name="people" size={22} style={styles.icon} />
            <Text style={styles.switchText}>RSVP Required</Text>
          </View>
          <Switch
            value={isRSVP}
            onValueChange={setRSVP}
            thumbColor="#fff"
            trackColor={{ false: "#CBD5E0", true: "#4C51BF" }}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Create Event</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 40, // Ensure space for button
  },
  innerContainer: {
    paddingVertical: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginBottom: 15,
    backgroundColor: "#F7FAFC",
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#4A5568",
    // marginLeft: 12,
    paddingVertical: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  picker: {
    flex: 1,
    height: 50,
    color: "#4A5568",
  },
  pickerPlaceholder: {
    color: "#A0AEC0", // Match placeholder color
  },
  icon: {
    marginRight: 10,
    color: "#4C51BF",
  },
  dateTime: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
  dateTimeText: {
    color: "#4A5568",
    fontSize: 16,
  },
  imagePicker: {
    height: 150,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#CBD5E0",
    borderRadius: 10,
    marginVertical: 15,
    backgroundColor: "#F7FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  uploadIcon: {
    color: "#CBD5E0",
    marginBottom: 8,
  },
  imagePickerText: {
    color: "#718096",
    fontSize: 14,
  },
  imagePickerSubText: {
    color: "#CBD5E0",
    fontSize: 12,
    marginTop: 4,
  },
  error: {
    color: "#E53E3E",
    marginBottom: 15,
    marginLeft: 15,
    fontSize: 13,
    fontWeight: "500",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#F7FAFC",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginVertical: 15,
  },
  switchLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    color: "#4A5568",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4C51BF",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    elevation: 3,
    shadowColor: "#4C51BF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default NewEventScreen;
