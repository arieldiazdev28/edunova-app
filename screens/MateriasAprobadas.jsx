import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import Footer from "../components/Footer";


import { useAuth } from "../context/AuthContext";
import api from "../api.js"; 
import { COLORS } from "../styles.js";


const MateriasAprobadas = ({ navigation, openDrawer }) => {
  // 1. Obtener el ID del usuario del contexto
  const { user } = useAuth(); 
  const userId = user?.uid;


  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 3. Efecto para la llamada a la API
  useEffect(() => {
    if (!userId) {
        // Esto solo debería ocurrir si el usuario no está autenticado, pero es una buena práctica.
        console.warn("Usuario no autenticado. No se puede cargar estadísticas.");
        setLoading(false);
        return;
    }

    const fetchStats = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await api.get(`/estadisticas/${userId}`); 
        setEstadisticas(response);
      } catch (e) {
        console.error("Error al obtener estadísticas académicas:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]); // Depende del userId para ejecutarse

  // 4. Manejo del estado de carga y error

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.lightBlue} />
        <Text style={styles.loadingText}>Cargando progreso...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>
          No se pudieron cargar las estadísticas.
        </Text>
      </View>
    );
  }

  console.log("ESTADÍSTICAS DEL USUARIO: ",estadisticas);

  // Valores predeterminados si stats es null o los campos no existen
  const promedioGeneral = estadisticas?.promedioGeneral ? estadisticas.promedioGeneral.toFixed(2) : '0.00';
  const totalInscritas = estadisticas?.totalInscritas || 0;
  const totalAprobadas = estadisticas?.totalAprobadas || 0;
  const totalReprobadas = estadisticas?.totalReprobadas || 0;
  console.log("Usuario", userId);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header openDrawer={openDrawer} />
        <Text style={styles.academicHistoryText}>
          Historial académico <Ionicons name="school" size={25} color={COLORS.white} />
        </Text>
        <Text style={styles.subtitle}>
          {promedioGeneral >= 7 ? '¡Felicidades! Estas obteniendo increíbles resultados' : '¡Ánimos! Nunca pares de aprender'}
        </Text>
        
        {/* Contenedor del Promedio General */}
        <View style={styles.scoreContainer}>
          <Ionicons name="ribbon-outline" size={33} color={COLORS.darkBlue} />
          <Text style={styles.scoreText}>Promedio general: {promedioGeneral}</Text>
        </View>

        {/* Indicador de Materias Inscritas */}
        <View style={styles.statCard}>
            <Ionicons name="book-outline" size={24} color={COLORS.lightBlue} />
            <Text style={styles.statText}>Materias activas: {totalInscritas}</Text>
        </View>

        {/* Indicador de Materias Aprobadas */}
        <View style={styles.statCard}>
            <Ionicons name="book-outline" size={24} color={COLORS.lightBlue} />
            <Text style={styles.statText}>Materias aprobadas: {totalAprobadas}</Text>
        </View>
        
       {/* Indicador de Materias Reprobadas */}
        <View style={styles.statCard}>
            <Ionicons name="book-outline" size={24} color={COLORS.lightBlue} />
            <Text style={styles.statText}>Materias reprobadas: {totalReprobadas}</Text>
        </View>

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  loadingText: {
    fontFamily: "NunitoRegular",
    color: COLORS.darkBlue,
    marginTop: 10,
  },
  errorText: {
    fontFamily: "NunitoRegular",
    color: 'red',
    fontSize: 16,
  },
  subtitle: {
    fontFamily: "NunitoRegular",
    color: COLORS.white,
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 10,
    marginBottom: 20, 
  },
  scoreContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  scoreText: {
    fontFamily: "NunitoRegular",
    fontSize: 22, 
    fontWeight: "700",
    color: COLORS.darkBlue,
  },
  statCard: { 
    backgroundColor: COLORS.white,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.lightBlue,
  },
  statText: {
    fontFamily: "NunitoRegular",
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.darkBlue,
    marginLeft: 10,
  },
  academicHistoryText: {
    color: COLORS.white,
    fontFamily: "NunitoRegular",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});

export default MateriasAprobadas;