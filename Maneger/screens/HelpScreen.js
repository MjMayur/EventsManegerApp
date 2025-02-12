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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Create New Event
      </Text>

      {/* Event Name */}
      <Text>Event Name</Text>
      <Controller
        control={control}
        name="eventName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter event name"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.eventName && (
        <Text style={styles.error}>{errors.eventName.message}</Text>
      )}

      {/* Category Picker */}
      <Text>Event Category</Text>
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
      {errors.category && (
        <Text style={styles.error}>{errors.category.message}</Text>
      )}

      {/* Date Picker */}
      <Text>Event Date</Text>
      <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
        <Text style={styles.dateTime}>{selectedDate.toDateString()}</Text>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setDatePickerVisible(false);
            if (date) setSelectedDate(date);
          }}
        />
      )}

      {/* Time Picker */}
      <Text>Event Time</Text>
      <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
        <Text style={styles.dateTime}>{selectedTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {isTimePickerVisible && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={(event, time) => {
            setTimePickerVisible(false);
            if (time) setSelectedTime(time);
          }}
        />
      )}

      {/* Location */}
      <Text>Location</Text>
      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter location"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.location && (
        <Text style={styles.error}>{errors.location.message}</Text>
      )}

      {/* Image Upload */}
      <Text>Event Banner</Text>
      <TouchableOpacity onPress={selectImage} style={styles.imagePicker}>
        <Text>Upload Image</Text>
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      {/* RSVP Switch */}
      <Text>RSVP Required?</Text>
      <Switch value={isRSVP} onValueChange={setRSVP} />

      {/* Submit Button */}
      <Button title="Create Event" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
};

const styles = {
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  picker: { borderWidth: 1, marginBottom: 10 },
  dateTime: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    textAlign: "center",
  },
  imagePicker: {
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  image: { width: "100%", height: 200, marginBottom: 10 },
  error: { color: "red", marginBottom: 10 },
};

export default NewEventScreen;
