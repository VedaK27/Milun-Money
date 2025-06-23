import React , {useEffect , useState}from "react";
import { 
  View, Image, StyleSheet, TouchableOpacity, Text, ScrollView, Dimensions, Alert, ImageBackground, SafeAreaView , FlatList
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getUserTrips } from "../services/tripService";
const { width } = Dimensions.get("window");

const HomeScreen = ({route}) => {
  const { userId } = route.params ;
  console.log("Received user name in Home :" , userId) ;
  const navigation = useNavigation();

  const [events , setEvents] = useState([]) ;
  const [loading , setLoading] = useState(true) ;

  const eventImages = [
    require("../../assets/homeimg1.jpg") ,
    require("../../assets/homeimg2.jpg") ,
    require("../../assets/homeimg3.jpg")
  ];
  
  useEffect(()=>{
    fetchTrips() ;
  },[]) ;
  const fetchTrips = async () => {
    try{
      console.log("In fetchTrip Homescreen : " , userId) ;
      const response = await getUserTrips(userId) ;
      if(response && response.success){
        setEvents(response.trips) ;
      }else{
        console.log("Failed to fetch Trips" , error.message) ;
      }
    }catch(error){
      console.log("Error in fetching trips" , error) ;
    }finally{
      setLoading(false) ;
    }
  }
  const handleProfilePress = () => {
    navigation.navigate("Profile" , {userId}) 
  };

  const handleAddEventPress = () => {
    Alert.alert("Add Event", "Redirecting to event creation!");
    navigation.navigate("AddEventPage" , {userId})
  };

  const handleEndEventPress = (eventName) => {
    Alert.alert("Event Ended", `${eventName} has been ended`);
    //navigation.navigate("AddEventPage") ;
  };

  const handleViewEventPress = (eventName) => {
    Alert.alert("View Event", `Opening details for ${eventName}`);
  };
  
  const goToTripDetails = (tripId) => {
    navigation.navigate("TripDetails" , {userId , tripId});
  };


  const handleAddExpensePress = () => {
    // Alert.alert("Add Expense", "You can add your expenses here!");
    navigation.navigate("AddPaymentPage")
    
  };

  const handleYourExpense = () => {
    //Alert.alert("Click Here !") ;
    navigation.navigate("ExpenseScreen") ;
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Logo Section with purple header - Fixed */}
      <View style={styles.header}>
        <Image source={require("../../assets/MMLogo.png")} style={styles.logo} />
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={handleProfilePress}
        >
          <Image source={require("../../assets/profilelogo.png")} style={styles.profile} />
        </TouchableOpacity>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* My Trips Heading - Enlarged */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>My Events</Text>
          <View style={styles.headingUnderline} />
        </View>

        {loading ? (
        <Text style={styles.loadingText}>Loading Events...</Text>
      ) : events.length > 0 ? (
        <FlatList
  data={events}
  keyExtractor={(item) => item.id?.toString() || Math.random().toString()} // Ensure key is a string
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.eventScrollView}
  renderItem={({ item, index }) => (
    <View style={styles.eventCardContainer}>
      <ImageBackground 
        source={eventImages[index % eventImages.length]}  // Cycle through images
        style={styles.eventCardBackground}
        resizeMode="cover"
      >
        <View style={styles.eventCardOverlay}>
          <Text style={styles.eventName}>{item.tripName}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.endEventButton]} 
              onPress={() => handleEndEventPress(item.tripName)}
            >
              <Text style={styles.buttonText}>End Event</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.viewEventButton]} 
              onPress={()=>goToTripDetails(item._id)}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )}
/>
      ) : (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>You don't have any events yet.</Text>
          <Text style={styles.noEventsSubtext}>Create a new event to start tracking your trips!</Text>
        </View>
      )}

        {/* "Add Trip" Button - Repositioned below My Events section */}
        <TouchableOpacity 
          style={styles.addTripButton} 
          onPress={handleAddEventPress}
        >
          <Text style={styles.addTripText}>+ New Event</Text>
        </TouchableOpacity>
        
        {/* Add Expense Prompt Section */}
        <View style={styles.expensePromptContainer}>
          <Image 
            source={require("../../assets/homepage2.jpg")} 
            style={styles.expensePromptImage} 
          />
          <View style={styles.expensePromptTextContainer}>
            <Text style={styles.expensePromptTitle}>Track Your Expenses</Text>
            <Text style={styles.expensePromptDescription}>
              Click the + button below to add your expenses for any event
            </Text>
          </View>
        </View>
        
        {/* Your Expenses Section */}
        <TouchableOpacity onPress={handleYourExpense}>
          <View style={styles.expenseSectionContainer}>
            <Text style={styles.expenseSectionTitle}>Your Expenses</Text>
            <View style={styles.expenseSectionUnderline} />
            
            {/* Empty state or placeholder for expenses */}
            <View style={styles.emptyExpenseContainer}>
              <Text style={styles.emptyExpenseText}>
                Track Your Expense 
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Add padding at bottom to ensure content isn't hidden behind the plus button */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Plus Logo Button - Fixed at the bottom center */}
      <TouchableOpacity 
        style={styles.plusButtonContainer}
        onPress={handleAddExpensePress}
      >
        <View style={styles.plusButton}>
          <Text style={styles.plusIcon}>+</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    paddingBottom: 100, // Ensure content doesn't hide behind the plus button
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#470967",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  logo: {
    width: 65,
    height: 65,
    resizeMode: "contain",
    tintColor: "#ffffff"
  },
  profileButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    padding: 8,
  },
  profile: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    tintColor: "#ffffff"
  },
  headingContainer: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center"
  },
  heading: {
    fontSize: 32, // Increased font size
    fontWeight: "bold",
    color: "#470967",
  },
  headingUnderline: {
    height: 4, // Increased height
    width: 80, // Increased width
    backgroundColor: "#f16d95",
    marginTop: 8,
    borderRadius: 2
  },
  noEventsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    backgroundColor: "rgba(240, 240, 248, 0.7)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e8",
    marginBottom: 20,
  },
  noEventsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#470967",
    marginBottom: 8,
    textAlign: "center",
  },
  noEventsSubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  eventScrollView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10
  },
  eventCardContainer: {
    width: width * 0.85,
    height: 300,
    marginRight: 20,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 6,
    elevation: 6,
  },
  eventCardBackground: {
    width: "100%",
    height: "100%",
  },
  eventCardOverlay: {
    width: "100%",
    height: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 245, 0.45)",
  },
  eventName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 120,
    color: "#000000",
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 12
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
  },
  endEventButton: {
    backgroundColor: "#1b1a56",
  },
  viewEventButton: {
    backgroundColor: "#f5b742",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  addTripButton: {
    alignSelf: "center",
    margin: 20,
    borderRadius: 40,
    backgroundColor: "#4daefd",
    paddingVertical: 15,
    paddingHorizontal: 40, // Increased horizontal padding
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },
  addTripText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5
  },
  
  expensePromptContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  expensePromptImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  expensePromptTextContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  expensePromptTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#470967",
    marginBottom: 5,
  },
  expensePromptDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
 
  expenseSectionContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
    backgroundColor: "#f0f0f8",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  expenseSectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#470967",
    alignSelf: "center",
  },
  expenseSectionUnderline: {
    height: 3,
    width: 50,
    backgroundColor: "#f16d95",
    marginTop: 8,
    marginBottom: 15,
    alignSelf: "center",
    borderRadius: 2
  },
  emptyExpenseContainer: {
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyExpenseText: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  bottomPadding: {
    height: 80,
  },
  plusButtonContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 6,
    borderRadius: 30,
    zIndex: 100,
  },
  plusButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#470967",
  },
  plusIcon: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default HomeScreen;