import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../styles.js";
import Footer from "../components/Footer.jsx";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.js";

const MostrarInfoMateria = ({ navigation, route }) => {
  const { user } = useAuth();
  const materiaParam = route.params?.materia || null;
  const [materia, setMateria] = useState(materiaParam);
  const [loading, setLoading] = useState(false);
  const [inscribir, setInscribir] = useState(false);
  // Recibir el estado de inscripción desde el Dashboard
  const [usuarioInscrito, setUsuarioInscrito] = useState(
    route.params?.usuarioInscrito || false
  );

  // Carga de información de cada materia por medio de su ID
  useEffect(() => {
    const load = async () => {
      if (!materia && route.params?.id) {
        setLoading(true);
        try {
          const result = await api.get(`/materias/${route.params.id}`);
          setMateria(result);
        } catch (e) {
          console.error(`Error al cargar la materia: ${e}`);
          Alert.alert("Error", "No se pudieron cargar los datos.");
        } finally {
          setLoading(false);
        }
      }
    };
    load();
  }, []);

  // Verificar si el usuario ya está inscrito en esta materia
  useEffect(() => {
    const verificarInscripcion = async () => {
      if (user?.uid && materia?.idMateria) {
        try {
          // Obtener materias inscritas del usuario
          const { materias } = await api.get(`/mis_materias/${user.uid}`);
          // Verificar si esta materia está en la lista
          const estaInscrito = materias?.some(
            (m) => m.idMateria === materia.idMateria
          );
          setUsuarioInscrito(estaInscrito || false);
        } catch (error) {
          console.error("Error al verificar inscripción:", error);
          setUsuarioInscrito(false);
        }
      }
    };

    verificarInscripcion();
  }, [user?.uid, materia?.idMateria]);

  const handleInscribir = async () => {
    if (!materia || !user) {
      Alert.alert("Error", "No hay usuario autenticado");
      return;
    }

    setInscribir(true);
    try {
      console.log("Intentando inscribir...");
      const result = await api.post("/inscribir_materia", {
        idMateria: materia.idMateria,
        idUsuario: user.uid,
      });

      console.log("Respuesta del servidor:", result);
      console.log("Status:", result.status);

      // Verificar el status correctamente
      if (result.status === 200 || result.status === 201) {
        console.log("Inscripción exitosa");
        Alert.alert(
          "¡Éxito!",
          "Te has inscrito correctamente a la materia.",
          [
            {
              text: "OK",
              onPress: () => {
                console.log("Navegando al Dashboard...");
                // Navegar al Dashboard con flag para actualizar
                navigation.navigate("Dashboard", {
                  materiasActualizadas: true,
                  materiaInscrita: materia.idMateria,
                });
              },
            },
          ]
        );
      }
    } catch (e) {
      console.log("Error en inscripción:", e);
      console.log("Error response:", e.response);
      
      if (e.response?.status === 409) {
        // Usuario ya está inscrito, cambiar botón a "Aprender"
        console.log("Usuario ya inscrito en esta materia");
        setUsuarioInscrito(true);
      } else {
        const errorMsg = e.response?.data?.error || e.message || "Error al inscribirse";
        Alert.alert("Error", errorMsg);
        console.error(`Error al inscribir: ${e}`);
      }
    } finally {
      setInscribir(false);
    }
  };

  // Función para redirigir al contenido de la materia
  const handleAprender = async () => {
    Alert.alert("Próximamente", "El contenido de esta materia estará disponible pronto");
    // navigation.navigate("ContenidoMateria", { materiaId: materia.idMateria });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primaryBlue} />
      </SafeAreaView>
    );
  }

  if (!materia) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.noData}>Datos de la materia no disponibles</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{materia.titulo}</Text>

        <Image
          source={
            materia.imagen
              ? { uri: materia.imagen }
              : require("../assets/math.jpg")
          }
          style={styles.image}
        />

        <Text style={styles.section}>Descripción</Text>
        <Text style={styles.text}>
          {materia.descripcion || "Sin descripción disponible."}
        </Text>

        <Text style={styles.section}>Código</Text>
        <Text style={styles.text}>
          {materia.idMateria ?? materia.id ?? "-"}
        </Text>

        <TouchableOpacity
          style={[
            styles.enrollButton,
            usuarioInscrito && styles.aprenderButton,
          ]}
          onPress={usuarioInscrito ? handleAprender : handleInscribir}
          disabled={inscribir}
        >
          {inscribir ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.enrollText}>
              {usuarioInscrito ? "Aprender" : "Inscribirme"}
            </Text>
          )}
        </TouchableOpacity>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MostrarInfoMateria;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.darkBlue,
  },
  content: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.darkBlue,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    color: COLORS.white,
    fontWeight: "800",
    margin: 15,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
  section: {
    fontFamily: "NunitoRegular",
    fontSize: 18,
    color: COLORS.primaryBlue,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 6,
  },
  text: {
    fontFamily: "NunitoRegular",
    fontSize: 18,
    color: COLORS.white,
    marginTop: 4,
    lineHeight: 20,
    textAlign: "justify",
  },
  enrollButton: {
    marginTop: 20,
    backgroundColor: COLORS.successGreen || "#10B981",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  aprenderButton: {
    backgroundColor: COLORS.primaryBlue || "#2196F3",
  },
  enrollText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 18,
  },
  noData: {
    color: COLORS.white,
  },
});