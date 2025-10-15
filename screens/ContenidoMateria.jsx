import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../styles.js";
import api from "../api.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const ContenidoMateria = ({ route, navigation, setCurrentScreen }) => {
  const { materiaId, materiaTitulo } = route.params;
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar las clases de la materia
  useEffect(() => {
    const cargarClases = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`Obteniendo clases para materia ${materiaId}...`);

        const response = await api.get(`/materias/${materiaId}/clases`);
        console.log("Clases obtenidas:", response.clases?.length || 0);
        console.log("Total:", response.total);

        setClases(response.clases || []);
      } catch (error) {
        console.error("Error al cargar clases:", error);
        const errorMsg = error.message || "Error al cargar las clases";
        setError(errorMsg);
        Alert.alert("Error", errorMsg);
      } finally {
        setLoading(false);
      }
    };

    cargarClases();
    setCurrentScreen?.("Contenido");
  }, [materiaId, setCurrentScreen]);

  // Renderizar cada clase
  const renderClase = ({ item }) => (
    <TouchableOpacity
      style={styles.claseCard}
      onPress={() =>
        navigation.navigate("DetalleClase", {
          claseId: item.idClase,
          claseTitulo: item.titulo,
          claseContenido: item.contenido,
        })
      }
    >
      <View style={styles.claseContent}>
        <Text style={styles.claseNumero}>Clase {item.idClase}</Text>
        <Text style={styles.claseTitulo}>{item.titulo}</Text>
        <Text style={styles.clasePreview} numberOfLines={2}>
          {item.contenido.substring(0, 100)}...
        </Text>
      </View>
      <Text style={styles.arrowIcon}>→</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primaryBlue} />
          <Text style={styles.loadingText}>Cargando clases...</Text>
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
        <Text style={styles.headerTitle}>{materiaTitulo}</Text>
        <View style={{ width: 50 }} />
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryText}>Volver atrás</Text>
          </TouchableOpacity>
        </View>
      ) : clases.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No hay clases disponibles para esta materia
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={clases}
            renderItem={renderClase}
            keyExtractor={(item) => item.idClase.toString()}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={true}
          />
          <Footer />
        </>
      )}
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
  listContainer: {
    padding: 15,
    paddingBottom: 20,
  },
  claseCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryBlue,
  },
  claseContent: {
    flex: 1,
  },
  claseNumero: {
    color: COLORS.primaryBlue,
    fontSize: 12,
    fontFamily: "MontserratMedium",
    marginBottom: 5,
  },
  claseTitulo: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "MontserratBold",
    marginBottom: 5,
  },
  clasePreview: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 13,
    fontFamily: "MontserratRegular",
    lineHeight: 18,
  },
  arrowIcon: {
    color: COLORS.primaryBlue,
    fontSize: 20,
    marginLeft: 10,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "MontserratRegular",
  },
});

export default ContenidoMateria;