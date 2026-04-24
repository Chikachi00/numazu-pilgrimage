import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PilgrimageSpot } from "../types/spot";

interface Props {
  spot: PilgrimageSpot;
  onClose: () => void;
}

export default function SpotCard({ spot, onClose }: Props) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
      <Text style={styles.name}>{spot.name}</Text>
      <Text style={styles.nameJp}>{spot.nameJp}</Text>
      <Text style={styles.category}>{spot.category}</Text>
      <Text style={styles.description}>{spot.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    bottom: 30,
    left: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 16,
  },
  closeText: {
    fontSize: 18,
    color: "#999",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  nameJp: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    color: "white",
    backgroundColor: "#FF6B9D",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});