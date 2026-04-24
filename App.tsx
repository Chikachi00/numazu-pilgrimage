import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import { BUILTIN_SPOTS } from "./src/data/spots";
import { PilgrimageSpot } from "./src/types/spot";
import { KmlSpot } from "./src/lib/kmlParser";
import { saveImportedSpots, loadImportedSpots, clearImportedSpots } from "./src/lib/storage";
import SpotCard from "./src/components/SpotCard";
import ImportScreen from "./src/screens/ImportScreen";

export default function App() {
  const [selectedSpot, setSelectedSpot] = useState<PilgrimageSpot | null>(null);
  const [showImport, setShowImport] = useState(false);
  const [importedSpots, setImportedSpots] = useState<KmlSpot[]>([]);
  const [selectedKmlSpot, setSelectedKmlSpot] = useState<KmlSpot | null>(null);

  // App 启动时自动读取本地存储
  useEffect(() => {
    loadImportedSpots().then(setImportedSpots);
  }, []);

  const handleImport = async (spots: KmlSpot[]) => {
    const merged = [...importedSpots, ...spots];
    setImportedSpots(merged);
    await saveImportedSpots(merged);
    setShowImport(false);
  };

  const handleClear = async () => {
    setImportedSpots([]);
    setSelectedKmlSpot(null);
    await clearImportedSpots();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 35.0956,
          longitude: 138.8637,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={() => {
          setSelectedSpot(null);
          setSelectedKmlSpot(null);
        }}
      >
        {/* 内置圣地标记 */}
        {BUILTIN_SPOTS.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{
              latitude: spot.latitude,
              longitude: spot.longitude,
            }}
            onPress={() => {
              setSelectedKmlSpot(null);
              setSelectedSpot(spot);
            }}
            tracksViewChanges={false}
          />
        ))}

        {/* KML 导入的标记 */}
        {importedSpots.map((spot, index) => (
          <Marker
            key={`kml-${index}`}
            coordinate={{
              latitude: spot.latitude,
              longitude: spot.longitude,
            }}
            pinColor="blue"
            onPress={() => {
              setSelectedSpot(null);
              setSelectedKmlSpot(spot);
            }}
            tracksViewChanges={false}
          />
        ))}
      </MapView>

      {/* 导入按钮 */}
      <TouchableOpacity
        style={styles.importBtn}
        onPress={() => setShowImport(true)}
      >
        <Text style={styles.importBtnText}>＋ 导入地图</Text>
      </TouchableOpacity>

      {/* 清除按钮，有导入数据时才显示 */}
      {importedSpots.length > 0 && (
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={handleClear}
        >
          <Text style={styles.importBtnText}>✕ 清除导入</Text>
        </TouchableOpacity>
      )}

      {/* 内置圣地详情卡片 */}
      {selectedSpot && (
        <SpotCard
          spot={selectedSpot}
          onClose={() => setSelectedSpot(null)}
        />
      )}

      {/* KML 导入的详情卡片 */}
      {selectedKmlSpot && (
        <View style={styles.kmlCard}>
          <TouchableOpacity
            style={styles.kmlCloseBtn}
            onPress={() => setSelectedKmlSpot(null)}
          >
            <Text style={styles.kmlCloseText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.kmlName}>{selectedKmlSpot.name}</Text>
          <Text style={styles.kmlDesc}>{selectedKmlSpot.description}</Text>
        </View>
      )}

      {/* 导入面板 */}
      {showImport && (
        <ImportScreen
          onImport={handleImport}
          onClose={() => setShowImport(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  importBtn: {
    position: "absolute",
    top: 56,
    right: 16,
    backgroundColor: "#FF6B9D",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  importBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  kmlCard: {
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
  clearBtn: {
  position: "absolute",
  top: 56,
  left: 16,
  backgroundColor: "#888",
  borderRadius: 20,
  paddingHorizontal: 16,
  paddingVertical: 8,
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 4,
  },
  kmlCloseBtn: {
    position: "absolute",
    top: 12,
    right: 16,
  },
  kmlCloseText: {
    fontSize: 18,
    color: "#999",
  },
  kmlName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  kmlDesc: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});