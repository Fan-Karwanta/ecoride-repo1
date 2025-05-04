import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { authStyles } from "@/styles/authStyles";
import { commonStyles } from "@/styles/commonStyles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomText from "@/components/shared/CustomText";
import { useWS } from "@/service/WSProvider";
import CustomButton from "@/components/shared/CustomButton";
import { login, register } from "@/service/authService";
import { Link } from "expo-router";

export default function Auth() {
  const { updateAccessToken } = useWS();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [licenseId, setLicenseId] = useState("");
  const [sex, setSex] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please enter both email and password");
      return;
    }
    
    setLoading(true);
    try {
      await login({ 
        role: "rider", 
        email, 
        password 
      }, updateAccessToken);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLicenseIdChange = (text: string) => {
    // Format license ID input (uppercase and trim whitespace)
    const formattedLicenseId = text.trim().toUpperCase();
    setLicenseId(formattedLicenseId);
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Please enter both email and password");
      return;
    }

    // Validate license ID
    if (licenseId && licenseId.length < 4) {
      Alert.alert("Invalid License ID", "License ID must be at least 4 characters");
      return;
    }
    
    setLoading(true);
    try {
      await register({
        role: "rider",
        email,
        password,
        firstName,
        middleName,
        lastName,
        phone: contactNumber,
        licenseId: licenseId,
        sex
      }, updateAccessToken);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderLoginForm = () => (
    <>
      <CustomText fontFamily="Medium" variant="h6">
        Good to see you, Rider!
      </CustomText>

      <CustomText
        variant="h7"
        fontFamily="Regular"
        style={commonStyles.lightText}
      >
        Enter your account details to continue
      </CustomText>

      <View style={styles.inputContainer}>
        <CustomText fontFamily="Medium">Email</CustomText>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <CustomText fontFamily="Medium">Password</CustomText>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.registerLinkContainer}>
        <CustomText fontFamily="Regular" variant="h8">
          Don't have an account?{" "}
        </CustomText>
        <TouchableOpacity onPress={() => setIsLogin(false)}>
          <CustomText
            fontFamily="Medium"
            variant="h8"
            style={styles.registerLink}
          >
            Register here
          </CustomText>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderRegisterForm = () => (
    <>
      <CustomText fontFamily="Medium" variant="h6">
        Good to see you, Rider!
      </CustomText>

      <CustomText
        variant="h7"
        fontFamily="Regular"
        style={commonStyles.lightText}
      >
        Enter your information to register
      </CustomText>

      <View style={styles.inputContainer}>
        <CustomText fontFamily="Medium">First Name</CustomText>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={styles.inputContainer}>
        <CustomText fontFamily="Medium">Middle Name</CustomText>
        <TextInput
          style={styles.input}
          value={middleName}
          onChangeText={setMiddleName}
        />
      </View>

      <View style={styles.inputContainer}>
        <CustomText fontFamily="Medium">Last Name</CustomText>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View style={styles.inputContainer}>
        <CustomText fontFamily="Medium">Contact Number</CustomText>
        <TextInput
          style={styles.input}
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <CustomText fontFamily="Medium">Driver's License ID #</CustomText>
        <TextInput
          style={styles.input}
          value={licenseId}
          onChangeText={handleLicenseIdChange}
          autoCapitalize="characters"
          placeholder="Enter your driver's license ID"
        />
      </View>

      <View style={styles.inputContainer}>
        <CustomText fontFamily="Medium">Sex</CustomText>
        <View style={styles.radioContainer}>
          <TouchableOpacity 
            style={[styles.radioButton, sex === "male" && styles.radioButtonSelected]} 
            onPress={() => setSex("male")}
          >
            <View style={[styles.radioCircle, sex === "male" && styles.radioCircleSelected]} />
            <CustomText fontFamily="Regular">Male</CustomText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.radioButton, sex === "female" && styles.radioButtonSelected]} 
            onPress={() => setSex("female")}
          >
            <View style={[styles.radioCircle, sex === "female" && styles.radioCircleSelected]} />
            <CustomText fontFamily="Regular">Female</CustomText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <CustomText fontFamily="Medium">Email</CustomText>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <CustomText fontFamily="Medium">Password</CustomText>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.registerLinkContainer}>
        <CustomText fontFamily="Regular" variant="h8">
          Already have an account?{" "}
        </CustomText>
        <TouchableOpacity onPress={() => setIsLogin(true)}>
          <CustomText
            fontFamily="Medium"
            variant="h8"
            style={styles.registerLink}
          >
            Login here
          </CustomText>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={[authStyles.container, { paddingBottom: 0 }]}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContainer, 
          { paddingBottom: isLogin ? 20 : 100 } // Add extra padding at the bottom for registration form
        ]}
      >
        <View style={commonStyles.flexRowBetween}>
          <Image
            source={require("@/assets/images/ecoride_logo1.png")}
            style={authStyles.logo}
          />
          <TouchableOpacity style={authStyles.flexRowGap}>
            <MaterialIcons name="help" size={18} color="grey" />
            <CustomText fontFamily="Medium" variant="h7">
              Help
            </CustomText>
          </TouchableOpacity>
        </View>

        {isLogin ? renderLoginForm() : renderRegisterForm()}
        
        {/* Footer with adjusted alignment */}
        <View style={[
          { 
            marginTop: 20,
            marginBottom: 20,
            paddingHorizontal: 15,
            width: '90%',
            alignItems: 'flex-start'
          }
        ]}>
          <CustomText
            variant="h8"
            fontFamily="Regular"
            style={[
              commonStyles.lightText,
              { textAlign: "left", marginBottom: 15 },
            ]}
          >
            By continuing, you agree to the terms and privacy policy of Ecoride App
          </CustomText>

          <CustomButton
            title={isLogin ? "Login" : "Register"}
            onPress={isLogin ? handleLogin : handleRegister}
            loading={loading}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    fontSize: 16,
  },
  registerLinkContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  registerLink: {
    color: '#4CAF50',
  },
  radioContainer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'flex-start',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 8,
  },
  radioButtonSelected: {
    opacity: 1,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    backgroundColor: '#4CAF50',
  },
});
