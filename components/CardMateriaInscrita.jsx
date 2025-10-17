import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../styles.js";
import { Ionicons } from "@expo/vector-icons";

const CardMateriaInscrita = ({
    title = "Nombre de la materia",
    cardColor = COLORS.primaryBlue,
    buttonColor = COLORS.primaryBlue,
    onPress,
}) => {
    return (
        <View style={[styles.cardMateriaInscrita, { backgroundColor: cardColor }]}>
            <Text style={styles.cardTitle} numberOfLines={2}>
                {title}
            </Text>
            <TouchableOpacity
                style={[styles.buttonLearn, { backgroundColor: buttonColor }]}
                onPress={onPress}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonLearnText}>Continuar aprendizaje</Text>
                <Ionicons name="arrow-forward-sharp" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardMateriaInscrita: {
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 20,
    },
    cardTitle: {
        textAlign: "center",
        fontFamily: "nunitoBold",
        color: COLORS.white,
        fontSize: 26,
        marginBottom: 15,
        fontWeight: "700",
    },
    buttonLearn: {
        backgroundColor: "#2e7d5fff",
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    buttonLearnText: {
        textAlign: "center",
        fontFamily: "nunitoRegular",
        color: COLORS.white,
    }
});

export default CardMateriaInscrita;