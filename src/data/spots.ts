import { PilgrimageSpot } from "../types/spot";

export const BUILTIN_SPOTS: PilgrimageSpot[] = [
  // 沼津市区
  { id: 1, name: "沼津港", nameJp: "沼津港", latitude: 35.0956, longitude: 138.8637, description: "沼津最著名的港口，多处动画场景取景地", category: "landmark" },
  { id: 2, name: "沼津站南口", nameJp: "沼津駅南口", latitude: 35.0934, longitude: 138.8630, description: "Aqours 常经过的车站，多次出现在动画中", category: "landmark" },
  { id: 3, name: "仲见世商店街", nameJp: "仲見世商店街", latitude: 35.0940, longitude: 138.8618, description: "第6话 PV 拍摄地，善子的 GAMERS 店原型附近", category: "landmark" },
  { id: 4, name: "GAMERS 沼津店", nameJp: "ゲーマーズ沼津店", latitude: 35.0938, longitude: 138.8610, description: "善子担任看板娘的原型店铺", category: "landmark" },
  { id: 5, name: "Animate 沼津店", nameJp: "アニメイト沼津店", latitude: 35.0942, longitude: 138.8615, description: "商店街内的动画周边店", category: "landmark" },
  { id: 6, name: "沼津市立图书馆", nameJp: "沼津市立図書館", latitude: 35.0934, longitude: 138.8700, description: "第2话 曜和千歌去过的图书馆原型", category: "landmark" },
  { id: 7, name: "大手町购物中心", nameJp: "イシバシプラザ", latitude: 35.0960, longitude: 138.8645, description: "千歌等人常去的购物中心原型", category: "landmark" },
  { id: 8, name: "沼津港大型展望水门 びゅうお", nameJp: "沼津港大型展望水門 びゅうお", latitude: 35.0892, longitude: 138.8578, description: "沼津港标志性建筑，多话出现", category: "landmark" },
  { id: 9, name: "珈琲 波无", nameJp: "珈琲 波無", latitude: 35.0910, longitude: 138.8590, description: "第4话 曜家的咖啡馆原型", category: "food" },
  { id: 10, name: "沼津汉堡", nameJp: "沼津バーガー", latitude: 35.0900, longitude: 138.8582, description: "沼津港内著名汉堡店，动画中出现", category: "food" },

  // 内浦地区
  { id: 11, name: "淡岛", nameJp: "淡島", latitude: 35.033554, longitude: 138.889992, description: "鞠莉家（小原家）的所在地原型，淡岛酒店", category: "landmark" },
  { id: 12, name: "淡岛神社", nameJp: "淡島神社", latitude: 35.034200, longitude: 138.890500, description: "Aqours 成员登山锻炼的神社原型", category: "shrine" },
  { id: 13, name: "淡岛水族馆", nameJp: "あわしまマリンパーク", latitude: 35.033554, longitude: 138.889992, description: "果南家潜水店原型附近，多话取景", category: "landmark" },
  { id: 14, name: "安田屋旅馆", nameJp: "安田屋旅館", latitude: 35.020382, longitude: 138.897533, description: "千歌家旅馆的原型，太宰治也曾入住", category: "landmark" },
  { id: 15, name: "伊豆·三津海洋乐园", nameJp: "伊豆・三津シーパラダイス", latitude: 35.019491, longitude: 138.896070, description: "第1话等多处海边场景取景地", category: "nature" },
  { id: 16, name: "内浦渔协直销所", nameJp: "内浦漁協直売所", latitude: 35.020800, longitude: 138.896500, description: "果南家附近，多次出现在动画背景中", category: "landmark" },
  { id: 17, name: "长井崎中学", nameJp: "沼津市立長井崎中学校", latitude: 35.021346, longitude: 138.883390, description: "浦之星女子学园的原型学校", category: "school" },
  { id: 18, name: "木负堤防", nameJp: "木負堤防", latitude: 35.0634, longitude: 138.8820, description: "千歌和梨子对话的海边堤防原型", category: "nature" },
  { id: 19, name: "三津浜海岸", nameJp: "三津浜", latitude: 35.0530, longitude: 138.8750, description: "开场白海边场景取景地", category: "nature" },
  
  // 其他地区
  { id: 20, name: "ららぽーと沼津", nameJp: "ららぽーと沼津", latitude: 35.1120, longitude: 138.8820, description: "大型商场，现有 LoveLive 合作活动", category: "landmark" },
  { id: 21, name: "沼津御用邸纪念公园", nameJp: "沼津御用邸記念公園", latitude: 35.0750, longitude: 138.8690, description: "皇室别墅遗址改建的公园，动画背景出现", category: "nature" },
  { id: 22, name: "香贯山展望台", nameJp: "香貫山展望台", latitude: 35.0880, longitude: 138.8760, description: "俯瞰沼津市全景的山顶展望台", category: "nature" },
  { id: 23, name: "千本浜公园", nameJp: "千本浜公園", latitude: 35.0870, longitude: 138.8420, description: "沼津海岸松林公园，多处背景取景", category: "nature" },
];