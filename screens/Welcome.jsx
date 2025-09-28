import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONT_SIZES, SPACING } from "../styles.js";
import Logo from "../components/Logo";

const Welcome = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Logo fontColor={COLORS.primaryBlue} fontSize={26} />
      <View>
        <Text style={styles.subtitle}>
          La mejor plataforma de aprendizaje gratuito
        </Text>
        <Text style={styles.paragraph}>
          ¡Refuerza tu conocimiento y transforma tus sueños en una realidad!
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonTextPrimary}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonTextSecondary}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.primaryBlue,
    fontSize: 24,
    fontFamily: "MontserratBold",
    marginBottom: 10,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 32,
    textAlign: "center",
    fontFamily: "NunitoSemiBold",
    marginTop: 20,
    marginBottom: 30,
  },
  paragraph: {
    color: COLORS.lightGray,
    fontSize: FONT_SIZES.large,
    textAlign: "center",
    fontFamily: "NunitoRegular",
    marginBottom: 30,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimary: {
    backgroundColor: COLORS.primaryBlue,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: COLORS.darkBlue,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 20,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonTextPrimary: {
    color: COLORS.white,
    fontSize: FONT_SIZES.large,
    fontFamily: "MontserratSemiBold",
  },
  buttonTextSecondary: {
    color: COLORS.primaryBlue,
    fontSize: FONT_SIZES.large,
    fontFamily: "MontserratSemiBold",
  }
});
