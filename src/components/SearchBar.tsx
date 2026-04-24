import { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { BUILTIN_SPOTS } from "../data/spots";
import { KmlSpot } from "../lib/kmlParser";
import { PilgrimageSpot } from "../types/spot";

interface SearchResult {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  isKml: boolean;
  original: KmlSpot | PilgrimageSpot;
}

interface Props {
  importedSpots: KmlSpot[];
  onSelect: (result: SearchResult) => void;
}

export default function SearchBar({ importedSpots, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim().length < 1) {
      setResults([]);
      return;
    }

    const keyword = text.toLowerCase();

    const builtinResults: SearchResult[] = BUILTIN_SPOTS
      .filter(
        (s) =>
          s.name.toLowerCase().includes(keyword) ||
          s.description.toLowerCase().includes(keyword)
      )
      .map((s) => ({
        name: s.name,
        description: s.description,
        latitude: s.latitude,
        longitude: s.longitude,
        isKml: false,
        original: s,
      }));

    const kmlResults: SearchResult[] = importedSpots
      .filter(
        (s) =>
          s.name.toLowerCase().includes(keyword) ||
          s.description.toLowerCase().includes(keyword)
      )
      .slice(0, 20) // 最多显示20个结果
      .map((s) => ({
        name: s.name,
        description: s.description,
        latitude: s.latitude,
        longitude: s.longitude,
        isKml: true,
        original: s,
      }));

    setResults([...builtinResults, ...kmlResults]);
  };

  const handleSelect = (result: SearchResult) => {
    setQuery("");
    setResults([]);
    onSelect(result);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleSearch}
        placeholder="🔍 搜索圣地..."
        placeholderTextColor="#999"
        autoCorrect={false}
        autoCapitalize="none"
      />
      {results.length > 0 && (
        <FlatList
          style={styles.list}
          data={results}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelect(item)}
            >
              <View style={styles.itemLeft}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc} numberOfLines={1}>
                  {item.description}
                </Text>
              </View>
              <View style={[styles.tag, item.isKml ? styles.tagKml : styles.tagBuiltin]}>
                <Text style={styles.tagText}>{item.isKml ? "导入" : "内置"}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 56,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  list: {
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 4,
    maxHeight: 300,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemLeft: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: "bold", color: "#333" },
  itemDesc: { fontSize: 12, color: "#999", marginTop: 2 },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginLeft: 8,
  },
  tagBuiltin: { backgroundColor: "#FF6B9D" },
  tagKml: { backgroundColor: "#4A90E2" },
  tagText: { color: "white", fontSize: 11, fontWeight: "bold" },
});