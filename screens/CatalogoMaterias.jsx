import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CustomInput from "../components/CustomInput.jsx";
import { COLORS } from "../styles.js";
import ListaMaterias from "../components/ListaMaterias.jsx";

const CatalogoMaterias = ({ openDrawer, navigation }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(id);
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>
      <Header openDrawer={openDrawer} />
      <ScrollView>
        <View style={styles.headerContent}>
          <Text style={styles.title}>¿Listo para tu próximo reto?</Text>
          <Text style={styles.subtitle}>Encuentra tu materia favorita y comienza hoy</Text>
        </View>
        <View style={styles.inputSearch}>
          <CustomInput
            placeholder="Busca aquí tu nuevo aprendizaje..."
            value={search}
            onChangeText={setSearch} />
        </View>
        <Text style={styles.subjectListTitle}>Materias disponibles</Text>

        {/* Componente de lista de materias */}   
        <View style={styles.containerList}>
          <ListaMaterias
            searchQuery={debouncedSearch}
            onPressButton={(item) => {
              const idParam = item.idMateria ?? item.id ?? null;
              navigation.navigate("MostrarInfoMateria", { materia: item, id: idParam });
            }} />
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue
  },
  headerContent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  title: {
    color: COLORS.white,
    fontFamily: "NunitoRegular",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: COLORS.white,
    fontFamily: "NunitoRegular",
    fontSize: 17,
    marginTop: 8
  },
  inputSearch: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  subjectListTitle: {
    color: COLORS.successGreen,
    fontFamily: "NunitoRegular",
    fontSize: 20,
    marginTop: 30,
    marginHorizontal: 16
  },
  containerList: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 9,
    borderRadius: 20,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  }
});

export default CatalogoMaterias;
