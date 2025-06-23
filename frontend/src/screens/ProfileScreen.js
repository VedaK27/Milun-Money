import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity 
} from "react-native";
import axios from "axios"; // Make sure axios is installed
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const userId = route.params?.userId;
  
  const [user, setUser] = useState(null); // 👈 User state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://10.0.2.2:5001/api/auth/users/${userId}`);
        setUser(res.data.user); // Adjust depending on your response
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleSignOut = () => {
    console.log("Signing Out...");
    navigation.navigate("Login");
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <Image 
          source={require("../../assets/profilepage.jpg")} 
          style={styles.profileImage} 
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>{user.username}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>UPI ID</Text>
          <Text style={styles.value}>{user.upiId || "Not Provided"}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      alignItems: "center",
      paddingTop: 50,
    },
    profileContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: "#470967",
    },
    infoContainer: {
      width: "90%",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    field: {
      marginBottom: 15,
    },
    label: {
      fontSize: 14,
      color: "#888",
      textTransform: "uppercase",
    },
    value: {
      fontSize: 18,
      fontWeight: "600",
      color: "#333",
    },
    signOutButton: {
      marginTop: 300,
      backgroundColor: "#ff5252",
      paddingVertical: 12,
      paddingHorizontal: 50,
      borderRadius: 8,
      shadowColor: "#ff5252",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
    },
    signOutText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });

export default ProfileScreen ;