# 沼津圣地巡礼地图 🗾

一个水水人的圣地巡礼地图试水作，基于 React Native + Expo + Google Maps 开发。

---

## 开发环境

- Node.js v18+
- Expo Go（手机安装）
- VSCode

---

## 每次开发流程

### 1. 启动开发服务器

打开 VSCode 终端，进入项目文件夹：

```bash
cd D:\My_program\numazu-pilgrimage\numazu-pilgrimage
npx expo start --lan
```

### 2. 连接手机

- 手机开热点
- 电脑连手机热点
- 打开 Expo Go → 最近项目列表点击 `numazu-pilgrimage`（第一次需要扫二维码）

### 3. 开发中

- 修改代码保存后手机**自动刷新**
- 如果没刷新，摇一摇手机 → 点 **Reload**

### 4. 推送代码到 GitHub

```bash
git add .
git commit -m "feat: 描述这次改了什么"
git push origin main
```

---

## 注意事项

- 学校网络有设备隔离，必须用**手机热点**
- `node_modules` 文件夹不会上传 GitHub，克隆项目后需要先跑 `npm install`
- `npm warn deprecated` 的警告不用管，正常现象

---

## 项目结构

```
src/
├── components/     # 可复用组件（SpotCard 等）
├── screens/        # 页面
├── data/           # 内置圣地数据
├── lib/            # 工具函数（KML解析器等）
└── types/          # TypeScript 类型定义
```

---

## 当前进度

- [x] 地图基础显示
- [x] 内置圣地标记
- [x] 点击标记显示详情卡片
- [ ] KML 导入功能
- [ ] 云端分享
