import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../styles.js";

const Divider = () => {
    return (
        <>
            <View style={{marginHorizontal: 20}}>
                <View style={styles.divider} />
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: COLORS.white,
        marginBottom: 20,
    },
});

export default Divider;