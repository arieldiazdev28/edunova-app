import React, { use, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import CustomInput from "../components/CustomInput.jsx";
import SingleSelectPicker from "../components/SingleSelectPicker.jsx";
import MultiSelectCheckbox from "../components/MultiSelectCheckBox.jsx";
import { useAuth } from "../context/AuthContext";
import api from "../api.js";

// Data para el nivel académico
const NIVELES_ACADEMICOS = [
  { label: "Tercer ciclo", value: "tercerCiclo" },
  { label: "Bachillerato", value: "bachillerato" },
  { label: "Universidad", value: "universidad" },
];

//Data para las materias de interés
const MATERIAS_INTERES = [
  { label: "Álgebra Lineal", value: "algebraLineal" },
  { label: "Cálculo Diferencial", value: "calculoDiferencial" },
  { label: "Programación Python", value: "programacionPython" },
  { label: "Estructuras de Datos", value: "estructurasDatos" },
];

// --- Componente principal ---

export default function CompletePerfil({ route }) {
  // El firebaseUid se obtiene de la navegación que hizo SignUp.js
  const { firebaseUid } = route.params;

  // La función para actualizar el estado global se obtiene del AuthContext
  const { setIsProfileComplete } = useAuth();

  // Estados para los datos del formulario
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [nivelAcademico, setNivelAcademico] = useState(null); //Estado utilizado en el Picker
  const [materiasPreferencia, setMateriasPreferencia] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lógica de Envío del Perfil a la API de Flask
  const handleSubmitProfile = async () => {
    // Validación básica
    if (
      !nombre ||
      !edad ||
      !nivelAcademico ||
      materiasPreferencia.length === 0
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);

    const profileData = {
      firebase_uid: firebaseUid,
      nombre: nombre,
      edad: parseInt(edad),
      nivel_academico: nivelAcademico,
      materias_preferencia: materiasPreferencia.join(", "),
    };

    try {
      const data = await api.post("/usuarios", profileData);

      Alert.alert(
        "Éxito",
        data.message || "Perfil guardado. ¡Bienvenido a la app!"
      );

      setIsProfileComplete(true);
    } catch (error) {
      Alert.alert("Error al guardar perfil", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flexContainer} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Casi Listo...</Text>
          <Text style={styles.subtitle}>
            Solo necesitamos unos datos más para personalizar tu experiencia.
          </Text>

          {/* Input: Nombre Completo */}

          <CustomInput
            placeholder="Nombre Completo"
            value={nombre}
            onChangeText={setNombre}
          />

          {/* Input: Edad */}
          <CustomInput
            placeholder="Edad"
            value={edad}
            onChangeText={setEdad}
            keyboardType="numeric"
          />

          {/* Input: Nivel Académico */}
          <SingleSelectPicker
            options={NIVELES_ACADEMICOS}
            selectedValue={nivelAcademico}
            onValueChange={setNivelAcademico}
            placeholder="Selecciona tu nivel académico"
            title="Nivel Académico"
          />

          {/* Input: Preferencia de Materias */}
          <MultiSelectCheckbox
            options={MATERIAS_INTERES}
            selectedValues={materiasPreferencia}
            onValueChange={setMateriasPreferencia}
            title="Materias de Interés:"
          />

          {/* Botón */}
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmitProfile}
            >
              <Text style={styles.buttonText}>
                Completar Perfil y Continuar
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// --- Estilos de ejemplo ---
const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  container: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  // ... estilos existentes
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  pickerItem: {
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
