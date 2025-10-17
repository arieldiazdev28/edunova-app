import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles.js";
import api from "../api.js";
import { useAuth } from "../context/AuthContext";

const ExamenFinal = ({ route, navigation }) => {
  const { materiaId, materiaTitulo } = route.params;
  const { user } = useAuth();
  
  const [examen, setExamen] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  // Cargar el examen
  useEffect(() => {
    const cargarExamen = async () => {
      try {
        setLoading(true);
        console.log(`Cargando examen de materia ${materiaId}...`);

        // Verificar si ya realizó el examen
        const verificacion = await api.get(
          `/materias/${materiaId}/resultado/${user.uid}`
        );

        if (verificacion.realizado) {
          Alert.alert(
            "Examen ya realizado",
            `Ya completaste este examen. Tu calificación: ${verificacion.resultado.calificacion}`,
            [
              {
                text: "OK",
                onPress: () => navigation.goBack(),
              },
            ]
          );
          return;
        }

        // Cargar examen y preguntas
        const response = await api.get(`/materias/${materiaId}/examen`);
        console.log("Examen cargado:", response.examen.titulo);

        setExamen(response.examen);
        setPreguntas(response.preguntas || []);
      } catch (error) {
        console.error("Error al cargar examen:", error);
        const errorMsg = error.message || "Error al cargar el examen";
        setError(errorMsg);
        Alert.alert("Error", errorMsg);
      } finally {
        setLoading(false);
      }
    };

    cargarExamen();
  }, [materiaId, user.uid]);

  // Seleccionar respuesta
  const seleccionarRespuesta = (idPregunta, opcion) => {
    setRespuestas({
      ...respuestas,
      [idPregunta]: opcion,
    });
  };

  // Enviar examen
  const enviarExamen = async () => {
    // Validar que todas las preguntas fueron respondidas
    if (Object.keys(respuestas).length < preguntas.length) {
      Alert.alert(
        "Examen incompleto",
        "Por favor responde todas las preguntas antes de enviar."
      );
      return;
    }

    Alert.alert(
      "Confirmar envío",
      "¿Estás seguro de enviar el examen? No podrás modificar tus respuestas.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Enviar",
          onPress: async () => {
            try {
              setEnviando(true);
              console.log("Enviando examen...");

              const resultado = await api.post(
                `/examenes/${examen.idExamen}/calificar`,
                {
                  idUsuario: user.uid,
                  respuestas: respuestas,
                }
              );

              console.log("Resultado:", resultado);

              // Mostrar resultado
              Alert.alert(
                resultado.aprobado ? "¡Felicidades!" : "Examen completado",
                `${resultado.mensaje}\n\nCalificación: ${resultado.calificacion}/10\nRespuestas correctas: ${resultado.respuestasCorrectas}/${resultado.totalPreguntas}`,
                [
                  {
                    text: "OK",
                    onPress: () => {
                      navigation.navigate("Dashboard", {
                        materiasActualizadas: true,
                      });
                    },
                  },
                ]
              );
            } catch (error) {
              console.error("Error al enviar examen:", error);
              Alert.alert(
                "Error",
                error.message || "Error al enviar el examen"
              );
            } finally {
              setEnviando(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primaryBlue} />
          <Text style={styles.loadingText}>Cargando examen...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !examen) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error || "No hay examen disponible"}
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-sharp" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.examenTitle}>{examen.titulo}</Text>
          </View>

          {examen.descripcion && (
            <Text style={styles.descripcion}>{examen.descripcion}</Text>
          )}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Total de preguntas: {preguntas.length}
            </Text>
            <Text style={styles.infoText}>
              Nota mínima: {examen.notaMinimaAprobacion}/10
            </Text>
          </View>
        </View>

        {/* Preguntas */}
        {preguntas.map((pregunta, index) => (
          <View key={pregunta.idPregunta} style={styles.preguntaContainer}>
            <Text style={styles.preguntaNumero}>
              Pregunta {index + 1} ({pregunta.puntos} pts)
            </Text>
            <Text style={styles.preguntaTexto}>{pregunta.textoPregunta}</Text>

            {/* Opciones */}
            {Object.entries(pregunta.opciones).map(([letra, texto]) => {
              const seleccionada = respuestas[pregunta.idPregunta] === letra;
              return (
                <TouchableOpacity
                  key={letra}
                  style={[
                    styles.opcionButton,
                    seleccionada && styles.opcionSeleccionada,
                  ]}
                  onPress={() =>
                    seleccionarRespuesta(pregunta.idPregunta, letra)
                  }
                >
                  <Text
                    style={[
                      styles.opcionLetra,
                      seleccionada && styles.opcionLetraSeleccionada,
                    ]}
                  >
                    {letra}
                  </Text>
                  <Text
                    style={[
                      styles.opcionTexto,
                      seleccionada && styles.opcionTextoSeleccionada,
                    ]}
                  >
                    {texto}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        {/* Botón de enviar */}
        <TouchableOpacity
          style={[styles.enviarButton, enviando && styles.enviarButtonDisabled]}
          onPress={enviarExamen}
          disabled={enviando}
        >
          {enviando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.enviarButtonText}>Enviar Examen</Text>
          )}
        </TouchableOpacity>

        <View style={{ height: 30 }} />
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
    padding: 20,
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
  },
  backButton: {
    backgroundColor: COLORS.primaryBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: COLORS.white,
    fontFamily: "MontserratMedium",
  },
  header: {
    paddingTop: 20,
    marginBottom: 30,
  },
  headerContainer : {
    flexDirection: "row",
    gap: 10
  },
  examenTitle: {
    fontSize: 22,
    color: COLORS.white,
    fontFamily: "MontserratBold",
    marginBottom: 10,
  },
  descripcion: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "MontserratRegular",
    marginBottom: 15,
    lineHeight: 20,
  },
  infoBox: {
    backgroundColor: "rgba(33, 150, 243, 0.1)",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryBlue,
  },
  infoText: {
    color: COLORS.white,
    fontFamily: "MontserratMedium",
    fontSize: 13,
    marginBottom: 3,
  },
  preguntaContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  preguntaNumero: {
    color: COLORS.primaryBlue,
    fontFamily: "MontserratBold",
    fontSize: 14,
    marginBottom: 10,
  },
  preguntaTexto: {
    color: COLORS.white,
    fontFamily: "MontserratMedium",
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
  },
  opcionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  opcionSeleccionada: {
    backgroundColor: "rgba(33, 150, 243, 0.2)",
    borderColor: COLORS.primaryBlue,
  },
  opcionLetra: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: COLORS.white,
    fontFamily: "MontserratBold",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 30,
    marginRight: 12,
  },
  opcionLetraSeleccionada: {
    backgroundColor: COLORS.primaryBlue,
  },
  opcionTexto: {
    flex: 1,
    color: COLORS.white,
    fontFamily: "MontserratRegular",
    fontSize: 14,
    lineHeight: 20,
  },
  opcionTextoSeleccionada: {
    fontFamily: "MontserratMedium",
  },
  enviarButton: {
    backgroundColor: COLORS.successGreen,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  enviarButtonDisabled: {
    opacity: 0.6,
  },
  enviarButtonText: {
    color: COLORS.white,
    fontFamily: "MontserratBold",
    fontSize: 18,
  },
});

export default ExamenFinal;