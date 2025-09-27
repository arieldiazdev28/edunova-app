import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { COLORS } from "../styles.js"; // Importa tus colores

const CustomInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = isFocused ? COLORS.primaryBlue : COLORS.lightGray;

  return (
    <TextInput
      style={[styles.input, { borderColor: borderColor }]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
  },
});

export default CustomInput;
