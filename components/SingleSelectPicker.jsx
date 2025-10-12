import React, { useState, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const SingleSelectPicker = ({
  options = [],
  selectedValue,
  onValueChange,
  placeholder = "Selecciona...",
  title = "Selecciona una opción",
  label = null,
  error = null,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(

    options.map((opt) =>
      typeof opt === "string" ? { label: opt, value: opt } : opt
    )
  );

  // zIndex dinámico para evitar que se pongan otros elementos encima
  const containerStyle = useMemo(
    () => [styles.container, open && styles.containerOpen],
    [open]
  );

  return (
    <View style={containerStyle}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

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
        modalProps={{
          animationType: "slide",
        }}
        style={[styles.dropdown, error ? styles.dropdownError : null]}
        containerStyle={styles.dropdownContainer}
        dropDownContainerStyle={styles.dropDownContainer}
        textStyle={styles.text}
        placeholderStyle={styles.placeholder}
        arrowIconStyle={styles.arrow}
        tickIconStyle={styles.tick}
        zIndex={1000}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  containerOpen: {
    zIndex: 9999,
  },
  label: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 6,
    marginLeft: 4,
    fontWeight: "600",
  },
  dropdownContainer: {
    height: 52,
  },
  dropdown: {
    backgroundColor: "#ffffff",
    borderColor: "#e6e9ee",
    borderRadius: 10,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  dropDownContainer: {
    backgroundColor: "#fff",
    borderColor: "#e6e9ee",
    borderRadius: 10,
    marginTop: 4,
    elevation: 6,
  },
  text: {
    fontSize: 15,
    color: "#111827",
  },
  placeholder: {
    color: "#9ca3af",
  },
  arrow: {
    tintColor: "#9ca3af",
  },
  tick: {
    tintColor: "#10b981",
  },
  dropdownError: {
    borderColor: "#f87171",
  },
  errorText: {
    color: "#ef4444",
    marginTop: 6,
    marginLeft: 4,
    fontSize: 12,
  },
});

export default SingleSelectPicker;
