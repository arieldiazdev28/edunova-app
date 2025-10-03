import { ScrollView, View, StyleSheet, Button, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { COLORS, FONT_SIZES } from "../styles.js";

const Card = ({subjectName, imageSource}) => {
    return (
        <TouchableOpacity style={styles.card}>
            <View style={styles.cardImage}>
                <Image source={imageSource} style={styles.image} />
            </View>
            {/*  <Divider /> */}
            <Text style={styles.cardText}>{subjectName}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.white,
        margin: 25,
        borderWidth: 1,
        borderRadius: 10,
        elevation: 20,
        width: 200
    },
    cardImage: {
        paddingBottom: 20
    },
    image: {
        resizeMode: "cover",
        width: "100%",
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    cardText: {
        color: COLORS.black,
        textAlign: "center",
        fontFamily: "NunitoRegular",
        fontSize: FONT_SIZES.large,
        paddingBottom: 20,
        fontWeight: "bold"
    }
})
export default Card;