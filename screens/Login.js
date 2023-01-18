import React, { useState } from 'react';
import {
    Text,
    SafeAreaView,
    View,
    TextInput,
    Pressable,
    Alert,
} from "react-native";

// import app styles
import { styles } from "../utils/styles";

// import async
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState("");

    const storeUsername = async () => {
        try {
            //👇🏻 async function - saves the username to AsyncStorage
            //   redirecting to the Chat page
            await AsyncStorage.setItem("username", username);
            navigation.navigate("Chat");
        } catch (e) {
            Alert.alert("Error! While saving username");
        }
    };

    const handleSignIn = () => {
        if (username.trim()) {
            //👇🏻 calls AsyncStorage function
            storeUsername();
        } else {
            Alert.alert("Username is required.");
        }
    };

    return (
        <SafeAreaView style={styles.loginscreen}>
            <View style={styles.loginscreen}>
                <Text style={styles.loginscreen}>Please Sign In</Text>
                <View style={styles.logininputContainer}>
                    <TextInput
                        autoCorrect={false}
                        placeholder="Enter your username"
                        style={styles.logininput}
                        onChangeText={(value) => setUsername(value)}
                    />
                </View>

                <Pressable onPress={handleSignIn} style={styles.loginbutton}>
                    <View>
                        <Text style={styles.loginbuttonText}>Get Started</Text>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default Login;