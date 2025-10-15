import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, StyleSheet, FlatList } from "react-native";
import api from "../api.js";
import CardMateria from "./CardMateria.jsx";
import { COLORS } from "../styles.js";

const LOCAL_DESCRIPTIONS = [
  "Sumérgete en los fundamentos básicos de las matemáticas y sus principales vertientes: aritmética, álgebra y geometría.",
  "Aprende todo sobre el álgebra lineal en tres secciones completas de aprendizaje: matrices, determinantes y sistemas de ecuaciones.",
  "Conviértete en un experto en el mundo de la química general: estructura atómica, enlaces químicos, reacciones y estequiometría.",
  "Todo sobre los conceptos básicos y avanzados de programación estructurada con Python.",
  "Conoce las estructuras de datos tanto lineales como no lineales, algoritmos de búsqueda y ordenamiento utilizados en el mundo real.",
  "Aprendizaje acerca de las bases de datos relacionales mediante el uso de SQL, el modelado de datos, consultas y reglas de normalización de entidades.",
  "El cálculo en un nivel más avanzado para enriquecer tu conocimiento: integrales indefinidas, definidas y técnicas de integración.",
  "Entiende los conceptos primordiales de la programación orientada a objetos y sus cuatro características que la conforman: la abstracción, el encapsulamiento, la herencia y polimorfismo."
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

const ListaMaterias = ({ onPressButton, searchQuery = "" }) => {
  const [materias, setMaterias] = useState([]); //Lista original
  const [filtro, setFiltro] = useState([]); //Lista filtrada
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
          idMateria: item.idMateria ?? item.id ?? null,
          // Uso de la informacion proveniente de la API, con soporte de llaves multiples.

          title: item.titulo ?? `Materia ${idx + 1}`, //Titulo de la materia fuera de la Card
          idMateria: item.idMateria ?? item.id ?? null, //ID de la materia
          titulo: item.titulo ?? item.nombre ?? item.title ?? `Materia ${idx + 1}`, //Titulo de la materia dentro de la Card
          description: LOCAL_DESCRIPTIONS[idx] ?? "Descripción pendiente", //Descriptor de la materia fuera de la Card
          descripcion: item.descripcion ?? item.resumen ?? item.description ?? LOCAL_DESCRIPTIONS[idx] ?? "Descripción pendiente", //Descripcion dentro de la Card
          image: item.imagen ?? item.image ?? LOCAL_IMAGES[idx] ?? LOCAL_IMAGES[0],
        }));

        setMaterias(combined);
        setFiltro(combined);
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

  //Filtro que permite ver la opcion buscada de la lista del catalogo de materias
  useEffect(() => {
    if (!searchQuery) {
      setFiltro(materias);
      return;
    }
    const q = searchQuery.toLowerCase();
    const result = materias.filter((item) => {
      return (
        String(item.title ?? "").toLowerCase().includes(q) ||
        String(item.titulo ?? "").toLowerCase().includes(q) ||
        String(item.description ?? "").toLowerCase().includes(q) ||
        String(item.descripcion ?? "").toLowerCase().includes(q) ||
        String(item.id ?? "").toLowerCase().includes(q) ||
        String(item.idMateria ?? "").toLowerCase().includes(q)
      );
    });
    setFiltro(result);
  }, [searchQuery, materias]);

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
      data={filtro}
      scrollEnabled={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CardMateria
          subjectTitle={item.title}
          subjectDescription={item.description}
          subjectImage={item.image}
          onPressButton={() => onPressButton(item)}
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
