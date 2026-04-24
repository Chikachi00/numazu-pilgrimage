import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect, useRef } from "react";
import { BUILTIN_SPOTS } from "./src/data/spots";
import { PilgrimageSpot } from "./src/types/spot";
import { KmlSpot } from "./src/lib/kmlParser";
import { saveImportedSpots, loadImportedSpots, clearImportedSpots } from "./src/lib/storage";
import SpotCard from "./src/components/SpotCard";
import ImportScreen from "./src/screens/ImportScreen";
import SearchBar from "./src/components/SearchBar";
import AnitabiScreen from "./src/screens/AnitabiScreen";
import { AnitabiPoint } from "./src/lib/anitabiApi";

const INITIAL_REGION = {
  latitude: 35.0956,
  longitude: 138.8637,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function App() {
  const [selectedSpot, setSelectedSpot] = useState<PilgrimageSpot | null>(null);
  const [showImport, setShowImport] = useState(false);
  const [showAnitabi, setShowAnitabi] = useState(false);
  const [importedSpots, setImportedSpots] = useState<KmlSpot[]>([]);
  const [selectedKmlSpot, setSelectedKmlSpot] = useState<KmlSpot | null>(null);
  const mapRef = useRef<any>(null);

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

  const handleAnitabiImport = async (spots: AnitabiPoint[]) => {
    const converted = spots.map((s) => ({
      name: s.cn || s.name,
      description: `第${s.ep ?? "?"}话`,
      latitude: s.geo[0],
      longitude: s.geo[1],
    }));
    const merged = [...importedSpots, ...converted];
    setImportedSpots(merged);
    await saveImportedSpots(merged);
    setShowAnitabi(false);
  };

  const handleSearchSelect = (result: {
    latitude: number;
    longitude: number;
    isKml: boolean;
    original: any;
  }) => {
    mapRef.current?.animateToRegion({
      latitude: result.latitude,
      longitude: result.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }, 800);

    if (result.isKml) {
      setSelectedSpot(null);
      setSelectedKmlSpot(result.original);
    } else {
      setSelectedKmlSpot(null);
      setSelectedSpot(result.original);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        onPress={() => {
          setSelectedSpot(null);
          setSelectedKmlSpot(null);
        }}
      >
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

      {/* 搜索栏 */}
      <SearchBar
        importedSpots={importedSpots}
        onSelect={handleSearchSelect}
      />

      {/* KML 导入按钮 */}
      <TouchableOpacity
        style={styles.importBtn}
        onPress={() => setShowImport(true)}
      >
        <Text style={styles.importBtnText}>KML 导入</Text>
      </TouchableOpacity>

      {/* Anitabi 导入按钮 */}
      <TouchableOpacity
        style={styles.anitabiBtn}
        onPress={() => setShowAnitabi(true)}
      >
        <Text style={styles.importBtnText}>🗾 巡礼导入</Text>
      </TouchableOpacity>

      {/* 清除按钮 */}
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

      {/* KML 详情卡片 */}
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

      {/* KML 导入面板 */}
      {showImport && (
        <ImportScreen
          onImport={handleImport}
          onClose={() => setShowImport(false)}
        />
      )}

      {/* Anitabi 导入面板 */}
      {showAnitabi && (
        <AnitabiScreen
          onImport={handleAnitabiImport}
          onClose={() => setShowAnitabi(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  importBtn: {
    position: "absolute",
    top: 110,
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
  anitabiBtn: {
    position: "absolute",
    top: 158,
    right: 16,
    backgroundColor: "#4A90E2",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  clearBtn: {
    position: "absolute",
    top: 110,
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
  importBtnText: { color: "white", fontWeight: "bold", fontSize: 14 },
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
  kmlCloseBtn: { position: "absolute", top: 12, right: 16 },
  kmlCloseText: { fontSize: 18, color: "#999" },
  kmlName: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  kmlDesc: { fontSize: 14, color: "#333", lineHeight: 20 },
});
