// 单个圣地景点的数据结构
export interface PilgrimageSpot {
  id: number;
  name: string;           // 景点名称
  nameJp: string;         // 日文名
  latitude: number;       // 纬度
  longitude: number;      // 经度
  description: string;    // 简介
  category: SpotCategory; // 分类
  imageUrl?: string;      // 参考图片（可选）
  animeRef?: string;      // 对应的动画场景（可选）
}

// 圣地分类
export type SpotCategory =
  | "landmark"    // 地标建筑
  | "shrine"      // 神社
  | "school"      // 学校
  | "food"        // 饮食
  | "nature"      // 自然景观
  | "other";      // 其他

// KML 导入后的地图图层
export interface KmlLayer {
  id: string;
  name: string;       // 图层名称
  sourceUrl: string;  // 原始 My Maps URL
  spots: PilgrimageSpot[];
  importedAt: Date;
}