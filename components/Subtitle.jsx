import { Text, StyleSheet } from "react-native";
import { COLORS, FONT_SIZES } from "../styles.js";

const Subtitle = ({ text, subtitleColor }) => {
  return (
    <Text style={[styles.subtitle, { color: subtitleColor }]}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    textAlign: "left",
    fontFamily: "NunitoBold",
    fontSize: FONT_SIZES.large,
    marginHorizontal: 10,
    padding: 10,
  },
});
export default Subtitle;
