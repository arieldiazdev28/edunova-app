import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS } from "../styles.js";

const CardMateria = ({ subjectTitle, subjectImage, subjectDescription, onPressButton }) => {
  return (
    <View style={styles.subjectCard}>
      <Image style={styles.subjectImage} source={subjectImage} />
      <View style={styles.subjectCardContent}>
        <Text style={styles.subjectTitle}>{subjectTitle}</Text>
        <Text style={styles.subjectDescription}>{subjectDescription}</Text>
        <View style={styles.subjectCardFooter}>
          <TouchableOpacity style={styles.buttonSeeMore} onPress={onPressButton}>
            <Text style={{ fontWeight: "500", textAlign: "center" }}>Ver más</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subjectCard: {
    flexDirection: "row",
    padding: 9,
    marginVertical: 3,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 20,
  },
  subjectImage: {
    width: "40%",
    height: 130,
    borderRadius: 20,
    resizeMode: "cover",
  },
  subjectTitle: {
    fontFamily: "NunitoRegular",
    fontSize: 18,
    fontWeight: "700"
  },
  subjectCardContent: {
    width: "60%",
    marginLeft: 16,
  },
  subjectDescription: {
    fontFamily: "NunitoRegular",
    fontSize: 16,
    marginTop: 8,
    marginRight: 20,
    color: COLORS.gray,
    textAlign: "justify"
  },
  subjectCardFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    marginVertical: 15,
  },
  buttonSeeMore: {
    width: "100%",
    backgroundColor: "#6ccf82ff",
    fontSize: 18,
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
  }
});
export default CardMateria;