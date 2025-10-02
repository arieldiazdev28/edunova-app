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
      <ScrollView contentContainerStyle={styles.header}>
        <Header />
        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>"El aprendizaje es experiencia, todo lo demás es información" - Albert Einstein</Text>
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
    backgroundColor: COLORS.darkBlue
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  quoteContainer: {
    padding: 10
  },
  quote: {
    color: COLORS.white,
    textAlign: "center",
    fontFamily: "NunitoRegular",
    fontSize: 18,
    fontStyle: "italic"
  }
});

export default Dashboard;
