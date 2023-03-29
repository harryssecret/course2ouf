import React from "react";
import { List, Text, withTheme } from "react-native-paper";
import { View } from "react-native";

function StudentsView() {
    return <View>
        <List.Section>
            <List.Subheader>Students</List.Subheader>
            <List.Item title={"Student 1"} description={"He goes like real fast"}/>

        </List.Section>
    </View>
}

export default withTheme(StudentsView)
