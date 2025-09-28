import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { Link, useRouter } from "expo-router";

import DropdownMotivo from "./DropdownMotivo";
import CalendarPicker from "./CalendarPicker";
import styles from "./styles";

export default function NuevaSalida() {
  const [fecha, setFecha] = useState("Día/Mes/Año");
  const [productos, setProductos] = useState([]);
  const [motivo, setMotivo] = useState(null);

  const router = useRouter(); 

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Encabezado con botón de volver */}
          <View style={styles.header}>
            <Text style={styles.title}>Nueva salida</Text>
            <Link href="/nuevaSalida" asChild>
              <TouchableOpacity style={styles.backIcon}>
                <Text style={styles.backIconText}>{"<"}</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Dropdown de motivo */}
          <Text style={styles.label}>Motivo de la salida</Text>
          <DropdownMotivo motivo={motivo} setMotivo={setMotivo} />

          {/* Fecha */}
          <Text style={styles.label}>Fecha de salida</Text>
          <CalendarPicker fecha={fecha} setFecha={setFecha} />

          {/* Productos */}
          <Text style={styles.sectionTitle}>Productos de la salida</Text>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Esta salida no cuenta con ningún producto...
            </Text>
          </View>

          {/* Botón que manda al inventario/index.js */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/inventario")}
          >
            <Text style={styles.addButtonText}>
              Agregar un producto del inventario +
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Botón fijo en la parte inferior */}
        <View style={styles.fixedBottom}>
        <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.push("/ajustes")} 
          >
            <Text style={styles.registerButtonText}>
              Registrar salida &gt;&gt;
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

