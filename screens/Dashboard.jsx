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
import { useAuth } from "../context/AuthContext.js";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { COLORS, FONT_SIZES } from "../styles.js";

import Carousel from "../components/Carousel.jsx";
import Subtitle from "../components/Subtitle.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

import api from "../api.js";

const Dashboard = ({ navigation }) => {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
            {/* Sección del catálogo de materias */}
            <View>
              <Subtitle
                text={"Explorar catálogo de materias"}
                subtitleColor={COLORS.successGreen}
              />
              <Carousel items={materias} keyField="idMateria" />
            </View>

            {/* Sección Tus Materias */}
            <View>
              <Subtitle
                text={"Mis materias inscritas"}
                subtitleColor={COLORS.primaryBlue}
              />
              <Carousel items={materias} keyField="idMateria" />
            </View>

            {/* Sección Nuestras Materias */}
            <View>
              <Subtitle
                text={"Mis materias aprobadas"}
                subtitleColor={COLORS.warningOrange}
              />
              <Carousel items={materias} keyField="idMateria" />
            </View>
          </View>
        )}
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
    marginVertical: 5,
  },
  quote: {
    color: COLORS.white,
    textAlign: "center",
    fontFamily: "NunitoRegular",
    fontSize: 18,
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
});

export default Dashboard;
