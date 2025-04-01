// components/CustomHeader.tsx

import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; 
interface CustomHeaderProps {
  title: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      {/* Left Side: Home Icon and Title */}
      <View style={styles.leftContainer}>
        <Icon name="home" size={32} color="#333" style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right Side: Notification and Profile Icon */}
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={() => alert("Notifications")}>
          <Icon name="bell" style={styles.iconSmall} color="#333" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Profile")}>
        
            <Image
              source={require("../../assets/images/profile.png")}
              style={styles.profilePic}
            />

        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 130,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  iconSmall: {
    marginRight: 16,
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
    
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});


export default CustomHeader;
