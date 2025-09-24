import { View, Text, Button, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";

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
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al Dashboard</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Dashboard;
