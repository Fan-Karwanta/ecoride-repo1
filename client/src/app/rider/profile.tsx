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
}

const RiderProfile = () => {
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
    } catch (error) {
      console.error("Error updating profile:", error);
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
              label="School ID #"
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
                  onPress={() => {
                    setIsEditing(false);
                    fetchUserProfile(); // Reset to original data
                  }}
                >
                  <CustomText fontFamily="Medium" fontSize={14} style={styles.cancelButtonText}>
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
                  Edit
                </CustomText>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.backLink}
            onPress={() => router.back()}
          >
            <CustomText fontFamily="Medium" fontSize={14} style={styles.backLinkText}>
              Go back
            </CustomText>
          </TouchableOpacity>
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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
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
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    marginBottom: 20,
  },
  inputEditable: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  inputDisabled: {
    backgroundColor: "#F5F5F5",
    opacity: 0.8,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: Colors.primary,
  },
  saveButton: {
    backgroundColor: Colors.primary,
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  buttonText: {
    color: "#FFFFFF",
  },
  cancelButtonText: {
    color: "#666666",
  },
  backLink: {
    alignItems: "center",
    marginBottom: 30,
  },
  backLinkText: {
    color: Colors.primary,
  },
});

export default RiderProfile;
