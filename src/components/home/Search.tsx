import React, { useState } from "react";
import {View, TextInput, StyleSheet, Text} from "react-native";
import SearchResult from "./SearchResult";

export default function SearchScreen() {
    const [searchValue, setSearchValue] = useState("");
    return (
        <View style={style.container}>
            <TextInput
                style={style.searchBar}
                placeholder="Search"
                value={searchValue}
                onChangeText={(text) => setSearchValue(text)}
            />
            <SearchResult search={searchValue} />
        </View>
    );
}

export const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: "center",
        paddingVertical: 40,
    },
    searchBar: {
        width: "90%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: "#ffffff",
    },
});
