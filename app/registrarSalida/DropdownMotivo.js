import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const opcionesMotivo = ["Venta", "Donación", "Descarte"];

export default function DropdownMotivo({ motivo, setMotivo }) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setOpen(!open)}
      >
        <Text style={{ color: motivo ? "#00568F" : "#888" }}>
          {motivo || "Seleccionar"}
        </Text>
        <Text style={styles.arrow}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownList}>
          {opcionesMotivo.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.item}
              onPress={() => {
                setMotivo(item);
                setOpen(false);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
