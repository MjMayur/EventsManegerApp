import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!isLogin && !fullName) {
      Alert.alert("Error", "Please enter your full name");
      return;
    }

    // Add your actual authentication logic here
    navigation.navigate("Main");
  };

  const handleSocialAuth = (provider) => {
    Alert.alert("Coming Soon", `${provider} authentication coming soon!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EVON</Text>
        <Text style={styles.subtitle}>Discover upcoming events near you</Text>
      </View>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, isLogin && styles.activeToggle]}
          onPress={() => setIsLogin(true)}
        >
          <Text style={[styles.toggleText, isLogin && styles.activeToggleText]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !isLogin && styles.activeToggle]}
          onPress={() => setIsLogin(false)}
        >
          <Text
            style={[styles.toggleText, !isLogin && styles.activeToggleText]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={fullName}
          onChangeText={setFullName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleAuth}>
        <Text style={styles.primaryButtonText}>
          {isLogin ? "Log in" : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={[styles.socialButton, styles.facebookButton]}
          onPress={() => handleSocialAuth("Facebook")}
        >
          <Ionicons name="logo-facebook" size={24} color="white" />
          <Text style={styles.socialButtonText}>
            {isLogin ? "Log in with Facebook" : "Sign up with Facebook"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, styles.googleButton]}
          onPress={() => handleSocialAuth("Google")}
        >
          <Ionicons name="logo-google" size={24} color="white" />
          <Text style={styles.socialButtonText}>
            {isLogin ? "Log in with Google" : "Sign up with Google"}
          </Text>
        </TouchableOpacity>
      </View>

      {isLogin ? (
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.secondaryText}>Forgot Password?</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.termsText}>
          By signing up you accept the{" "}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("Terms")}
          >
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("Privacy")}
          >
            Privacy Policy
          </Text>
        </Text>
      )}

      <TouchableOpacity
        style={styles.switchAuthButton}
        onPress={() => setIsLogin(!isLogin)}
      >
        <Text style={styles.switchAuthText}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Log in"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6D28D9",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
  },
  activeToggle: {
    borderBottomColor: "#6D28D9",
  },
  toggleText: {
    fontSize: 16,
    color: "#666",
  },
  activeToggleText: {
    color: "#6D28D9",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: "#6D28D9",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 15,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    color: "#666",
    marginVertical: 15,
  },
  socialContainer: {
    gap: 10,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    gap: 10,
  },
  facebookButton: {
    backgroundColor: "#1877F2",
  },
  googleButton: {
    backgroundColor: "#DB4437",
  },
  socialButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryText: {
    color: "#666",
    textAlign: "center",
    marginTop: 15,
  },
  termsText: {
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 20,
  },
  linkText: {
    color: "#6D28D9",
    fontWeight: "bold",
  },
  switchAuthButton: {
    marginTop: 30,
  },
  switchAuthText: {
    color: "#6D28D9",
    textAlign: "center",
    fontWeight: "bold",
  },
});
