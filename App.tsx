import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";
import { BUILTIN_SPOTS } from "./src/data/spots";
import { PilgrimageSpot } from "./src/types/spot";
import SpotCard from "./src/components/SpotCard";

export default function App() {
  const [selectedSpot, setSelectedSpot] = useState<PilgrimageSpot | null>(null);

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
        onPress={() => setSelectedSpot(null)}
      >
        {BUILTIN_SPOTS.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{
              latitude: spot.latitude,
              longitude: spot.longitude,
            }}
            onPress={() => setSelectedSpot(spot)}
            tracksViewChanges={false}
          />
        ))}
      </MapView>

      {selectedSpot && (
        <SpotCard
          spot={selectedSpot}
          onClose={() => setSelectedSpot(null)}
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
});