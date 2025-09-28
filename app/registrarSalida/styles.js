import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  fixedBottom: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  backIcon: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  backIconText: {
    color: "#000000ff",
    fontSize: 25,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: "#00568F",
    fontWeight: "bold",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginTop: 5,
  },
  arrow: { fontSize: 16, color: "#555" },
  dropdownList: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 5,
    borderRadius: 6,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginTop: 5,
  },
  calendarContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cancelButton: {
    marginTop: 10,
    alignSelf: "flex-end",
    padding: 8,
  },
  cancelButtonText: {
    color: "#00568F",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "600",
    color: "#00568F",
  },
  emptyContainer: {
    backgroundColor: "#E6E6E7",
    borderRadius: 8,
    padding: 40,
    marginTop: 10,
  },
  emptyText: {
    fontStyle: "italic",
    color: "#525252",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#00568F",
    padding: 12,
    borderRadius: 6,
    marginTop: 15,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
  },
  registerButton: {
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 6,
  },
  registerButtonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
