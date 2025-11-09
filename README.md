# 中医舌诊智能分析系统

基于Next.js和AI技术的中医舌诊分析工具。

## 功能特性

- 📷 支持图片上传和拍照上传
- 🔍 智能舌诊分析
- 📊 详细的分析结果展示
- 💾 分析结果保存功能
- 📱 响应式设计，支持移动端
- 🎨 简洁现代的用户界面

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- HTML5 Canvas

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
touge/
├── app/
│   ├── page.tsx              # 主页面
│   ├── layout.tsx            # 布局组件
│   ├── globals.css           # 全局样式
│   ├── components/           # 组件目录
│   │   ├── ImageUpload.tsx   # 图片上传组件
│   │   ├── ResultDisplay.tsx # 结果显示组件
│   │   └── Instructions.tsx  # 使用说明组件
│   └── api/
│       └── analyze/
│           └── route.ts      # 分析API接口
├── public/                   # 静态资源
├── package.json
├── tailwind.config.js
└── README.md
```

## 使用说明

1. 点击"选择图片"或"拍照上传"按钮上传舌头照片
2. 确保照片清晰，光线充足
3. 点击"开始分析"按钮
4. 查看分析结果并可选择保存

## 注意事项

- 请在自然光线下拍摄
- 拍摄前请清洁口腔
- 舌头自然伸出，不要过分用力
- 本分析仅供参考，具体诊断请咨询专业中医师

## 免责声明

本系统仅提供中医舌诊参考分析，不能替代专业医疗诊断。如有健康问题，请及时就医咨询专业医师。

## 许可证

MIT License