import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert, userId } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Navbar = (props) => {
  const { title, showBackButton = true, onBackPress, customAction, userId } = props;
  const navigation = useNavigation();
  const route = useRoute();

  const showConfirmationAlert = () => {
    Alert.alert(
      "Unsaved Changes",
      "You have unsaved changes. Are you sure you want to go back?",
      [
        {
          text: "Stay",
          onPress: () => console.log("User chose to stay"),
          style: "cancel",
        },
        {
          text: "Discard",
          onPress: () => navigation.goBack(),
        },
      ],
      { cancelable: false }
    );
  };

  const primaryScreens = ["AddEvent", "ExpenseScreen", "AddPaymentPage"];

  const handleBackPress = () => {
    if (route.name === "AddEvent") showConfirmationAlert();
    else if (primaryScreens.includes(route.name)) {
      navigation.navigate("Home", { userId });
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.navbar}>
      {showBackButton && (
        <Pressable onPress={handleBackPress} style={styles.backButton}>
          <Image 
            source={require('../assets/backarrow.png')} 
            style={styles.backIcon} 
            resizeMode='contain'
          />
        </Pressable>
      )}

      <Text style={styles.title}>{title}</Text>

      {customAction && (
        <Pressable onPress={customAction.onPress} style={styles.actionButton}>
          {customAction.icon ? (
            <Image 
              source={customAction.icon} 
              style={styles.actionIcon} 
              resizeMode='contain'
            />
          ) : (
            <Text style={styles.actionText}>{customAction.title}</Text>
          )}
        </Pressable>
      )}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#470967', 
    padding: 15,
    height: 120,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50, 
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 55,
    padding: 10,
    zIndex: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  actionButton: {
    position: 'absolute',
    right: 15,
    top: 55,
    padding: 10,
    zIndex: 10,
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});