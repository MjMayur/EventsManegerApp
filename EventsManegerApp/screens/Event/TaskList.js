import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";

const tasksData = [
  {
    id: "1",
    task: "Book Photographer",
    info: "Capture memories with professional photography services",
    completed: false,
  },
  {
    id: "2",
    task: "Book Caterers",
    info: "Delicious catering options for all guest preferences",
    completed: false,
  },
  {
    id: "3",
    task: "Book Venue",
    info: "Find the perfect location for your special event",
    completed: false,
  },
  {
    id: "4",
    task: "Send Invitations",
    info: "Manage guest list and send digital/physical invites",
    completed: false,
  },
  {
    id: "5",
    task: "Finalize Decorations",
    info: "Create the perfect ambiance with themed decorations",
    completed: false,
  },
];

const TaskList = () => {
  const [tasks, setTasks] = useState(tasksData);

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Update this function to perform your desired global action.
  const handleMark = () => {
    console.log("Mark button pressed");
  };

  return (
    <View style={styles.container}>
      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskCard}
            onPress={() => toggleTaskCompletion(item.id)}
          >
            {/* Left Side Content */}
            <View style={styles.taskContent}>
              <Checkbox
                value={item.completed}
                onValueChange={() => toggleTaskCompletion(item.id)}
                color={item.completed ? "#6C63FF" : "#ccc"}
                style={styles.checkbox}
              />

              {/* Task Info */}
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.taskTitle,
                    item.completed && styles.completedTask,
                  ]}
                >
                  {item.task}
                </Text>
                <Text style={styles.taskInfo}>{item.info}</Text>
              </View>
            </View>

            {/* Book Now Button */}
            <TouchableOpacity
              style={styles.bookNowButton}
              onPress={() =>
                console.log(`Book Now clicked for task ${item.id}`)
              }
            >
              <Text style={styles.bookNowText}>Book</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* Floating Mark Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.markButton} onPress={handleMark}>
          <MaterialIcons name="task-alt" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F7FF",
  },
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  taskContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  checkbox: {
    marginRight: 15,
    borderRadius: 5,
    borderWidth: 2,
  },
  textContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2A2F4F",
    marginBottom: 5,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#A0A3BD",
  },
  taskInfo: {
    fontSize: 13.5,
    color: "#6B7280",
    lineHeight: 20,
  },
  bookNowButton: {
    backgroundColor: "transparent",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#6C63FF",
    shadowColor: "transparent",
    alignSelf: "flex-end",
  },
  bookNowText: {
    color: "#6C63FF",
    fontWeight: "600",
    fontSize: 15,
    letterSpacing: 0.5,
  },
  // Floating Button Container (absolute positioning)
  buttonContainer: {
    position: "absolute",
    bottom: 20, // Adjust as needed
    left: 0,
    right: 0,
    alignItems: "flex-end",
    margin: 10,
    backgroundColor: "transparent",
  },
  markButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  markButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});

export default TaskList;
