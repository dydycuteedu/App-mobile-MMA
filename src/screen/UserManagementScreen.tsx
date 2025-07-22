import React, { useState, useEffect } from "react";
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
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const API_URL = "http://10.12.66.89:3000/users";

interface Props {
  navigation: any;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  isBanned: boolean;
}

export default function UserManagementScreen({ navigation }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [isBanned, setIsBanned] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      Alert.alert("Error", "Failed to load user data.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setRole("");
    setIsBanned(false);
  };

  const handleAddOrUpdateUser = async () => {
    if (!name || !email) {
      Alert.alert("Validation Error", "Name and Email are required.");
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      Alert.alert("Email Error", "Email must end with @gmail.com");
      return;
    }

    const payload = {
      name,
      email,
      phone,
      address,
      role,
      isBanned,
    };

    try {
      if (editingUser) {
        await axios.put(`${API_URL}/${editingUser.id}`, payload);
      } else {
        await axios.post(API_URL, { ...payload, id: Date.now().toString() });
      }

      fetchUsers();
      resetForm();
      setEditingUser(null);
      setModalVisible(false);
    } catch (err) {
      Alert.alert("Error", "Failed to save user.");
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setAddress(user.address);
    setRole(user.role);
    setIsBanned(user.isBanned);
    setModalVisible(true);
  };

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (err) {
      Alert.alert("Error", "Failed to delete user.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
              <Text style={styles.itemDetail}>Role: {item.role}</Text>
              <Text style={styles.itemDetail}>
                Status: {item.isBanned ? "Banned" : "Active"}
              </Text>
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.editButton} onPress={() => openEditModal(item)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteUser(item.id)}>
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
            <TextInput style={styles.input} value={name} onChangeText={setName} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput style={styles.input} value={address} onChangeText={setAddress} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Role</Text>
            <View style={styles.selectContainer}>
              <RNPickerSelect
                onValueChange={(value) => setRole(value)}
                value={role}
                items={[
                  { label: "admin", value: "admin" },
                  { label: "customer", value: "customer" },
                ]}
                style={{ inputIOS: styles.input, inputAndroid: styles.input }}
                placeholder={{ label: "Select Role", value: null }}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Set Status</Text>
            <TouchableOpacity
              style={styles.statusToggle}
              onPress={() => setIsBanned(!isBanned)}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold", color: isBanned ? "red" : "green" }}>
                {isBanned ? "Banned" : "Active"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleAddOrUpdateUser}>
            <Text style={styles.buttonText}>{editingUser ? "Update" : "Add"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
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
  label: { fontSize: 16, marginBottom: 5, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
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
  selectContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusToggle: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  }
});