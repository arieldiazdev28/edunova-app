import {Text, StyleSheet} from "react-native";
import { COLORS, FONT_SIZES } from "../styles.js";

const Subtitle = ({text}) => {
    return <Text style={styles.subtitle}>{text}</Text>
}
export default Subtitle;

const styles = StyleSheet.create({
    subtitle: {
        color: COLORS.white,
        textAlign: "center",
        fontFamily: "NunitoSemiBold",
        fontSize: FONT_SIZES.large,
        fontWeight: "bold",
        margin: 10,
        padding: 10
    }
})