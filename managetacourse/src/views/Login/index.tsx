import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, TextInput, withTheme } from "react-native-paper";
import {TextInput as ReactTextInput} from 'react-native';
import React, { useRef, useState } from "react";
import { logUserIn } from "../../api/Auth";
import { API_URL } from "@env";

function LoginView() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const passwordRef = useRef<ReactTextInput>(null)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const focusOnNextTextInput = () => {
      if (passwordRef.current) {
        passwordRef.current.focus()
      }
    }

    const handleSubmit = async () => {
      try {
        await logUserIn(username, password)
      } catch (e) {
        console.error("Error logging in", e)
      }
    }

    const handlePasswordEye = async () => {
      setIsPasswordVisible(!isPasswordVisible)
      console.log(API_URL)
    }

    return (
        <View style={styles.container}>
            <TextInput mode={"outlined"} label={"Username"} value={username} onChangeText={text => setUsername(text)} autoCorrect={false} onSubmitEditing={() => focusOnNextTextInput()} autoFocus/>
            <TextInput mode={"outlined"} right={<TextInput.Icon icon={"eye"} onPress={handlePasswordEye}/>} label={"Password"}
                       value={password} onChangeText={text => setPassword(text)} secureTextEntry={isPasswordVisible} autoCorrect={false} ref={passwordRef}/>
            <Button onPress={handleSubmit} mode={"contained"}>Login</Button>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 12
  }
})

export default withTheme(LoginView);
