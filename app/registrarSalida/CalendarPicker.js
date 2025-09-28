import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import styles from "./styles";

export default function CalendarPicker({ fecha, setFecha }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setDatePickerVisibility(true)}
      >
        <Text>{fecha}</Text>
      </TouchableOpacity>

      {isDatePickerVisible && (
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day) => {
              const formatted =
                day.day.toString().padStart(2, "0") +
                "/" +
                day.month.toString().padStart(2, "0") +
                "/" +
                day.year;
              setFecha(formatted);
              setDatePickerVisibility(false);
            }}
            markedDates={{
              [fecha.split("/").reverse().join("-")]: {
                selected: true,
                selectedColor: "#007bff",
              },
            }}
            monthFormat={"MMMM yyyy"}
            firstDay={1}
            theme={{
              selectedDayBackgroundColor: "#007bff",
              todayTextColor: "#ff0000",
              arrowColor: "#007bff",
              textDayFontWeight: "500",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "600",
              textDayHeaderFontSize: 14,
            }}
            dayNames={["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]}
            monthNames={[
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio",
              "Agosto",
              "Septiembre",
              "Octubre",
              "Noviembre",
              "Diciembre",
            ]}
          />
          <TouchableOpacity
            onPress={() => setDatePickerVisibility(false)}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
