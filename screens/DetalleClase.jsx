import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles.js";
import api from "../api.js";
import Footer from "../components/Footer.jsx";

const DetalleClase = ({ route, navigation }) => {
  const { claseId, claseTitulo, claseContenido } = route.params;
  const [clase, setClase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los detalles de la clase
  useEffect(() => {
    const cargarClase = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`Obteniendo detalles de clase ${claseId}...`);

        const response = await api.get(`/clases/${claseId}`);
        console.log("Clase obtenida:", response?.titulo);


        setClase(response || {});
      } catch (error) {
        console.error("Error al cargar la clase:", error);
        const errorMsg = error.message || "Error al cargar la clase";
        setError(errorMsg);
        Alert.alert("Error", errorMsg);
      } finally {
        setLoading(false);
      }
    };

    cargarClase();
  }, [claseId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primaryBlue} />
          <Text style={styles.loadingText}>Cargando clase...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-sharp" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>¡Tu esfuerzo traerá resultados!</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contenidoContainer}>
            <View style={styles.metaInfo}>
            {clase.materia && (
              <Text style={styles.materiaNombre}>{clase.materia}</Text>
            )}

            <Text style={styles.claseNumero}>Clase #{clase.idClase}</Text>
          </View>

          <Text style={styles.claseTitulo}>{clase.titulo}</Text>

          {/* Introducción */}
          {clase.introduccion && (
            <View style={styles.seccionContainer}>
              <Text style={styles.seccionTitulo}><Ionicons name="book" size={24} color="white" /> Introducción</Text>
              <View style={styles.contenidoBox}>
                <Text style={styles.contenidoText}>{clase.introduccion}</Text>
              </View>
            </View>
          )}

          {/* Desarrollo Teórico */}
          {clase.desarrolloTeorico && (
            <View style={styles.seccionContainer}>
              <Text style={styles.seccionTitulo}><Ionicons name="document-text" size={24} color="white" /> Desarrollo Teórico</Text>
              <View style={styles.contenidoBox}>
                <Text style={styles.contenidoText}>
                  {clase.desarrolloTeorico}
                </Text>
              </View>
            </View>
          )}

          {/* Ejemplos */}
          {clase.ejemplos && (
            <View style={styles.seccionContainer}>
              <Text style={styles.seccionTitulo}><Ionicons name="pencil" size={24} color="white" /> Ejemplos</Text>
              <View style={styles.contenidoBox}>
                <Text style={styles.contenidoText}>{clase.ejemplos}</Text>
              </View>
            </View>
          )}

          {/* Recursos */}
          {clase.recursos && (
            <View style={styles.seccionContainer}>
              <Text style={styles.seccionTitulo}><Ionicons name="attach" size={24} color="white" /> Recursos Adicionales</Text>
              <View style={styles.contenidoBox}>
                <Text style={styles.contenidoText}>{clase.recursos}</Text>
              </View>
            </View>
          )}

          {clase.contenido &&
            !clase.introduccion &&
            !clase.desarrolloTeorico && (
              <View style={styles.seccionContainer}>
                <Text style={styles.seccionTitulo}>📄 Contenido</Text>
                <View style={styles.contenidoBox}>
                  <Text style={styles.contenidoText}>{clase.contenido}</Text>
                </View>
              </View>
            )}
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
  header: {
    backgroundColor: COLORS.primaryBlue,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: "MontserratBold",
    flex: 1,
    textAlign: "center",
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
    fontFamily: "MontserratRegular",
  },
  contenidoContainer: {
    padding: 20,
  },
  claseTitulo: {
    fontSize: 24,
    fontFamily: "MontserratBold",
    color: COLORS.white,
    marginBottom: 15,
  },
  seccionTitulo: {
    marginVertical: 15,
    fontSize: 20,
    fontFamily: "NunitoBold",
    color: COLORS.white
  },
  metaInfo: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  claseNumero: {
    color: COLORS.primaryBlue,
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
  materiaNombre: {
    color: COLORS.successGreen,
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
  contenidoBox: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryBlue,
  },
  contenidoText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: "NunitoRegular",
    lineHeight: 28,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "MontserratRegular",
  },
  retryButton: {
    backgroundColor: COLORS.primaryBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: COLORS.white,
    fontFamily: "MontserratMedium",
  },
});

export default DetalleClase;