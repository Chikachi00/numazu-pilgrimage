import AsyncStorage from "@react-native-async-storage/async-storage";
import { KmlSpot } from "./kmlParser";

const STORAGE_KEY = "imported_spots";

export async function saveImportedSpots(spots: KmlSpot[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(spots));
}

export async function loadImportedSpots(): Promise<KmlSpot[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function clearImportedSpots(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}