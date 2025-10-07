import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { COLORS, FONT_SIZES } from "../styles.js";
import Logo from "./Logo";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.9;

const CustomDrawer = ({ visible, onClose, navigation, currentScreen }) => {
  const { logout } = useAuth();
  const menuItems = [
    { name: "Dashboard", label: "Inicio", icon: "home" },
    { name: "CatalogoMaterias", label: "Catálogo de Materias", icon: "book" },
    { name: "MateriasInscritas", label: "Materias Inscritas", icon: "book" },
    { name: "MateriasAprobadas", label: "Materias Aprobadas", icon: "book" },
  ];

  const handleNavigate = (screenName) => {
    if (navigation) {
      navigation.navigate(screenName);
      onClose();
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error al cerrar sesión", error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Overlay oscuro */}
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Menú lateral */}
        <View style={styles.drawer}>
          {/* Header del menú */}
          <View style={styles.header}>
            <View style={styles.headerLeft} />
            <Logo fontColor={COLORS.primaryBlue} fontSize={30} />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color={COLORS.darkBlue} />
            </TouchableOpacity>
          </View>

          {/* Items del menú */}
          <ScrollView style={styles.menuItems}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  currentScreen === item.name && styles.menuItemActive,
                ]}
                onPress={() => handleNavigate(item.name)}
              >
                <Text
                  style={[
                    styles.menuLabel,
                    currentScreen === item.name && styles.menuLabelActive,
                  ]}
                >
                  {item.label}
                </Text>
                <Ionicons name="arrow-forward-sharp" size={24} color="black" />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Cerrar Sesión</Text>
              <Ionicons name="exit-outline" size={22} color="#DC2626" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    width: DRAWER_WIDTH,
    backgroundColor: COLORS.white,
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    padding: 20,
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "MontserratBold",
    color: "#fff",
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: COLORS.darkBlue,
    fontFamily: "MontserratBold",
  },
  menuItems: {
    flex: 1,
    paddingTop: 0,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemActive: {
    backgroundColor: "#E3F2FD",
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  menuLabel: {
    fontSize: FONT_SIZES.large,
    fontFamily: "NunitoSemiBold",
    color: COLORS.darkBlue,
  },
  menuLabelActive: {
    color: COLORS.primaryBlue,
    fontFamily: "NunitoSemiBold",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 15,
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  logoutText: {
    fontSize: FONT_SIZES.large,
    fontFamily: "NunitoSemiBold",
    color: "#DC2626",
  },
});

export default CustomDrawer;
