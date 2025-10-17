import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/Footer";
import { COLORS } from "../styles.js";

// Función para formatear fechas
const formatDate = (dateString) => {
  if (!dateString) return "No registrada";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("es-ES", options);
  } catch (error) {
    console.error("Error al formatear la fecha:", error);
    return "Formato inválido";
  }
};

const MostrarInfoMateriaAprobada = ({ navigation, route }) => {
  const materiaParam = route.params?.materia || null;
  const [materia] = useState(materiaParam);

  if (!materia) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.noData}>
          Información de la materia no disponible.
        </Text>
      </SafeAreaView>
    );
  }

  const calificacion = materia.calificacion
    ? materia.calificacion.toFixed(2)
    : "N/A";

  let calificacionColor = COLORS.warningYellow;
  let estadoTexto = "Pendiente";
  if (materia.calificacion) {
    if (materia.calificacion >= 7) {
      calificacionColor = COLORS.successGreen;
      estadoTexto = "Aprobada";
    } else {
      calificacionColor = COLORS.errorRed;
      estadoTexto = "Reprobada";
    }
  }

  const fecha = formatDate(materia.fechaAprobacion || materia.fechaInscripcion);

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={26} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          {String(materia.titulo || "Sin título")}
        </Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Calificación Final */}
        <View style={styles.calificacionContainer}>
          <Text style={styles.section}>Calificación Final</Text>
          <View
            style={[styles.scorePill, { backgroundColor: calificacionColor }]}
          >
            <Text style={styles.scoreText}>{calificacion}</Text>
          </View>
        </View>

        {/* Detalles */}
        <Text style={styles.sectionDetailTitle}>Detalles del Historial</Text>

        {/* Estado */}
        <View style={styles.detailCard}>
          <Ionicons
            name="checkmark-circle-outline"
            size={26}
            color={COLORS.primaryBlue}
          />
          <View style={styles.detailTextWrapper}>
            <Text style={styles.detailLabel}>Estado actual</Text>
            <Text style={styles.detailValue}>{estadoTexto}</Text>
          </View>
        </View>
        {/* Fecha */}
        <View style={styles.detailCard}>
          <Ionicons
            name="calendar-outline"
            size={26}
            color={COLORS.primaryBlue}
          />
          <View style={styles.detailTextWrapper}>
            <Text style={styles.detailLabel}>
              Fecha de {materia.calificacion >= 7 ? "aprobación" : "registro"}
            </Text>
            <Text style={styles.detailValue}>{fecha}</Text>
          </View>
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.darkBlue,
  },
  noData: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: COLORS.primaryBlue,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: COLORS.white,
    fontWeight: "800",
    fontFamily: "NunitoRegular",
  },
  calificacionContainer: {
    alignItems: "center",
    paddingVertical: 20,
    marginVertical: 20,
    borderRadius: 20,
    backgroundColor: COLORS.secondaryBlue,
    
  },
  section: {
    fontFamily: "MontserratSemiBold",
    fontSize: 24,
    color: COLORS.white,
    marginBottom: 8,
  },
  sectionDetailTitle: {
    fontFamily: "NunitoBold",
    fontSize: 18,
    color: COLORS.primaryBlue,
   
    marginBottom: 15,
    marginTop: 10,
  },
  scorePill: {
    paddingVertical: 12,
    paddingHorizontal: 45,
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  scoreText: {
    color: COLORS.white,
    fontSize: 42,
    fontFamily: "NunitoSemiBold",
  },
  detailCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  detailTextWrapper: {
    marginLeft: 15,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.grayText,
    fontFamily: "NunitoRegular",
  },
  detailValue: {
    fontSize: 18,
    color: COLORS.darkBlue,
    marginTop: 3,
    fontFamily: "NunitoBold",
  },
});

export default MostrarInfoMateriaAprobada;
