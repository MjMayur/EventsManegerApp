import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Switch,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
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
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
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
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create New Event</Text>

      {/* Event Name */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="event" size={20} color="#666" />
        <Controller
          control={control}
          name="eventName"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Event Name"
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
        <FontAwesome name="list-alt" size={20} color="#666" />
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
            >
              <Picker.Item label="Select Category" value="" />
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
      <View style={styles.inputContainer}>
        <MaterialIcons name="date-range" size={20} color="#666" />
        <TouchableOpacity
          style={styles.dateTime}
          onPress={() => setDatePickerVisible(true)}
        >
          <Text>{selectedDate.toDateString()}</Text>
        </TouchableOpacity>
        {/* {isDatePickerVisible && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setDatePickerVisible(false);
              if (date) setSelectedDate(date);
            }}
          />
        )} */}
      </View>

      {/* Time Picker */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="access-time" size={20} color="#666" />
        <TouchableOpacity
          style={styles.dateTime}
          onPress={() => setTimePickerVisible(true)}
        >
          <Text>{selectedTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {/* {isTimePickerVisible && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="default"
            onChange={(event, time) => {
              setTimePickerVisible(false);
              if (time) setSelectedTime(time);
            }}
          />
        )} */}
      </View>

      {/* Location */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="location-on" size={20} color="#666" />
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Location"
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
      <View style={styles.inputContainer}>
        <MaterialIcons name="image" size={20} color="#666" />
        <TouchableOpacity onPress={selectImage} style={styles.imagePicker}>
          <Text>Upload Event Banner</Text>
        </TouchableOpacity>
      </View>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      {/* RSVP Switch */}
      <View style={styles.inputContainer}>
        <Ionicons name="people" size={20} color="#666" />
        <Text>RSVP Required?</Text>
        <Switch value={isRSVP} onValueChange={setRSVP} />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    backgroundColor: "#fff",
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginLeft: 10,
    backgroundColor: "#fff",
  },
  dateTime: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  imagePicker: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
    marginLeft: 30,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NewEventScreen;
