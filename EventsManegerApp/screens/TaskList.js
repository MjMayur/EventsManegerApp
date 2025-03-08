import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

const tasksData = [
  { id: "1", task: "Book Photographer", completed: false },
  { id: "2", task: "Book Caterers", completed: false },
  { id: "3", task: "Book Venue", completed: false },
  { id: "4", task: "Send Invitations", completed: false },
  { id: "5", task: "Finalize Decorations", completed: false },
];

const TaskList = () => {
  const [tasks, setTasks] = useState(tasksData);

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleBookNow = (taskId) => {
    console.log(`Book Now clicked for task ${taskId}`);
    // Add your booking logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plan and Track Your Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            {/* Task Details */}
            <View style={styles.taskDetails}>
              <Checkbox
                value={item.completed}
                onValueChange={() => toggleTaskCompletion(item.id)}
                color={item.completed ? "#2a5298" : "#ccc"}
              />
              <Text
                style={[
                  styles.taskText,
                  item.completed && styles.completedTaskText,
                ]}
              >
                {item.task}
              </Text>
            </View>

            {/* Book Now Button */}
            <TouchableOpacity
              style={styles.bookNowButton}
              onPress={() => handleBookNow(item.id)}
            >
              <Text style={styles.bookNowButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  taskCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  completedTaskText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  bookNowButton: {
    backgroundColor: "#2a5298",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  bookNowButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TaskList;
