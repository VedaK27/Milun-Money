// import React, { useEffect } from "react";
// import { View, Image, StyleSheet } from "react-native";
// import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

// const SplashScreen = () => {
//   const opacity = useSharedValue(0); 

//   useEffect(() => {
//     opacity.value = withTiming(1, { duration: 3000 }); 
//   }, []);

//   const animatedStyle = useAnimatedStyle(() => ({
//     opacity: opacity.value, 
//   }));

//   return (
//     <View style={styles.container}>
//       <Animated.Image 
//         source={require("../../assets/MMLogo.png")} 
//         style={[styles.logo, animatedStyle]} 
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white",
//   },
//   logo: {
//     width: 150,
//     height: 150,
//   },
// });

// export default SplashScreen;