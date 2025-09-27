import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONT_SIZES, SPACING } from "../styles.js";
import Logo from "../components/Logo";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginBottom: 40,
  },
  paragraph: {
    color: COLORS.lightGray,
    fontSize: FONT_SIZES.large,
    textAlign: "center",
    fontFamily: "NunitoRegular",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: COLORS.primaryBlue,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.large,
    fontFamily: "MontserratSemiBold",
  },
});
