### VUE-CLI
## 特点
- 干净，不包含vue的第三方插件，由自己扩展
- 快速构建多页或者单页应用
- 基于webpack@^4.0、缓存dll与happypack多进程构建，构建速度迅速如闪电一般
## 构建
### 1、下载依赖
```vue
yarn // 或者 npm install
```
### 2、开发构建
```vue
npm run dev
```
### 3、生产构建
```vue
npm run build
```

## 使用方法
### 1、克隆项目框架到本地
```vue
git clone https://github.com/ZhanYishu/vue-cli.git
```
### 2、在项目目录src/views/下可以新建多个应用文件夹，默认已经建好index文件夹，每个文件夹代表一个应用，项目会根据目录自动构建出多页应用
