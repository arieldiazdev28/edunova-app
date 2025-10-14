import { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Alert,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { useAuth } from "../context/AuthContext";
import api from "../api.js";
import { COLORS } from "../styles.js";

import Subtitle from "../components/Subtitle.jsx";
import Carousel from "../components/Carousel.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Dashboard = ({ navigation, openDrawer, setCurrentScreen, route }) => {
  const { user } = useAuth();
  const [materias, setMaterias] = useState([]);
  const [materiasInscritas, setMateriasInscritas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función auxiliar para manejar errores
  const manejarError = (error, mensaje = "Error al conectar con el servidor") => {
    const errorMessage = error?.message || mensaje;
    console.error(errorMessage);
    setError(errorMessage);
    Alert.alert("Error", errorMessage);
  };

  // Obtener catálogo de materias
  const obtenerMaterias = async () => {
    try {
      console.log("Obteniendo catálogo de materias...");
      const { materias } = await api.get("/materias");

      console.log(`Materias obtenidas: ${materias?.length || 0}`);
      setMaterias(materias || []);
      return materias;
    } catch (error) {
      manejarError(error, "Error al obtener el catálogo de materias");
      return [];
    }
  };

  // Obtener materias inscritas del usuario
  const obtenerMateriasInscritas = async () => {
    if (!user?.uid) {
      console.warn("Usuario no disponible");
      return [];
    }

    try {
      console.log("Obteniendo materias inscritas...");
      const { materias } = await api.get(`/mis_materias/${user.uid}`);

      console.log(`Materias inscritas: ${materias?.length || 0}`);
      setMateriasInscritas(materias || []);
      return materias;
    } catch (error) {
      // No mostrar alerta si no hay materias (404)
      if (error.response?.status !== 404) {
        manejarError(error, "Error al obtener tus materias inscritas");
      }
      return [];
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      setError(null);

      try {
        // Ejecutar ambas peticiones en paralelo
        await Promise.all([obtenerMaterias(), obtenerMateriasInscritas()]);
      } catch (error) {
        console.error("Error general al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();

    // Actualizar pantalla actual en el drawer
    setCurrentScreen?.("Dashboard");
  }, [user?.uid, setCurrentScreen]);

  // Usar useFocusEffect para recargar datos cuando vuelves a la pantalla
  useFocusEffect(
    useCallback(() => {
      // Si viene del componente MostrarInfoMateria con materiasActualizadas
      if (route?.params?.materiasActualizadas) {
        console.log("Recargando listas de materias...");

        const recargarDatos = async () => {
          setLoading(true);
          try {
            await Promise.all([
              obtenerMaterias(),
              obtenerMateriasInscritas(),
            ]);

            // Limpiar el parámetro después de usarlo
            navigation.setParams({ materiasActualizadas: false });
          } finally {
            setLoading(false);
          }
        };

        recargarDatos();
      }
    }, [route?.params?.materiasActualizadas, navigation])
  );

  if (loading && materias.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header openDrawer={openDrawer} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primaryBlue} />
          <Text style={styles.loadingText}>Cargando materias...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header openDrawer={openDrawer} />
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
            <Button title="Reintentar" onPress={obtenerMateriasInscritas} />
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
              <Carousel
                items={materias}
                keyField="idMateria"
                onPressItem={(item) => {
                  // Verificar si el usuario ya está inscrito en esta materia
                  const estaInscrito = materiasInscritas.some(
                    (m) => m.idMateria === item.idMateria
                  );
                  navigation.navigate("MostrarInfoMateria", { 
                    materia: item,
                    usuarioInscrito: estaInscrito 
                  });
                }}
              />
            </View>

            {/* Sección Tus Materias */}
            {materiasInscritas.length > 0 && (
              <View>
                <Subtitle
                  text={"Mis materias inscritas"}
                  subtitleColor={COLORS.primaryBlue}
                />
                <Carousel items={materiasInscritas} keyField="idMateria" />
              </View>
            )}

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