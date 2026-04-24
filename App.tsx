import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { BUILTIN_SPOTS } from "./src/data/spots";

export default function App() {
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
      >
        {BUILTIN_SPOTS.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{
              latitude: spot.latitude,
              longitude: spot.longitude,
            }}
            title={spot.name}
            description={spot.description}
          />
        ))}
      </MapView>
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
