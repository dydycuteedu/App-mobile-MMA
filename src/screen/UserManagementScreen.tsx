import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  navigation: any;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: Date | null;
  role: string;
  active: boolean;
}

export default function UserManagementScreen({ navigation }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [role, setRole] = useState("");
  const [active, setActive] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setDob(null);
    setRole("");
    setActive(true);
  };

  const handleAddOrUpdateUser = () => {
    if (!name || !email) {
      Alert.alert("Validation Error", "Name and Email are required.");
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      Alert.alert("Email Error", "Email must end with @gmail.com");
      return;
    }

    if (editingUser) {
      const updated = users.map((item) =>
        item.id === editingUser.id
          ? { ...item, name, email, phone, address, dob, role, active }
          : item
      );
      setUsers(updated);
      setEditingUser(null);
    } else {
      const newUser: User = {
        id: Date.now(),
        name,
        email,
        phone,
        address,
        dob,
        role,
        active,
      };
      setUsers([...users, newUser]);
    }
    resetForm();
    setModalVisible(false);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setAddress(user.address);
    setDob(user.dob);
    setRole(user.role);
    setActive(user.active);
    setModalVisible(true);
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>User Management</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            resetForm();
            setEditingUser(null);
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>Add New User</Text>
        </TouchableOpacity>

        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemDetail}>Email: {item.email}</Text>
              <Text style={styles.itemDetail}>Phone: {item.phone}</Text>
              <Text style={styles.itemDetail}>Address: {item.address}</Text>
              <Text style={styles.itemDetail}>
                DOB: {item.dob ? item.dob.toDateString() : "-"}
              </Text>
              <Text style={styles.itemDetail}>Role: {item.role}</Text>
              <Text style={styles.itemDetail}>
                Status: {item.active ? "Active" : "Inactive"}
              </Text>
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => openEditModal(item)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteUser(item.id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalHeader}>
            {editingUser ? "Edit User" : "Add New User"}
          </Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {dob ? dob.toDateString() : "Select Date"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dob || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDob(selectedDate);
                }}
              />
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Role</Text>
            <RNPickerSelect
              onValueChange={(value) => setRole(value)}
              value={role}
              items={[
                { label: "Admin", value: "Admin" },
                { label: "User", value: "User" },
                { label: "Staff", value: "Staff" },
              ]}
              style={{
                inputIOS: styles.input,
                inputAndroid: styles.input,
              }}
              placeholder={{ label: "Select Role", value: null }}
            />
          </View>

          <View style={styles.formGroupRow}>
            <Text style={styles.label}>Active:</Text>
            <TouchableOpacity onPress={() => setActive(!active)}>
              <Text
                style={[
                  styles.activeText,
                  { color: active ? "#4CAF50" : "#E95322" },
                ]}
              >
                {active ? "Active" : "Inactive"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleAddOrUpdateUser}
          >
            <Text style={styles.buttonText}>
              {editingUser ? "Update" : "Add"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#F5CB58",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  backButton: { marginRight: 10 },
  headerText: { color: "white", fontSize: 24, fontWeight: "bold" },
  body: { padding: 20 },
  addButton: {
    backgroundColor: "#F5CB58",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2,
  },
  itemTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  itemDetail: { fontSize: 14, color: "#555" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  editButton: {
    backgroundColor: "#F5CB58",
    padding: 10,
    borderRadius: 8,
    width: "48%",
  },
  deleteButton: {
    backgroundColor: "#E95322",
    padding: 10,
    borderRadius: 8,
    width: "48%",
  },
  buttonText: { color: "white", fontWeight: "bold", textAlign: "center" },
  modalContainer: { padding: 20 },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#E95322",
  },
  formGroup: { marginBottom: 15 },
  formGroupRow: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontSize: 16, marginBottom: 5, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  dateButtonText: { fontSize: 16 },
  saveButton: {
    backgroundColor: "#F5CB58",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#999",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  activeText: { fontSize: 18, fontWeight: "bold" },
});
