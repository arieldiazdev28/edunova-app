import { ScrollView, View, StyleSheet, Button, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";

import { FIREBASE_AUTH } from "../FirebaseConfig";
import { COLORS, FONT_SIZES } from "../styles.js";

import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Card from "../components/Card.jsx";
import Subtitle from "../components/Subtitle.jsx";

const Dashboard = () => {
  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      console.log("Sesión cerrada");
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />

        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>"El aprendizaje es experiencia, todo lo demás es información" - Albert Einstein"</Text>
        </View>

        <View>
          <Subtitle text={"Explorar catálogo de materias"}></Subtitle>
        </View>
        {/* Creacion del carrusel para el dashboard */}
        <Card
          subjectName={"Álgebra Lineal"}
          imageSource={require("../assets/science.png")}
        />

      <Footer />
      </ScrollView>
      {/* <Button title="Cerrar sesión" onPress={handleLogout} /> */}
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
    marginVertical: 10,
  },
  quote: {
    color: COLORS.white,
    textAlign: "center",
    fontFamily: "NunitoRegular",
    fontSize: 18,
    fontStyle: "italic",
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
  sectionTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  materiaCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  materiaTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  materiaDesc: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 5,
    opacity: 0.8,
  },
});

export default Dashboard;
