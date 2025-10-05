import React, { useState } from "react";

// --- Importaciones de Firebase ---
import { FIREBASE_AUTH } from "../FirebaseConfig"; // Importa la instancia de autenticación de Firebase (auth).
import { signInWithEmailAndPassword } from "firebase/auth"; // Importa la función específica de Firebase para iniciar sesión con email y contraseña.
import { useAuth } from "../context/AuthContext.js";

// --- Componentes de React Native (UI) ---
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

// --- Recursos Locales y Componentes Reutilizables ---
import { COLORS, FONT_SIZES } from "../styles.js";
import Logo from "../components/Logo";
import CustomInput from "../components/CustomInput.jsx";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Función para iniciar sesión
  const signIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, ingresa tu coreo y contraseña");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error) {
      console.log("Error de inicio de sesión: ", error);
      let errorMessage = "Ocurrió un error. Verifica tus credenciales";

      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Correo o contraseña inválidos. Intenta de nuevo.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Demasiados intentos fallidos. Intenta más tarde.";
      }

      Alert.alert("Inicio de Sesión Fallido", errorMessage);
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
            <Text style={styles.title}>¡Bienvenido de nuevo!</Text>
            <Text style={styles.subtitle}>Nos alegra tenerte de vuelta</Text>
          </View>

          {/* Inputs */}
          <View style={styles.form}>
            <CustomInput
              value={email}
              onChangeText={setEmail}
              placeholder="Correo electrónico"
              placeholderTextColor={COLORS.lightGray}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CustomInput
              value={password}
              onChangeText={setPassword}
              placeholder="Contraseña"
              placeholderTextColor={COLORS.lightGray}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Botón */}
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.vibrantViolet} />
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Redireccionamiento a SignUp*/}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              ¿Aún no tienes cuenta?{" "}
              <Text
                onPress={() => navigation.navigate("SignUp")}
                style={{
                  color: COLORS.deepBlack,
                  fontWeight: "700",
                }}
              >
                Regístrate
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
  signUpContainer: {
    marginTop: "20",
    alignItems: "center",
  },
  signUpText: {
    fontFamily: "NunitoRegular",
    fontSize: FONT_SIZES.medimum,
  },
});
