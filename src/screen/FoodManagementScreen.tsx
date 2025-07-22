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
  Switch,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  navigation: any;
}

interface Food {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  isAvailable: boolean;
}
const YOUR_COMPUTER_IP = "10.12.66.89";

const API_URL = `http://${YOUR_COMPUTER_IP}:3000/foods`;

export default function FoodManagementScreen({ navigation }: Props) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setFoods(data);
    } catch (err) {
      Alert.alert("Error", "Failed to load food data.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setIsAvailable(true);
    setEditingFood(null);
  };

  const handleAddOrUpdateFood = async () => {
    if (!name || !price) {
      Alert.alert("Validation Error", "Name and Price are required.");
      return;
    }

    const foodData: Omit<Food, "id"> = {
      name,
      description,
      price,
      category,
      isAvailable,
    };

    try {
      if (editingFood) {
        await fetch(`${API_URL}/${editingFood.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(foodData),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(foodData),
        });
      }

      fetchFoods();
      resetForm();
      setModalVisible(false);
    } catch (err) {
      Alert.alert("Error", "Failed to save food.");
    }
  };

  const openEditModal = (food: Food) => {
    setEditingFood(food);
    setName(food.name);
    setDescription(food.description);
    setPrice(food.price);
    setCategory(food.category);
    setIsAvailable(food.isAvailable);
    setModalVisible(true);
  };

  const deleteFood = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchFoods();
    } catch (err) {
      Alert.alert("Error", "Failed to delete food.");
    }
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
        <Text style={styles.headerText}>Food Management</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            resetForm();
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>Add New Food</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#FF9800" />
        ) : (
          <FlatList
            data={foods}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemDetail}>Price: ${item.price}</Text>
                <Text style={styles.itemDetail}>Category: {item.category}</Text>
                <Text style={styles.itemDetail}>
                  Status: {item.isAvailable ? "Available" : "Out of Stock"}
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
                    onPress={() => deleteFood(item.id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </ScrollView>

      {/* Modal for Add/Edit */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalHeader}>
            {editingFood ? "Edit Food" : "Add New Food"}
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
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Price *</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Category</Text>
            <TextInput
              style={styles.input}
              value={category}
              onChangeText={setCategory}
            />
          </View>

          <View style={styles.formGroupRow}>
            <Text style={styles.label}>Available:</Text>
            <Switch value={isAvailable} onValueChange={setIsAvailable} />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleAddOrUpdateFood}
          >
            <Text style={styles.buttonText}>
              {editingFood ? "Update" : "Add"}
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
});
