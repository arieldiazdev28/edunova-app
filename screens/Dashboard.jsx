import { useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";

import { FIREBASE_AUTH } from "../FirebaseConfig";
import { COLORS, FONT_SIZES } from "../styles.js";

import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Subtitle from "../components/Subtitle.jsx";
import SubjectsCarousel from "../components/Carousel.jsx";
import OffcanvasMenu from "../components/OffcanvasMenu.jsx";

const Dashboard = () => {
  const [menuVisible, setMenuVisible] = useState(false);

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
        <Header onMenuPress={() => setMenuVisible(true)} />

        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>"El apredizaje es experiencia, todo lo demás es información" - Albert Einstein"</Text>
        </View>

        <View>
          <Subtitle text={"Explorar catálogo de materias"} subtitleColor={COLORS.successGreen}></Subtitle>
          <SubjectsCarousel />
        </View>
        <View>
          <Subtitle text={"Mis materias inscritas"} subtitleColor={COLORS.lightblue}></Subtitle>
          <SubjectsCarousel />
        </View>
        <View>
          <Subtitle text={"Mis materias aprobadas"} subtitleColor={COLORS.warningOrange}></Subtitle>
          <SubjectsCarousel />
        </View>
        <OffcanvasMenu
          visible={menuVisible}
          onClose={() => setMenuVisible(false)} />
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
  }
});

export default Dashboard;
