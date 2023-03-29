import {View} from "react-native";
import {Button, TextInput} from "react-native-paper";
import React, {useState} from "react";
import {API_URL} from "@env";

import * as SecureStore from 'expo-secure-store'

async function saveToken(token: string) {
  await SecureStore.setItemAsync("token", token)
}

export default function LoginView() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const logUserIn = async () => {
        const res = await fetch(`${API_URL}/auth`, {
            method: "POST",
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({username: username, password: password})
        })
      if (res.status === 200) {
        const body = await res.json()
        await saveToken(body.token)
      }
    }

    return (
        <View>
            <TextInput label={"Nom d'utilisateur"} value={username} onChangeText={text => setUsername(text)}/>
            <TextInput mode={"outlined"} right={<TextInput.Affix text={"/100"}/>} label={"Mot de passe"}
                       value={password} onChangeText={text => setPassword(text)}/>
            <Button onPress={() => logUserIn()} mode={"contained"}>Se connecter</Button>
        </View>
    );
}
