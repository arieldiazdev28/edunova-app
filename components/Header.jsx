import { View, StyleSheet, TouchableOpacity } from "react-native";
import Logo from "./Logo";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ openDrawer }) => {
  return (
    <View style={styles.header}>
      {/* Botón menú a la izquierda */}
      {openDrawer ? (
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.menuPlaceholder} />
      )}

      <Logo fontSize={30} />
      {/* Placeholder derecho para mantener centrado el logo */}
      <View style={styles.menuPlaceholder} />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  menuButton: {
    padding: 6,
  },
  menuPlaceholder: {
    width: 34,
  },
});
export default Header;
