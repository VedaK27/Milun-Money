import React, { useEffect, useState } from "react";
import {
  View,
  Alert,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView
  
} from "react-native";
import Navbar from "../../Components/Navbar";
import { getTrip } from "../services/tripService";
//import { ScrollView } from "react-native-gesture-handler";

const TripDetailScreen = ({ route }) => {
  const [tripDetails, setTripDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userId, tripId } = route.params;

  useEffect(() => {
    fetchTripDetails();
  }, []);

  const fetchTripDetails = async () => {
    try {
      console.log("Fetching trip with ID:", tripId);
      const response = await getTrip(tripId);

      if (response?.success && response.trip) {
        console.log("Trip Details:", response.trip); // 👈 Add this
        setTripDetails(response.trip);
      } else {
        console.error("Failed to fetch trip:", response.message);
        Alert.alert("Error", response.message || "Failed to load trip.");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      Alert.alert("Error", "Something went wrong while fetching the trip.");
    } finally {
      setLoading(false);
    }
  };

  const expenses = [
    { item: "Food", amount: "₹100" },
    { item: "Boating", amount: "₹300" },
    { item: "Hotel", amount: "₹500" },
  ];

  const receivables = [
    { name: "Bob", amount: "₹200" },
    { name: "Charlie", amount: "₹150" },
  ];

  const payables = [
    { name: "David", amount: "₹250" },
    { name: "Eve", amount: "₹100" },
  ];

  const renderMember = ({ item }) => (
    <View style={styles.memberBox}>
      <Text style={styles.memberText}>{item.username || item.email}</Text>
    </View>
  );
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Navbar title="Trip Details" />
        <ActivityIndicator size="large" color="#1b1a56" />
        <Text style={{ marginTop: 10 }}>Loading trip details...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <Navbar title="Trip Details" />

      <Text style={styles.eventName}>
        {tripDetails?.tripName || "Trip Details"}
      </Text>

      <Image
        source={require("../../assets/viewtrip.jpg")}
        style={styles.image}
      />

      <Text style={styles.sectionTitle}>Members</Text>
      
      {tripDetails?.members?.length > 0 ? (
        tripDetails.members.map((item, index) => (
        <View key={item._id || index} style={styles.memberBox}>
        <Text style={styles.memberText}>{item.username}</Text>
    </View>
       ))
      ) : (
        <Text>No members found</Text>
      )}



      <Text style={styles.sectionTitle}>Total Expenses</Text>
      <View style={styles.expenseList}>
        {expenses.map((expense, index) => (
          <View key={index} style={styles.expenseItem}>
            <Text style={styles.expenseText}>{expense.item}</Text>
            <Text style={styles.expenseAmount}>{expense.amount}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Receivables</Text>
      <View style={styles.listContainer}>
        {receivables.map((person, index) => (
          <View key={index} style={styles.moneyItem}>
            <Text style={styles.moneyText}>{person.name}</Text>
            <Text style={styles.moneyAmount}>{person.amount}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Payables</Text>
      <View style={styles.listContainer}>
        {payables.map((person, index) => (
          <View key={index} style={styles.payRow}>
            <Text style={styles.moneyText}>{person.name}</Text>
            <Text style={styles.moneyAmount}>{person.amount}</Text>
            <TouchableOpacity style={styles.payButton}>
              <Text style={styles.payText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f5f5f5", flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  eventName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#2c3e50",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    color: "#34495e",
  },
  memberBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    marginBottom: 10,
    minWidth: 60, // reduced from 80
    alignItems: "flex-start", // 'left' isn't valid in RN
    justifyContent: "center",
    height: 50,
    widht : 70
  },
  
  memberText: { color: "#2c3e50", fontWeight: "bold" },
  expenseList: {
    backgroundColor: "#ecf0f1",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  expenseText: { fontSize: 16, color: "#2c3e50" },
  expenseAmount: { fontSize: 16, fontWeight: "bold", color: "#27ae60" },
  listContainer: {
    backgroundColor: "#ecf0f1",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  moneyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  moneyText: { fontSize: 16, color: "#2c3e50" },
  moneyAmount: { fontSize: 16, fontWeight: "bold", color: "#c0392b" },
  payRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  payButton: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 5,
  },
  payText: { color: "white", fontWeight: "bold" },
});

export default TripDetailScreen;
