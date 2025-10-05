import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const SingleSelectPicker = ({
  options,
  selectedValue,
  onValueChange,
  placeholder,
  title,
}) => {
  // El DropDownPicker maneja internamente sus propios estados de abierto/cerrado
  const [open, setOpen] = useState(false);

  // Se usa setValue/setItems como setter de los estados pasados por props
  const [items, setItems] = useState(options);

  return (
    <View style={[styles.container, open && { zIndex: 100 }]}>
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={items}
        setOpen={setOpen}
        setValue={onValueChange}
        setItems={setItems}
        placeholder={placeholder}
        listMode="MODAL"
        modalTitle={title}
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  // Contenedor que necesita zIndex para el correcto funcionamiento del desplegable
  container: {
    marginBottom: 15,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
  },
  dropdownContainer: {
    height: 50,
  },
});

export default SingleSelectPicker;
