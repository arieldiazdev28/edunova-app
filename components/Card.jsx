import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, FONT_SIZES } from "../styles.js";

const Card = ({ subject, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardImage}>
        <Image source={require("../assets/math.jpg")} style={styles.image} />
      </View>
      {/*  <Divider /> */}
      <Text style={styles.cardText}>{subject.titulo}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    elevation: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    width: 200,
  },
  cardImage: {
    paddingBottom: 20,
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardText: {
    color: COLORS.black,
    textAlign: "center",
    fontFamily: "NunitoRegular",
    fontSize: FONT_SIZES.large,
    paddingBottom: 20,
    fontWeight: "bold",
  },
});
export default Card;
