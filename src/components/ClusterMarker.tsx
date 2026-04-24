import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Marker } from "react-native-maps";
import { ClusterPoint } from "../lib/clustering";

interface Props {
  cluster: ClusterPoint;
}

export default function ClusterMarker({ cluster }: Props) {
  const size = Math.min(60, 30 + cluster.count / 5);

  return (
    <Marker coordinate={cluster.coordinate} tracksViewChanges={false}>
      <View style={[styles.cluster, { width: size, height: size, borderRadius: size / 2 }]}>
        <Text style={styles.text}>{cluster.count}</Text>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  cluster: {
    backgroundColor: "#FF6B9D",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});