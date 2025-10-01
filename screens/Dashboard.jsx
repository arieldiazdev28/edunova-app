import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";

import { FIREBASE_AUTH } from "../FirebaseConfig";
import { COLORS, FONT_SIZES } from "../styles.js";

import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

import api from "../api.js";

const Dashboard = () => {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      console.log("Sesión cerrada");
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  //Función que obtiene la información de las materias
  const get_materias = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Obteniendo materias...");
      const data = await api.get("/materias");
      console.log("Materias obtenidas:", data.materias?.length || 0);

      setMaterias(data.materias || []);
    } catch (error) {
      console.error("Error al obtener materias:", error.message);

      const errorMessage = error.message || "Error al conectar con el servidor";
      setError(errorMessage);
      Alert.alert("Error de Conexión", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get_materias();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.white} />
          <Text style={styles.loadingText}>Cargando materias...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />

        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>
            "El aprendizaje es experiencia, todo lo demás es información" -
            Albert Einstein
          </Text>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button title="Reintentar" onPress={get_materias} />
          </View>
        ) : materias.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay materias disponibles</Text>
          </View>
        ) : (
          <View style={styles.materiasContainer}>
            <Text style={styles.sectionTitle}>Mis Materias</Text>
            {materias.map((materia) => (
              <View key={materia.idMateria} style={styles.materiaCard}>
                <Text style={styles.materiaTitle}>{materia.titulo}</Text>
                {materia.descripcion && (
                  <Text style={styles.materiaDesc}>{materia.descripcion}</Text>
                )}
              </View>
            ))}
          </View>
        )}
        {/* <Button title="Cerrar sesión" onPress={handleLogout} /> */}
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: COLORS.white,
    marginTop: 10,
    fontSize: 16,
  },
  quoteContainer: {
    padding: 10,
    marginVertical: 10,
  },
  quote: {
    color: COLORS.white,
    textAlign: "center",
    fontFamily: "NunitoRegular",
    fontSize: 18,
    fontStyle: "italic",
  },
  errorContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    borderRadius: 8,
    alignItems: "center",
  },
  errorText: {
    color: "#ff6b6b",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
  },
  emptyContainer: {
    margin: 20,
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.white,
    fontSize: 16,
  },
  materiasContainer: {
    padding: 15,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  materiaCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  materiaTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  materiaDesc: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 5,
    opacity: 0.8,
  },
});

export default Dashboard;
