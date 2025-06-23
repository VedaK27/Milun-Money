import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import loginImage from '../../assets/loginimg.png';
import mmlogo from '../../assets/MMLogo.png';

import { signup_post } from '../services/authService';

const SignupScreen = () => {
  const navigation = useNavigation(); // Get navigation object
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [upiId, setUpiId] = useState(""); 
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!username || !email || !password || !upiId) {
        Alert.alert("Error", "Please fill all the details.");
        return;
    }

    try {
        const userData = { username, email, password, upiId };
        const response = await signup_post(userData);

        if (response.error) {
            Alert.alert("Signup Failed", response.error);
            console.log("Signup Failed", response.error);
        } else {
            Alert.alert("Signup Successful", "You can now log in.");
            const userId = response.user?._id; 
            console.log("Recived user Id :" , {userId})
            navigation.navigate("HomeScreen" , {userId});
            
        }
    } catch (error) {
        Alert.alert("Error", "Something went wrong. Please try again.");
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
        placeholder="Email" 
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="UPI ID" 
        value={upiId}
        onChangeText={setUpiId}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        value={password}
        onChangeText={setPassword} // ✅ Fixed here
      />
      
      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signUpText}>Already have an account? Login</Text>
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

export default SignupScreen;
