import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, StyleSheet, FlatList } from "react-native";
import api from "../api.js";
import CardMateria from "./CardMateria.jsx";
import { COLORS } from "../styles.js";

// Descripciones e imágenes locales para las materias (ordenadas por índice)
// Asumo que la API devuelve exactamente 8 items; si devuelve menos, se usará lo disponible.
const LOCAL_DESCRIPTIONS = [
  "Ecuaciones diferenciales de primer grado, ecuaciones diferenciales de grado superior y transformada de Laplace.",
  "Fundamentos de álgebra lineal: matrices, determinantes y sistemas de ecuaciones.",
  "Cálculo diferencial e integral con aplicaciones a problemas reales.",
  "Conceptos básicos y avanzados de programación en JavaScript.",
  "Estadística descriptiva e inferencial para análisis de datos.",
  "Bases de datos relacionales: SQL, modelado y consultas.",
  "Introducción a la física: mecánica y termodinámica.",
  "Química general: estructura atómica y enlaces químicos."
];

const LOCAL_IMAGES = [
  require("../assets/math.jpg"),
  require("../assets/math.jpg"),
  require("../assets/math.jpg"),
  require("../assets/math.jpg"),
  require("../assets/math.jpg"),
  require("../assets/math.jpg"),
  require("../assets/math.jpg"),
  require("../assets/math.jpg"),
];

const ListaMaterias = () => {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchMaterias = async () => {
      try {
        const data = await api.get("/materias");
        const items = Array.isArray(data) ? data : data.materias || [];

        if (!mounted) return;

        const combined = items.map((item, idx) => ({
          id: item.id ?? idx.toString(),
          title: item.titulo ?? item.nombre ?? item.title ?? `Materia ${idx + 1}`,
          description: LOCAL_DESCRIPTIONS[idx] ?? "Descripción pendiente",
          image: LOCAL_IMAGES[idx] ?? LOCAL_IMAGES[0],
        }));

        setMaterias(combined);
      } catch (err) {
        setError(err.message || "Error al obtener materias");
      } finally {
        setLoading(false);
      }
    };
    fetchMaterias();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.successGreen} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={materias}
      scrollEnabled={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CardMateria
          subjectTitle={item.title}
          subjectDescription={item.description}
          subjectImage={item.image}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  errorText: {
    color: COLORS.white,
    fontFamily: "NunitoRegular"
  },
});

export default ListaMaterias;
