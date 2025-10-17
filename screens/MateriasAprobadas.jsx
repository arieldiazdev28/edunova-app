import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../styles.js";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MateriasAprobadas = ({ navigation, openDrawer }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header openDrawer={openDrawer} />
        <Text style={styles.subtitle}>¡Felicidades! Estas son tus materias aprobadas</Text>
        <View style={styles.scoreContainer}>
          <Ionicons name="ribbon-outline" size={33} color={COLORS.darkBlue} />
          <Text style={styles.scoreText}>Promedio general: 0.0</Text>
        </View>
        <Text style={styles.academicHistoryText}>Historial académico <Ionicons name="school" size={25} color={COLORS.white}/></Text>
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
  subtitle: {
    fontFamily: "nunitoRegular",
    color: COLORS.white,
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 10
  },
  scoreContainer: {
    backgroundColor: COLORS.white,
    margin: 30,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 30
  },
  scoreText: {
    fontFamily: "nunitoRegular",
    fontSize: 20,
    fontWeight: "700",
  },
  academicHistoryText: {
    color: COLORS.white,
    fontFamily: "nunitoRegular",
    fontSize: 25,
    textAlign: "center"
  }
})

export default MateriasAprobadas;
