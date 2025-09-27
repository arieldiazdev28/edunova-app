import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONT_SIZES } from "../styles.js";

const Logo = ({ fontColor = COLORS.primaryBlue, fontSize = 24 }) => {
  return (
    <View>
      <Text style={[styles.text, { color: fontColor, fontSize: fontSize }]}>
        EduNova
      </Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  text: {
    fontFamily: "MontserratBold",
  },
});
