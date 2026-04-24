import Supercluster from "supercluster";
import { KmlSpot } from "./kmlParser";
import { PilgrimageSpot } from "../types/spot";

export interface ClusterPoint {
  type: "cluster";
  id: number;
  coordinate: { latitude: number; longitude: number };
  count: number;
}

export interface SinglePoint {
  type: "single";
  coordinate: { latitude: number; longitude: number };
  spot: KmlSpot | PilgrimageSpot;
  isKml: boolean;
}

export type MapPoint = ClusterPoint | SinglePoint;

export function buildClusters(
  spots: (KmlSpot | PilgrimageSpot)[],
  isKml: boolean,
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  },
  zoom: number
): MapPoint[] {
  const index = new Supercluster({ radius: 60, maxZoom: 16 });

  const points = spots.map((spot, i) => ({
    type: "Feature" as const,
    geometry: {
      type: "Point" as const,
      coordinates: [spot.longitude, spot.latitude],
    },
    properties: { id: i, spot, isKml },
  }));

  index.load(points);

  const bbox: [number, number, number, number] = [
  region.longitude - region.longitudeDelta / 2,
  region.latitude - region.latitudeDelta / 2,
  region.longitude + region.longitudeDelta / 2,
  region.latitude + region.latitudeDelta / 2,
  ];

  const clusters = index.getClusters(bbox, Math.round(zoom));

  return clusters.map((c, i) => {
    if (c.properties.cluster) {
      return {
        type: "cluster",
        id: i,
        coordinate: {
          latitude: c.geometry.coordinates[1],
          longitude: c.geometry.coordinates[0],
        },
        count: c.properties.point_count,
      };
    }
    return {
      type: "single",
      coordinate: {
        latitude: c.geometry.coordinates[1],
        longitude: c.geometry.coordinates[0],
      },
      spot: c.properties.spot,
      isKml: c.properties.isKml,
    };
  });
}