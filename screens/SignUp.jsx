import React, { useState } from "react";

// --- Importaciones de Firebase ---
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

// --- Componentes de React Native (UI) ---
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

// --- Recursos Locales y Componentes Reutilizables ---
import { COLORS, FONT_SIZES } from "../styles.js";
import Logo from "../components/Logo";
import CustomInput from "../components/CustomInput.jsx";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.textContainer}>
            <Logo fontSize={26} />
            <Text style={styles.title}>¡Hola!</Text>
            <Text style={styles.subtitle}>
              Iniciemos esta aventura de aprendizaje conociéndote un poco más...
            </Text>
          </View>

          {/* Inputs */}
          <View style={styles.form}>
            <CustomInput
              value={email}
              placeholder="Correo electrónico"
              placeholderTextColor={COLORS.lightGray}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <CustomInput
              secureTextEntry
              value={password}
              placeholder="Contraseña"
              placeholderTextColor={COLORS.lightGray}
              autoCapitalize="none"
              onChangeText={setPassword}
            />
          </View>

          {/* Botón */}
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.vibrantViolet} />
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={signUp}>
                <Text style={styles.buttonText}>Registrarse</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Redireccionamiento a SignUp*/}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              ¿Ya tienes una cuenta?{" "}
              <Text
                onPress={() => navigation.navigate("Login")}
                style={{
                  color: COLORS.deepBlack,
                  fontWeight: "700",
                }}
              >
                Inicia sesión
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontFamily: "NunitoBold",
    color: COLORS.darkBlue,
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.deepBlack,
    fontSize: FONT_SIZES.large,
    textAlign: "center",
    marginTop: 8,
    fontFamily: "NunitoRegular",
  },
  form: {
    marginBottom: 30,
  },
  input: {
    marginVertical: 8,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.primaryBlue,
    paddingVertical: 12,
    width: "80%",
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.large,
    fontFamily: "MontserratSemiBold",
  },
  loginContainer: {
    marginTop: "20",
    alignItems: "center",
  },
  loginText: {
    fontFamily: "NunitoRegular",
    fontSize: FONT_SIZES.medimum,
  },
});
