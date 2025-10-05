import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const MultiSelectCheckbox = ({
  options,
  selectedValues,
  onValueChange,
  title,
}) => {
  // Función para manejar el clic (agrega o quita el valor)
  const toggleValue = (value) => {
    onValueChange(
      (prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value) // Quitar
          : [...prev, value] // Agregar
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.preferenceTitle}>{title}</Text>
      <View style={styles.checkboxesContainer}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.checkboxItem,
                isSelected && styles.checkboxItemSelected, // Aplica estilo si está seleccionado
              ]}
              onPress={() => toggleValue(option.value)}
            >
              <Ionicons
                name={isSelected ? "checkbox-outline" : "square-outline"}
                size={24}
                color={isSelected ? "#007bff" : "#666"}
              />
              <Text style={styles.checkboxLabel}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  preferenceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#333",
  },
  checkboxesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
  checkboxItemSelected: {
    borderColor: "#007bff", // Borde azul cuando está seleccionado
    backgroundColor: "#e6f7ff", // Fondo ligeramente azulado
  },
  checkboxLabel: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default MultiSelectCheckbox;
