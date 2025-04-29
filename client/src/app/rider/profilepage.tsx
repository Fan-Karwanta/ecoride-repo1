import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "@/utils/Constants";
import CustomText from "@/components/shared/CustomText";
import CustomInput from "@/components/shared/CustomInput";
import { getUserProfile, updateUserProfile } from "@/service/authService";
import { useRiderStore } from "@/store/riderStore";

interface ProfileData {
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  schoolId: string;
  sex: string;
}

const RiderProfilePage = () => {
  const { user } = useRiderStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    schoolId: "",
    sex: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const userData = await getUserProfile();
      setProfileData({
        firstName: userData.firstName || "",
        middleName: userData.middleName || "",
        lastName: userData.lastName || "",
        phone: userData.phone || "",
        email: userData.email || "",
        schoolId: userData.schoolId || "",
        sex: userData.sex || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setIsLoading(true);
      await updateUserProfile(profileData);
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={RFValue(24)} color="black" />
        </TouchableOpacity>
        <CustomText fontFamily="Bold" fontSize={18} style={styles.headerTitle}>
          My Profile
        </CustomText>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <ScrollView style={styles.content}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Ionicons name="person" size={RFValue(50)} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.formContainer}>
            <CustomInput
              label="First Name"
              value={profileData.firstName}
              onChangeText={(text: string) => handleInputChange("firstName", text)}
              editable={isEditing}
              style={isEditing ? styles.inputEditable : styles.inputDisabled}
            />

            <CustomInput
              label="Middle Name"
              value={profileData.middleName}
              onChangeText={(text: string) => handleInputChange("middleName", text)}
              editable={isEditing}
              style={isEditing ? styles.inputEditable : styles.inputDisabled}
            />

            <CustomInput
              label="Last Name"
              value={profileData.lastName}
              onChangeText={(text: string) => handleInputChange("lastName", text)}
              editable={isEditing}
              style={isEditing ? styles.inputEditable : styles.inputDisabled}
            />

            <CustomInput
              label="Contact Number"
              value={profileData.phone}
              onChangeText={(text: string) => handleInputChange("phone", text)}
              editable={isEditing}
              keyboardType="phone-pad"
              style={isEditing ? styles.inputEditable : styles.inputDisabled}
            />

            <CustomInput
              label="License ID #"
              value={profileData.schoolId}
              onChangeText={(text: string) => handleInputChange("schoolId", text)}
              editable={isEditing}
              style={isEditing ? styles.inputEditable : styles.inputDisabled}
            />

            <CustomInput
              label="Email"
              value={profileData.email}
              onChangeText={(text: string) => handleInputChange("email", text)}
              editable={isEditing}
              keyboardType="email-address"
              style={isEditing ? styles.inputEditable : styles.inputDisabled}
            />

            <View style={styles.inputContainer}>
              <CustomText fontFamily="Medium">Sex</CustomText>
              {isEditing ? (
                <View style={styles.radioContainer}>
                  <TouchableOpacity 
                    style={[styles.radioButton, profileData.sex === "male" && styles.radioButtonSelected]} 
                    onPress={() => handleInputChange("sex", "male")}
                  >
                    <View style={[styles.radioCircle, profileData.sex === "male" && styles.radioCircleSelected]} />
                    <CustomText fontFamily="Regular">Male</CustomText>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.radioButton, profileData.sex === "female" && styles.radioButtonSelected]} 
                    onPress={() => handleInputChange("sex", "female")}
                  >
                    <View style={[styles.radioCircle, profileData.sex === "female" && styles.radioCircleSelected]} />
                    <CustomText fontFamily="Regular">Female</CustomText>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={[styles.input, styles.inputDisabled, { justifyContent: 'center' }]}>
                  <CustomText fontFamily="Regular">{profileData.sex || 'Not specified'}</CustomText>
                </View>
              )}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            {isEditing ? (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.saveButton]}
                  onPress={handleUpdateProfile}
                >
                  <CustomText fontFamily="Medium" fontSize={14} style={styles.buttonText}>
                    Save
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setIsEditing(false)}
                >
                  <CustomText fontFamily="Medium" fontSize={14} style={styles.buttonText}>
                    Cancel
                  </CustomText>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => setIsEditing(true)}
              >
                <CustomText fontFamily="Medium" fontSize={14} style={styles.buttonText}>
                  Edit Profile
                </CustomText>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    marginRight: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: RFValue(100),
    height: RFValue(100),
    borderRadius: RFValue(50),
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  inputDisabled: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E0E0E0",
  },
  inputEditable: {
    backgroundColor: "#FFFFFF",
    borderColor: Colors.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: Colors.primary,
  },
  saveButton: {
    backgroundColor: Colors.primary,
  },
  cancelButton: {
    backgroundColor: "#E0E0E0",
  },
  buttonText: {
    color: "#000000",
  },
  radioContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioButtonSelected: {
    opacity: 1,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: Colors.primary,
    borderWidth: 6,
  },
});

export default RiderProfilePage;
