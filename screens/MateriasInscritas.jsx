import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../styles.js";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardMateriaInscrita from "../components/CardMateriaInscrita.jsx";

const MateriasInscritas = ({ openDrawer, navigation }) => {
  const { user } = useAuth();
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarMaterias = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!user || !user.uid) {
          setMaterias([]);
          return;
        }

        const result = await api.get(`/mis_materias/${user.uid}`);
        const lista = result?.materias || result?.data?.materias || result || [];

        const normalized = Array.isArray(lista) ? lista : [];
        setMaterias(normalized);
      } catch (e) {
        console.error("Error cargando materias inscritas:", e);
        setError(e.message || "Error al cargar materias");
      } finally {
        setLoading(false);
      }
    };

    cargarMaterias();
  }, [user]);

  const handleContinuar = (materia) => {
    const id = materia.idMateria ?? materia.id ?? materia.materiaId ?? materia.id_materia;
    const titulo = materia.titulo ?? materia.nombre ?? materia.title ?? "Materia";
    navigation.navigate("ContenidoMateria", {
      materiaId: id,
      materiaTitulo: titulo,
    });
  };

  const renderItem = ({ item }) => (
    <CardMateriaInscrita
      title={item.titulo ?? "Materia sin título"}
      cardColor={item.color || "#28487aff"}
      buttonColor={item.buttonColor || "#508deeff"}
      onPress={() => handleContinuar(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header openDrawer={openDrawer} />

      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.title}>Materias inscritas</Text>
        <Text style={styles.subtitle}>
          Aquí verás las materias que conforman tu ruta de aprendizaje actual
        </Text>

        {loading ? (
          <View style={{ padding: 20 }}>
            <ActivityIndicator size="large" color={COLORS.primaryBlue} />
            <Text style={{ color: COLORS.white, marginTop: 10 }}>Cargando...</Text>
          </View>
        ) : error ? (
          <View style={{ padding: 20 }}>
            <Text style={{ color: COLORS.white }}>Error: {error}</Text>
          </View>
        ) : materias.length === 0 ? (
          <View style={{ padding: 20 }}>
            <Text style={styles.inscribedEmptyText}>
              Para empezar tu aprendizaje, dirígete al catálogo de materias en el menú
              principal o en la sección de menú en la parte superior izquierda de esta
              pantalla. Luego, inscríbete en las materias con las que te gustaría comenzar.
              ¡Tu puedes!

            </Text>
          </View>
        ) : (
          <FlatList
            data={materias}
            renderItem={renderItem}
            scrollEnabled={false}
            keyExtractor={(item, index) => (item.idMateria ?? index).toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}

      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue
  },
  title: {
    fontFamily: "nunitoBold",
    color: COLORS.white,
    fontSize: 25,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    fontWeight: "700",
  },
  subtitle: {
    fontFamily: "nunitoRegular",
    color: COLORS.lightGray,
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20
  },
  inscribedEmptyText: {
    fontFamily: "nunitoRegular",
    color: COLORS.lightGray,
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20
  }
});

export default MateriasInscritas;
