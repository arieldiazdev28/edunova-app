import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../styles.js";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardMateriaInscrita from "../components/CardMateriaInscrita.jsx";

const MateriasInscritas = ({ openDrawer }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header openDrawer={openDrawer} />
      <ScrollView>
        <Text style={styles.title}>Materias inscritas</Text>
        <Text style={styles.subtitle}>Aquí verás las materias que conforman tu ruta de aprendizaje actual</Text>

        <CardMateriaInscrita cardColor={"#4ac996ff"} buttonColor={"#247253ff"} />
        <CardMateriaInscrita cardColor={"#4ac996ff"} buttonColor={"#247253ff"} />
        <CardMateriaInscrita cardColor={"#4ac996ff"} buttonColor={"#247253ff"} />
        <CardMateriaInscrita cardColor={"#4ac996ff"} buttonColor={"#247253ff"} />
        <CardMateriaInscrita cardColor={"#4ac996ff"} buttonColor={"#247253ff"} />

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
  }
});

export default MateriasInscritas;
