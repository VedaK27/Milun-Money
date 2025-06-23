import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView
} from "react-native";
import Navbar from "../../Components/Navbar";

const { width } = Dimensions.get("window");

const ExpenseScreen = () => {
  const handlePress = (buttonName) => console.log(`${buttonName} pressed`);

  return (
    <SafeAreaView style={styles.container}>
      <Navbar title="Your Expenses"/>
      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Top Section */}
        <View style={styles.imageContainer}>
          <View style={styles.imageBg}>
            <Image source={require("../../assets/withoutbg.png")} style={styles.topImage

            }  />
          </View>
          <View style={styles.captionContainer}>
            <Text style={styles.captionTitle}>Stay on Top of Your Expenses</Text>
            <Text style={styles.captionText}>Track all your expenses seamlessly!</Text>
          </View>
        </View>
        
        {/* Expense Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.expenseButton, styles.button1]} onPress={() => handlePress("Who Owes You")}> 
            <Text style={styles.buttonText}>Who Owes You?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.expenseButton, styles.button2]} onPress={() => handlePress("You Owe")}> 
            <Text style={styles.buttonText}>You Owe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.expenseButton, styles.button3]} onPress={() => handlePress("Individual Expense")}> 
            <Text style={styles.buttonText}>Your Individual Expenses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.expenseButton, styles.button4]} onPress={() => handlePress("Trip Expense")}> 
            <Text style={styles.buttonText}>Trip Expenses</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f8"  },
  header: { flexDirection: "row", justifyContent: "space-between", padding: 20, backgroundColor: "#470967" },
  logo: { width: 40, height: 40, resizeMode: "contain", tintColor: "#ffffff" },
  headerTitle: { color: "#ffffff", fontSize: 22, fontWeight: "bold" },
  profile: { width: 30, height: 30, resizeMode: "contain", tintColor: "#ffffff" },
  
  imageContainer: { margin: 20, borderRadius: 20, overflow: "hidden", alignItems: 'center' },
  imageBg: {alignItems: "center", borderRadius: 15},
  topImage: { width: 200, height: 200, resizeMode: "contain",marginTop:40 },
  captionContainer: { backgroundColor: "#ffffff", padding: 15, alignItems: "center", borderRadius: 10 , width:'95%' },
  captionTitle: { fontSize: 20, fontWeight: "bold", color: "#470967", marginBottom: 5 },
  captionText: { fontSize: 14, color: "#666", textAlign: "center" },

  buttonContainer: { paddingHorizontal: 20, marginTop: 20 },
  expenseButton: {
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#ffffff" },
  
  button1: { backgroundColor: "#ff6f61" },
  button2: { backgroundColor: "#ffb400" },
  button3: { backgroundColor: "#4caf50" },
  button4: { backgroundColor: "#1976d2" },

  plusButtonContainer: { position: "absolute", bottom: 30, alignSelf: "center" },
  plusButton: { width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center", backgroundColor: "#470967" },
  plusIcon: { color: "#ffffff", fontSize: 32, fontWeight: "bold" }
});

export default ExpenseScreen;