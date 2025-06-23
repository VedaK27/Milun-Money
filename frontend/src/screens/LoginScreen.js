import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // ✅ Import navigation hook
import loginImage from '../../assets/loginimg.png';
import mmlogo from '../../assets/MMLogo.png';

import { login_post } from '../services/authService'; // Ensure this function is correctly defined

const LoginScreen = () => {
  const navigation = useNavigation(); // ✅ Use navigation hook
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    console.log("Login in started")
    if (!username || !password) {
      Alert.alert("Error", "Please fill all the details.");
      return;
    }
    console.log("Here in login")
    try {
      const response = await login_post({ emailOrUsername: username, password });
      console.log("Login Response:", response);
      console.log("Reached Here !") ;

      if (response.error) {
        Alert.alert("Login Failed", response.error);
      } else {
        // Store token in AsyncStorage (handled in login_post)
        const userId = response.user?._id; // Ensure backend sends the user object
        console.log("Recived user Id :" , {userId})
        navigation.navigate("Home", {userId}); // ✅ Fixed navigation
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Failed", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={mmlogo} style={styles.logoimage} />
      <Image source={loginImage} style={styles.image} /> 

      <TextInput 
        style={styles.input} 
        placeholder="User ID"
        value={username} 
        onChangeText={setUserName} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry={true} // ✅ Fixed password input
        value={password} 
        onChangeText={setPassword} 
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}> 
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9F8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  logoimage: {
    width: 100, 
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  input: {
    width: '80%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
  signUpText: {
    fontSize: 14,
    color: 'black',
    marginTop: 10,
  },
});

export default LoginScreen;
