import React, { useState, useEffect } from "react";
import { ScrollView, SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, FlatList } from "react-native";
import Navbar from '../../Components/Navbar';
import { useNavigation } from "@react-navigation/native";
import { addPayment } from "../services/paymentService.js";
import { getUserTripsAPI } from "../services/tripService.js";
import { fetchUserByIdAPI } from "../services/userService.js";
import { fetchMembersByTrip } from "../services/tripService.js";

const categoryIcons = {
  "Travel": require('../../assets/icons/travel.png'),
  "Food": require('../../assets/icons/food.png'),
  "Education": require('../../assets/icons/education.png'),
  "Entertainment": require('../../assets/icons/entertainment.png'),
  "Accommodation": require('../../assets/icons/accommodation.png'),
  "Other": require('../../assets/icons/other.png')
};

const AddPaymentPage = ({ route }) => {

	const { userId } = route.params;
	const navigation = useNavigation();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [paymentType, setPaymentType] = useState("individual");
  const [numMembers, setNumMembers] = useState("3");
  const [members, setMembers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventParticipants, setEventParticipants] = useState([]);
  const [events, setEvents] = useState([]);
	const [user, setUser] = useState(null);
	const [particularTrip, setParticularTrip]= useState(null);

  
  const categories = ["Travel", "Food", "Education", "Entertainment", "Accommodation", "Other"];
  // const events = [
  //   { id: "1", name: "Beach Trip", participants: ["Alice", "Bob", "Charlie", "David", "Emma"] },
  //   { id: "2", name: "Dinner Party", participants: ["Frank", "Grace", "Hannah", "Isaac"] },
  //   { id: "3", name: "Movie Night", participants: ["Jacob", "Kate", "Liam", "Mia", "Noah"] },
  //   { id: "4", name: "Game Day", participants: ["Olivia", "Peter", "Quinn", "Ryan", "Sophia"] }
  // ];

  // useEffect(() => {
  //   if (events.length > 0 && !selectedEvent) {
  //     handleSelectEvent(events[0].id);
  //   }
  // }, []);
	// useEffect(() => {
	// 	const loadTrips = async () => {
	// 		const gettinguser = await fetchUserByIdAPI(userId);
	// 		try {
	// 			const trips = await getUserTripsAPI(gettinguser._id);
	// 			setEvents(trips);
	
	// 			if (trips.length > 0 && !selectedEvent) {
	// 				handleSelectEvent(trips[0]._id); // assuming trip._id is your unique ID
	// 			}
	// 		} catch (error) {
	// 			Alert.alert("Error", "Could not load events.");
	// 		}
	// 	};
	
	// 	loadTrips();
	// }, []);
	useEffect(() => {
		const loadUserAndTrips = async () => {
			try {
				const fetchedUser = await fetchUserByIdAPI(userId);
				console.log("Fetched user:", fetchedUser); // Debug user
				setUser(fetchedUser);
				
				const trips = await getUserTripsAPI(fetchedUser._id);
				console.log("Fetched trips:", trips); // Debug trips
				setEvents(trips);
	
				if (trips.length > 0 && !selectedEvent) {
					handleSelectEvent(trips[0]._id);
				}
			} catch (error) {
				Alert.alert("Error", "Could not load user data or events.");
			}
		};
	
		loadUserAndTrips();
	}, []);

  // const handleSelectEvent = (eventId) => {
  //   const event = events.find(e => e.id === eventId);
  //   setSelectedEvent(event);
  //   setEventParticipants(event ? event.participants : []);
  //   setMembers([]);
  // };

	// const handleSelectEvent = (eventId) => {
	// 	const event = events.find(e => e._id === eventId);
	// 	setSelectedEvent(event);
	// 	setEventParticipants(event ? event.members.filter(m => m._id !== user._id) : []);
	// 	setMembers([]);
	// };
	

  // const handleMemberToggle = (participant) => {
  //   const maxMembers = parseInt(numMembers) || 0;
    
  //   if (members.includes(participant)) {
  //     // Always allow removing
  //     setMembers(members.filter(m => m !== participant));
  //   } else if (members.length < maxMembers) {
  //     // Only allow adding if under the limit
  //     setMembers([...members, participant]);
  //   }
  // };

	const handleSelectEvent = (eventId) => {
		const event = events.find(e => e._id === eventId);
		setSelectedEvent(event);
		
		if (event && user) {
			// Filter out the current user and extract member objects
			const otherMembers = event.members.filter(m => m._id !== user._id);
			setEventParticipants(otherMembers);
		} else {
			setEventParticipants([]);
		}
		
		setMembers([]);
	};
	// const handleSelectEvent = async (trip) => {
	// 	const tripMembers = await fetchMembersByTrip(trip._id);
		
	// 	setMembers([]);
	// };
	
	const handleMemberToggle = (participant) => {
		const maxMembers = parseInt(numMembers) || 0;
		
		// Check if the participant is already selected by comparing IDs
		const isSelected = members.some(m => m._id === participant._id);
		
		if (isSelected) {
			// Remove the participant
			setMembers(members.filter(m => m._id !== participant._id));
		} else if (members.length < maxMembers) {
			// Add the participant
			setMembers([...members, participant]);
		}
	};


	const handleSubmit = async () => {
		if (!amount.trim() || !category) {
			Alert.alert("Error", "Please enter all required fields");
			return;
		}
	
		if (paymentType === "group" && (!selectedEvent || members.length === 0)) {
			Alert.alert("Error", "Please complete the group payment details");
			return;
		}
	
		try {
			const payload = {
				amount,
				description,
				category,
				paymentType,
				tripId: selectedEvent?._id || null,
				members,
				paidBy: user._id,
			};
	
			await addPayment(payload);
			Alert.alert("Success", "Payment recorded successfully!");
			navigation.goBack();
		} catch (err) {
			console.error("Error submitting payment:", err);
			Alert.alert("Error", "Something went wrong while recording the payment.");
		}
	};
	

  return (
    <SafeAreaView style={styles.safeArea}>
			<View style={{ flex: 1, padding: 10 }}>
        <Navbar title="Add Payment" userId={userId} />
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.label}>Amount Paid:</Text>
          <TextInput style={styles.input} placeholder="Enter amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
          
          <Text style={styles.label}>Description:</Text>
          <TextInput style={styles.input} placeholder="Enter description" value={description} onChangeText={setDescription} />
          
          <Text style={styles.label}>Category:</Text>
          <View style={styles.categoryIconContainer}>
            {categories.map((cat, index) => (
              <TouchableOpacity 
                key={cat} 
                style={[styles.categoryIconWrapper, category === cat && styles.selectedCategoryIcon]} 
                onPress={() => setCategory(cat)}
              >
                <Image 
                  source={categoryIcons[cat]} 
                  style={styles.categoryIcon} 
                  resizeMode="contain"
                />
                <Text style={[styles.categoryLabel, category === cat && styles.selectedCategoryLabel]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Payment Type:</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity style={[styles.toggleButton, paymentType === "individual" && styles.activeButton]} onPress={() => setPaymentType("individual")}>
              <Text style={[styles.toggleText, paymentType === "individual" && styles.activeText]}>Individual</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.toggleButton, paymentType === "group" && styles.activeButton]} onPress={() => setPaymentType("group")}>
              <Text style={[styles.toggleText, paymentType === "group" && styles.activeText]}>Group</Text>
            </TouchableOpacity>
          </View>
          
          {paymentType === "group" && (
            <View>
              <Text style={styles.label}>Select Event:</Text>
              <View style={styles.customPicker}>
								<FlatList
									data={events}
									horizontal={false}
									keyExtractor={(item) => item._id}
									numColumns={2}
									contentContainerStyle={styles.eventListContainer}
  								columnWrapperStyle={styles.customPicker} // Use columnWrapperStyle instead
									renderItem={({ item }) => (
										<TouchableOpacity
											style={[
												styles.pickerItem,
												selectedEvent?._id === item._id && styles.selectedPickerItem,
											]}
											// onPress={() => handleSelectEvent(item._id)}
											onPress={handleSelectEvent(item)}
										>
											<Text
												style={[
													styles.pickerItemText,
													selectedEvent?._id === item._id && styles.selectedPickerItemText,
												]}
											>
												{item.tripName}
											</Text>
										</TouchableOpacity>
									)}
								/>

              </View>
              
              <Text style={styles.label}>Number of Members:</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter number of members" 
                keyboardType="numeric" 
                value={numMembers} 
                onChangeText={(text) => {
                  setNumMembers(text);
                  // If new number is less than current selections, trim the selections
                  const newMax = parseInt(text) || 0;
                  if (members.length > newMax) {
                    setMembers(members.slice(0, newMax));
                  }
                }} 
              />
              
              {selectedEvent && (
                <View>
                  {/* <Text style={styles.label}>Select Members to Split With:</Text>
                  <Text style={styles.subText}>
                    You have selected {members.length} of {numMembers} members
                  </Text>
                  {eventParticipants.map((participant, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={[
                        styles.memberOption, 
                        members.includes(participant) && styles.selectedMemberOption,
                        members.length >= parseInt(numMembers) && !members.includes(participant) ? styles.disabledMemberOption : {}
                      ]} 
                      onPress={() => handleMemberToggle(participant)}
                    >
                      <Text 
                        style={[
                          styles.memberText,
                          members.includes(participant) ? styles.selectedMemberText : {},
                          members.length >= parseInt(numMembers) && !members.includes(participant) ? styles.disabledText : {}
                        ]}
                      >
                        {participant}
                      </Text>
                    </TouchableOpacity>
                  ))} */}
									<Text style={styles.label}>Select Members to Split With:</Text>
									<Text style={styles.subText}>
										You have selected {members.length} of {numMembers} members
									</Text>
									<FlatList
										data={eventParticipants}
										keyExtractor={(item) => item._id}
										renderItem={({ item: participant }) => (
											<TouchableOpacity 
												style={[
													styles.memberOption, 
													members.some(m => m._id === participant._id) && styles.selectedMemberOption,
													members.length >= parseInt(numMembers) && !members.some(m => m._id === participant._id) ? styles.disabledMemberOption : {}
												]} 
												onPress={() => handleMemberToggle(participant)}
											>
												<Text 
													style={[
														styles.memberText,
														members.some(m => m._id === participant._id) ? styles.selectedMemberText : {},
														members.length >= parseInt(numMembers) && !members.some(m => m._id === participant._id) ? styles.disabledText : {}
													]}
												>
													{participant.name || participant.username || "Unknown user"}
												</Text>
											</TouchableOpacity>
										)}
										// Optional - add these for better performance:
										initialNumToRender={10}
										maxToRenderPerBatch={10}
										windowSize={5}
										// Set to false since this list isn't long enough to need recycling
										removeClippedSubviews={false}
										// This prevents nested scrolling issues
										scrollEnabled={false}
										// To reduce memory usage
										updateCellsBatchingPeriod={50}
									/>
                </View>
              )}
            </View>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f0f0f0" },
  container: { padding: 20, flex: 1 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  subText: { fontSize: 14, color: "#666", marginBottom: 10, fontStyle: "italic" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 10, backgroundColor: "#fff" },
  
  // New styles for category icons
  categoryIconContainer: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between",
    marginBottom: 15 
  },
  categoryIconWrapper: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff"
  },
  selectedCategoryIcon: {
    backgroundColor: "#e0d3e8",
    borderColor: "#470967",
    borderWidth: 2
  },
  categoryIcon: {
    width: 40,
    height: 40,
    marginBottom: 5
  },
  categoryLabel: {
    fontSize: 12,
    color: "#000"
  },
  selectedCategoryLabel: {
    fontWeight: "bold",
    color: "#470967"
  },
  
  // Original styles
	customPicker: { marginBottom: 10 },
	eventListContainer: { marginBottom: 10 },  pickerItem: { 
    padding: 10, 
    marginRight: 10, 
    marginBottom: 5, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 8, 
    backgroundColor: "#fff" 
  },
  selectedPickerItem: { 
    backgroundColor: "#470967", 
    borderColor: "#470967" 
  },
  pickerItemText: { color: "#000" },
  selectedPickerItemText: { color: "#fff" },
  toggleContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  toggleButton: { padding: 12, borderRadius: 8, backgroundColor: "#ddd", flex: 1, alignItems: "center", marginHorizontal: 5 },
  activeButton: { backgroundColor: "#470967" },
  toggleText: { fontWeight: "bold", color: "#000" },
  activeText: { color: "#fff" },
  memberOption: { padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginVertical: 5, backgroundColor: "#fff" },
  memberText: { color: "#000" },
  selectedMemberOption: { backgroundColor: "#e0d3e8", borderColor: "#470967" },
  selectedMemberText: { fontWeight: "bold", color: "#470967" },
  disabledMemberOption: { backgroundColor: "#f8f8f8", borderColor: "#ddd" },
  disabledText: { color: "#ccc" },
  submitButton: { backgroundColor: "#470967", padding: 15, borderRadius: 8, marginTop: 20 },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});

export default AddPaymentPage; 