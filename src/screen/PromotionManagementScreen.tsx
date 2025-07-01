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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  navigation: any;
}

interface Promotion {
  id: number;
  code: string;
  description: string;
  discount: string;
  validUntil: string;
}

export default function PromotionManagementScreen({ navigation }: Props) {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  const resetForm = () => {
    setCode("");
    setDescription("");
    setDiscount("");
    setValidUntil("");
  };

  const handleAddOrUpdatePromotion = () => {
    if (!code || !discount) {
      Alert.alert("Validation Error", "Code and Discount are required.");
      return;
    }

    if (editingPromotion) {
      const updated = promotions.map((item) =>
        item.id === editingPromotion.id
          ? { ...item, code, description, discount, validUntil }
          : item
      );
      setPromotions(updated);
      setEditingPromotion(null);
    } else {
      const newPromotion: Promotion = {
        id: Date.now(),
        code,
        description,
        discount,
        validUntil,
      };
      setPromotions([...promotions, newPromotion]);
    }
    resetForm();
    setModalVisible(false);
  };

  const openEditModal = (promo: Promotion) => {
    setEditingPromotion(promo);
    setCode(promo.code);
    setDescription(promo.description);
    setDiscount(promo.discount);
    setValidUntil(promo.validUntil);
    setModalVisible(true);
  };

  const deletePromotion = (id: number) => {
    setPromotions(promotions.filter((item) => item.id !== id));
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
        <Text style={styles.headerText}>Promotion Management</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            resetForm();
            setEditingPromotion(null);
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>Add New Promotion</Text>
        </TouchableOpacity>

        <FlatList
          data={promotions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.code}</Text>
              <Text style={styles.itemDetail}>Discount: {item.discount}%</Text>
              <Text style={styles.itemDetail}>
                Valid Until: {item.validUntil}
              </Text>
              <Text style={styles.itemDetail}>{item.description}</Text>
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => openEditModal(item)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deletePromotion(item.id)}
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
            {editingPromotion ? "Edit Promotion" : "Add New Promotion"}
          </Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Promotion Code *</Text>
            <TextInput
              style={styles.input}
              value={code}
              onChangeText={setCode}
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
            <Text style={styles.label}>Discount (%) *</Text>
            <TextInput
              style={styles.input}
              value={discount}
              onChangeText={setDiscount}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Valid Until</Text>
            <TextInput
              style={styles.input}
              value={validUntil}
              onChangeText={setValidUntil}
              placeholder="YYYY-MM-DD"
            />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleAddOrUpdatePromotion}
          >
            <Text style={styles.buttonText}>
              {editingPromotion ? "Update" : "Add"}
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
