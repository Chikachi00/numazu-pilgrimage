export interface KmlSpot {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

export async function fetchAndParseKml(url: string): Promise<KmlSpot[]> {
  // 把 My Maps 分享链接转成 KML 下载链接
  const kmlUrl = url.includes("google.com/maps/d/")
    ? url.replace("/viewer", "/kml").replace("/edit", "/kml") + "&forcekml=1"
    : url;

  const response = await fetch(kmlUrl);
  const text = await response.text();

  return parseKmlText(text);
}

export function parseKmlText(kmlText: string): KmlSpot[] {
  const spots: KmlSpot[] = [];

  // 提取所有 <Placemark> 块
  const placemarks = kmlText.match(/<Placemark[\s\S]*?<\/Placemark>/g) || [];

  for (const placemark of placemarks) {
    const name = extractTag(placemark, "name");
    const description = extractTag(placemark, "description");
    const coordinates = extractTag(placemark, "coordinates");

    if (!coordinates) continue;

    const parts = coordinates.trim().split(",");
    if (parts.length < 2) continue;

    const longitude = parseFloat(parts[0]);
    const latitude = parseFloat(parts[1]);

    if (isNaN(latitude) || isNaN(longitude)) continue;

    spots.push({ name, description, latitude, longitude });
  }

  return spots;
}

function extractTag(text: string, tag: string): string {
  const match = text.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`));
  return match ? match[1].replace(/<[^>]+>/g, "").trim() : "";
}