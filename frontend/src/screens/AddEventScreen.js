import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import Navbar from '../../Components/Navbar';
import { createTrip } from "../services/tripService";

const AddEventPage = ({ navigation }) => {
  const [tripName, setTripName] = useState("");
  const [tripDescription, setTripDescription] = useState("");

  const [username, setUsername] = useState("");
  const [members, setMembers] = useState([]);

  // Function to add a member
  const addMember = () => {
    if (username.trim() === "") {
      Alert.alert("Error", "Username cannot be empty!");
      return;
    }
    setMembers([...members, username]); // Add the username to the members list
    setUsername(""); // Clear the input field
  };

  // Function to create a trip
  const handleCreateTrip = async () => {
    if (!tripName || !startDate || members.length === 0) {
      Alert.alert("Error", "Please fill all fields and add at least one member.");
      return;
    }

    const tripData = {
      tripName,
      tripDescription,
      members,
    };

    console.log("Received Data " , {tripData}) ;
    try {
        console.log("Sending Api request , in frontend !") ;
      const response = await createTrip(tripData);
      if (response.success) {
        Alert.alert("Success", "Trip created successfully!", [
          { text: "OK", onPress: () => navigation.navigate("HomeScreen") }
        ]);
        setTripName("");
        setTripDescription("");
        setStartDate("");
        setMembers([]);
      } else {
        Alert.alert("Error", response.message || "Failed to create trip.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title="Add Event" onBackPress={() => navigation.navigate("HomeScreen")} />
      <View style={styles.container}>
        <Text style={styles.label}>Trip Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter trip name"
          value={tripName}
          onChangeText={setTripName}
        />

        <Text style={styles.label}>Trip Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter trip description"
          value={tripDescription}
          onChangeText={setTripDescription}
        />


        <Text style={styles.label}>Add Members:</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
            onSubmitEditing={addMember}
          />
          <TouchableOpacity style={styles.addButton} onPress={addMember}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {members.length > 0 && (
          <View style={styles.membersContainer}>
            <Text style={styles.membersHeader}>Members ({members.length}):</Text>
            <FlatList
              data={members}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.memberRow}>
                  <Text style={styles.member}>{item}</Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => setMembers(members.filter((_, i) => i !== index))}
                  >
                    <Text style={styles.removeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleCreateTrip}>
          <Text style={styles.submitText}>Create Trip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#470967",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#f16d95",
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  membersContainer: {
    marginBottom: 10,
  },
  membersHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#470967",
    marginBottom: 5,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 5,
    padding: 8,
  },
  member: {
    fontSize: 14,
    flex: 1,
  },
  removeButton: {
    padding: 5,
  },
  removeButtonText: {
    color: "#ff3b30",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#470967",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default AddEventPage;
