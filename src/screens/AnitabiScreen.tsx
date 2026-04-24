import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  ActivityIndicator, Alert, ScrollView,
} from "react-native";
import { fetchAnitabiSpots, AnitabiPoint } from "../lib/anitabiApi";

interface Props {
  onImport: (spots: AnitabiPoint[]) => void;
  onClose: () => void;
}

const POPULAR_ANIME = [
  { id: 205, name: "LoveLive! Sunshine!!" },
  { id: 103, name: "LoveLive! (μ's)" },
];

export default function AnitabiScreen({ onImport, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const handleImport = async (id: number, name: string) => {
    setLoading(true);
    try {
      const spots = await fetchAnitabiSpots(id);
      if (spots.length === 0) {
        Alert.alert("导入失败", "没有找到巡礼数据");
      } else {
        Alert.alert("导入成功", `成功导入 ${spots.length} 个 ${name} 圣地`, [
          { text: "确定", onPress: () => onImport(spots) },
        ]);
      }
    } catch {
      Alert.alert("导入失败", "网络错误，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>从 Anitabi 导入</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeBtn}>✕</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>数据来源：anitabi.cn，中文圣地巡礼网站</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#FF6B9D" style={{ marginTop: 40 }} />
      ) : (
        <ScrollView>
          {POPULAR_ANIME.map((anime) => (
            <TouchableOpacity
              key={anime.id}
              style={styles.item}
              onPress={() => handleImport(anime.id, anime.name)}
            >
              <Text style={styles.itemName}>{anime.name}</Text>
              <Text style={styles.itemArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  closeBtn: { fontSize: 18, color: "#999" },
  subtitle: { fontSize: 12, color: "#999", marginBottom: 20 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 12,
    marginBottom: 10,
  },
  itemName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  itemArrow: { fontSize: 18, color: "#FF6B9D" },
});