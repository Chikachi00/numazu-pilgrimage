export interface AnitabiPoint {
  id: string;
  cn: string;        // 中文地点名
  name: string;      // 日文地点名
  image?: string;    // 参考图片
  ep?: number;       // 集数
  geo: [number, number]; // [纬度, 经度]
}

export async function fetchAnitabiSpots(bangumiId: number): Promise<AnitabiPoint[]> {
  const res = await fetch(`https://api.anitabi.cn/bangumi/${bangumiId}/lite`);
  const data = await res.json();
  return data.litePoints || [];
}