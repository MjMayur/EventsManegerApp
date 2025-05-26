import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!isLogin && !fullName) {
      Alert.alert("Error", "Please enter your full name");
      return;
    }

    navigation.navigate("Main");
  };

  const handleSocialAuth = (provider) => {
    Alert.alert("Coming Soon", `${provider} authentication coming soon!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            {/* <Image
              source={require("./assets/logo.png")} // Replace with your logo
              style={styles.logo}
            /> */}
            <Text style={styles.title}>Welcome to EVON</Text>
            <Text style={styles.subtitle}>
              {isLogin
                ? "Log in to continue"
                : "Create an account to get started"}
            </Text>
          </View>

          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, isLogin && styles.activeToggle]}
              onPress={() => setIsLogin(true)}
            >
              <Text
                style={[styles.toggleText, isLogin && styles.activeToggleText]}
              >
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

          <View style={styles.formContainer}>
            {!isLogin && (
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#6D28D9"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Full name"
                  placeholderTextColor="#999"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#6D28D9"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#6D28D9"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleAuth}>
              <Text style={styles.primaryButtonText}>
                {isLogin ? "Log in" : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={[styles.socialButton, styles.facebookButton]}
                onPress={() => handleSocialAuth("Facebook")}
              >
                <Ionicons name="logo-facebook" size={20} color="white" />
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, styles.googleButton]}
                onPress={() => handleSocialAuth("Google")}
              >
                <Ionicons name="logo-google" size={20} color="white" />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            {isLogin ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.secondaryText}>Forgot Password?</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.termsText}>
                By signing up you agree to our{" "}
                <Text
                  style={styles.linkText}
                  onPress={() => navigation.navigate("Terms")}
                >
                  Terms
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    maxWidth: "80%",
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 30,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 5,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: "white",
    shadowColor: "#6D28D9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },
  activeToggleText: {
    color: "#6D28D9",
    fontWeight: "600",
  },
  formContainer: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#1E293B",
  },
  primaryButton: {
    backgroundColor: "#6D28D9",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#6D28D9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  dividerText: {
    paddingHorizontal: 10,
    color: "#64748B",
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  facebookButton: {
    backgroundColor: "#1877F2",
  },
  googleButton: {
    backgroundColor: "#DB4437",
  },
  socialButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
  },
  secondaryText: {
    color: "#6D28D9",
    fontSize: 14,
    fontWeight: "500",
  },
  termsText: {
    color: "#64748B",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 20,
  },
  linkText: {
    color: "#6D28D9",
    fontWeight: "500",
  },
  switchAuthButton: {
    marginTop: 15,
  },
  switchAuthText: {
    color: "#6D28D9",
    fontWeight: "600",
  },
});
