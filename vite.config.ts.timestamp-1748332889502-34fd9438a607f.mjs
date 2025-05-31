// vite.config.ts
import { resolve as resolve2 } from "node:path";
import { loadEnv } from "file:///C:/Users/20752/Desktop/pay%E9%A1%B9%E7%9B%AE/dax-pay-h5(new)/dax-pay-gateway-ui/node_modules/.pnpm/vite@5.4.6_@types+node@20.17.9_less@4.2.1_terser@5.37.0/node_modules/vite/dist/node/index.js";
import { format } from "file:///C:/Users/20752/Desktop/pay%E9%A1%B9%E7%9B%AE/dax-pay-h5(new)/dax-pay-gateway-ui/node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/index.mjs";

// build/utils.ts
import dotenv from "file:///C:/Users/20752/Desktop/pay%E9%A1%B9%E7%9B%AE/dax-pay-h5(new)/dax-pay-gateway-ui/node_modules/.pnpm/dotenv@16.4.7/node_modules/dotenv/lib/main.js";
function isReportMode() {
  return process.env.REPORT === "true";
}
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
      }
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}

// build/vite/plugin/index.ts
import * as path2 from "node:path";
import Components from "file:///C:/Users/20752/Desktop/pay%E9%A1%B9%E7%9B%AE/dax-pay-h5(new)/dax-pay-gateway-ui/node_modules/.pnpm/unplugin-vue-components@0.2_520aad44ad9587820477b2183ecaad9b/node_modules/unplugin-vue-components/dist/vite.js";
import { VantResolver } from "file:///C:/Users/20752/Desktop/pay%E9%A1%B9%E7%9B%AE/dax-pay-h5(new)/dax-pay-gateway-ui/node_modules/.pnpm/unplugin-vue-components@0.2_520aad44ad9587820477b2183ecaad9b/node_modules/unplugin-vue-components/dist/resolvers.js";
import vue from "file:///C:/Users/20752/Desktop/pay%E9%A1%B9%E7%9B%AE/dax-pay-h5(new)/dax-pay-gateway-ui/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vi_dad7ecbfd04089ec0002b900dbd6f9bd/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import UnoCSS from "file:///C:/Users/20752/Desktop/pay%E9%A1%B9%E7%9B%AE/dax-pay-h5(new)/dax-pay-gateway-ui/node_modules/.pnpm/unocss@0.58.9_postcss@8.4.4_c81a9fa1cd0c97792ef34bfd7b944074/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///C:/Users/20752/Desktop/pay%E9%A1%B9%E7%9B%AE/dax-pay-h5(new)/dax-pay-gateway-ui/node_modules/.pnpm/unplugin-auto-import@0.17.8_ca94883364fa92098ad0fde4d89ffd37/node_modules/unplugin-auto-import/dist/vite.js";
import { viteVConsole } from "file:///C:/Users/20752/Desktop/pay%E9%A1%B9%E7%9B%AE/dax-pay-h5(new)/dax-pay-gateway-ui/node_modules/.pnpm/vite-plugin-vconsole@2.1.1/node_modules/vite-plugin-vconsole/dist/main.mjs";

// build/vite/plugin/html.ts
import { createHtmlPlugin } from "file:///C:/Users/20752/Desktop/pay%E9%A1%B9%E7%9B%AE/dax-pay-h5(new)/dax-pay-gateway-ui/node_modules/.pnpm/vite-plugin-html@3.2.2_vite_b4552cb519d4962e633f4e97be25749c/node_modules/vite-plugin-html/dist/index.mjs";

// package.json
var package_default = {
  name: "daxpay-gateway-ui",
  type: "module",
  version: "3.0.0",
  engines: {
    node: ">=20.6.0",
    pnpm: ">=9.0.2"
  },
  scripts: {
    preinstall: "npx only-allow pnpm",
    bootstrap: "pnpm install",
    serve: "npm run dev",
    dev: "cross-env VITE_CJS_IGNORE_WARNING=true vite dev",
    "dev:debugcjs": "cross-env VITE_CJS_TRACE=true vite dev",
    build: "cross-env NODE_ENV=production vite build && esno ./build/script/postBuild.ts",
    "build:no-cache": "pnpm clean:cache && npm run build",
    report: "cross-env REPORT=true npm run build",
    "type:check": "vue-tsc --noEmit --skipLibCheck",
    preview: "vite preview",
    "clean:cache": "rimraf node_modules/.cache/ && rimraf node_modules/.vite",
    "clean:lib": "rimraf node_modules",
    lint: "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:lint-staged": "lint-staged"
  },
  dependencies: {
    "@types/lodash-es": "^4.17.12",
    "@unocss/reset": "^0.58.9",
    "@vueuse/core": "^10.11.1",
    "vue-qr": "^4.0.9",
    axios: "^1.7.9",
    "date-fns": "^3.6.0",
    "lodash-es": "^4.17.21",
    nprogress: "^0.2.0",
    pinia: "^2.3.0",
    "pinia-plugin-persist": "^1.0.0",
    qs: "^6.13.1",
    vant: "^4.9.10",
    vue: "^3.5.13",
    "vue-qr": "^4.0.9",
    "vue-router": "4.2.5"
  },
  devDependencies: {
    "@antfu/eslint-config": "^2.27.3",
    "@commitlint/cli": "^18.6.1",
    "@commitlint/config-conventional": "^18.6.3",
    "@iconify/json": "^2.2.281",
    "@types/fs-extra": "^11.0.4",
    "@types/mockjs": "^1.0.10",
    "@types/node": "^20.17.9",
    "@types/nprogress": "^0.2.3",
    "@types/qs": "^6.9.17",
    "@unocss/eslint-plugin": "^0.58.9",
    "@unocss/preset-icons": "^0.58.9",
    "@unocss/preset-rem-to-px": "^0.58.9",
    "@unocss/transformer-directives": "^0.58.9",
    "@unocss/transformer-variant-group": "^0.58.9",
    "@vitejs/plugin-vue": "^5.2.1",
    autoprefixer: "^10.4.20",
    "cross-env": "^7.0.3",
    "cz-git": "^1.11.0",
    dotenv: "^16.4.7",
    eslint: "^8.57.1",
    "eslint-plugin-format": "^0.1.3",
    esno: "^0.16.3",
    "fs-extra": "^11.2.0",
    less: "^4.2.1",
    "lint-staged": "^15.2.10",
    "only-allow": "^1.2.1",
    picocolors: "^1.1.1",
    postcss: "^8.4.49",
    "postcss-mobile-forever": "^4.3.1",
    rimraf: "^3.0.2",
    rollup: "^4.28.1",
    "rollup-plugin-visualizer": "^5.12.0",
    "simple-git-hooks": "^2.11.1",
    typescript: "^5.7.2",
    unocss: "^0.58.9",
    "unplugin-auto-import": "^0.17.8",
    "unplugin-vue-components": "^0.26.0",
    vconsole: "^3.15.1",
    vite: "5.4.6",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-html": "^3.2.2",
    "vite-plugin-mock": "^2.9.8",
    "vite-plugin-svg-icons": "^2.0.1",
    "vite-plugin-vconsole": "^2.1.1",
    "vue-tsc": "^1.8.27"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
};

// build/constant.ts
var GLOB_CONFIG_FILE_NAME = "app.config.js";
var OUTPUT_DIR = "dist";

// build/vite/plugin/html.ts
function configHtmlPlugin(env, isBuild) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env;
  const path3 = VITE_PUBLIC_PATH.endsWith("/") ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;
  const getAppConfigSrc = () => {
    return `${path3 || "/"}${GLOB_CONFIG_FILE_NAME}?v=${package_default.version}-${(/* @__PURE__ */ new Date()).getTime()}`;
  };
  const htmlPlugin = createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      // 需要注入 index.html ejs 模版的数据 使用在 html 中 ：<div><%= title %></div>
      data: {
        title: VITE_GLOB_APP_TITLE
      },
      // Embed the generated app.config.js file 需要注入的标签列表
      tags: isBuild ? [
        {
          tag: "script",
          attrs: {
            src: getAppConfigSrc()
          }
        }
      ] : []
    }
  });
  return htmlPlugin;
}

// build/vite/plugin/compress.ts
import compressPlugin from "file:///C:/Users/20752/Desktop/pay%E9%A1%B9%E7%9B%AE/dax-pay-h5(new)/dax-pay-gateway-ui/node_modules/.pnpm/vite-plugin-compression@0.5_5a4b3a5a3b9e04b30a59756485a7566b/node_modules/vite-plugin-compression/dist/index.mjs";
function configCompressPlugin(compress, deleteOriginFile = false) {
  const compressList = compress.split(",");
  const plugins = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      compressPlugin({
        ext: ".gz",
        deleteOriginFile
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      compressPlugin({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile
      })
    );
  }
  return plugins;
}

// build/vite/plugin/visualizer.ts
import visualizer from "file:///C:/Users/20752/Desktop/pay%E9%A1%B9%E7%9B%AE/dax-pay-h5(new)/dax-pay-gateway-ui/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@4.28.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
function configVisualizerConfig() {
  if (isReportMode()) {
    return visualizer({
      filename: "./node_modules/.cache/visualizer/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true
    });
  }
  return [];
}

// build/vite/plugin/svgSprite.ts
import path from "node:path";
import { createSvgIconsPlugin } from "file:///C:/Users/20752/Desktop/pay%E9%A1%B9%E7%9B%AE/dax-pay-h5(new)/dax-pay-gateway-ui/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_71c97d8275404d4ef2d832553781cab9/node_modules/vite-plugin-svg-icons/dist/index.mjs";
function configSvgIconsPlugin(isBuild) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
    // 是否压缩
    svgoOptions: isBuild,
    // 指定symbolId格式
    symbolId: "icon-[dir]-[name]"
  });
  return svgIconsPlugin;
}

// build/vite/plugin/index.ts
function createVitePlugins(viteEnv, isBuild) {
  const { VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
  const vitePlugins = [
    // have to
    vue(),
    viteVConsole({
      entry: path2.resolve("src/main.ts"),
      // 或者可以使用这个配置: [path.resolve('src/main.ts')]
      enabled: viteEnv.VITE_V_CONSOLE,
      // 可自行结合 mode 和 command 进行判断
      config: {
        theme: "dark"
      }
    }),
    // 按需引入VantUi且自动创建组件声明
    Components({
      dts: true,
      resolvers: [VantResolver()],
      types: []
    }),
    // UnoCSS
    UnoCSS(),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/,
        // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/
        // .vue
      ],
      imports: [
        // presets
        "vue",
        "vue-router",
        "pinia",
        "@vueuse/core"
      ],
      dts: "types/auto-imports.d.ts"
    })
  ];
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));
  vitePlugins.push(configVisualizerConfig());
  vitePlugins.push(configSvgIconsPlugin(isBuild));
  if (isBuild) {
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );
  }
  return vitePlugins;
}

// build/vite/proxy.ts
var httpsRE = /^https:\/\//;
function createProxy(list = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path3) => path3.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      // 如果您secure="true"只允许来自 HTTPS 的请求，则secure="false"意味着允许来自 HTTP 和 HTTPS 的请求。
      ...isHttps ? { secure: false } : {}
    };
  }
  return ret;
}

// vite.config.ts
var { dependencies, devDependencies, name, version } = package_default;
function pathResolve(dir) {
  return resolve2(process.cwd(), ".", dir);
}
var __APP_INFO__ = {
  // APP 后台管理信息
  pkg: { dependencies, devDependencies, name, version },
  // 最后编译时间
  lastBuildTime: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd HH:mm:ss")
};
var vite_config_default = ({ command, mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_PORT, VITE_PROXY } = viteEnv;
  const isBuild = command === "build";
  return {
    base: VITE_PUBLIC_PATH,
    root,
    // 别名
    resolve: {
      alias: [
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: `${pathResolve("src")}/`
        },
        // #/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: `${pathResolve("types")}/`
        }
      ],
      dedupe: ["vue"]
    },
    // 定义全局常量替换方式
    define: {
      // 在生产中 启用/禁用 intlify-devtools 和 vue-devtools 支持，默认值 false
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    esbuild: {
      // 使用 esbuild 压缩 剔除 console.log
      drop: VITE_DROP_CONSOLE ? ["debugger", "console"] : []
      // minify: true, // minify: true, 等于 minify: 'esbuild',
    },
    build: {
      // 设置最终构建的浏览器兼容目标
      target: "es2015",
      minify: "esbuild",
      // 构建后是否生成 source map 文件(用于线上报错代码报错映射对应代码)
      sourcemap: false,
      cssTarget: "chrome80",
      // 指定输出路径（相对于 项目根目录)
      outDir: OUTPUT_DIR,
      // 只有 minify 为 terser 的时候, 本配置项才能起作用
      // terserOptions: {
      //   compress: {
      //     // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
      //     keep_infinity: true,
      //     // 打包是否自动删除 console
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // 启用/禁用 gzip 压缩大小报告
      // 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
      reportCompressedSize: true,
      // chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2e3,
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        // 静态资源分类打包
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          // 引入文件名的名称
          entryFileNames: "js/[name]-[hash].js",
          // 包的入口文件名称
          assetFileNames: "[ext]/[name]-[hash].[ext]",
          // 资源文件像 字体，图片等
          // 将 node_modules 三方依赖包最小化拆分
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const paths = id.toString().split("node_modules/");
              if (paths[2]) {
                return paths[2].split("/")[0].toString();
              }
              return paths[1].split("/")[0].toString();
            }
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true,
          // 注入全局 less 变量
          additionalData: `@import "src/styles/var.less";`
        }
      }
    },
    server: {
      host: true,
      // 服务启动时是否自动打开浏览器
      open: false,
      // 服务端口号
      port: Number(VITE_PORT),
      proxy: createProxy(VITE_PROXY),
      // 预热文件以降低启动期间的初始页面加载时长
      warmup: {
        // 预热的客户端文件：首页、views、 components
        clientFiles: ["./index.html", "./src/{views,components}/*"]
      }
      // proxy: {
      //     '/api': {
      //         target: '',
      //         changeOrigin: true,
      //         rewrite: (path) => path.replace(/^\/api/, '/api/v1')
      //     }
      // }
    },
    optimizeDeps: {
      /**
       * 依赖预构建，vite 启动时会将下面 include 里的模块，编译成 esm 格式并缓存到 node_modules/.vite 文件夹，
       * 页面加载到对应模块时如果浏览器有缓存就读取浏览器缓存，如果没有会读取本地缓存并按需加载
       * 尤其当您禁用浏览器缓存时（这种情况只应该发生在调试阶段）必须将对应模块加入到 include 里，
       * 否则会遇到开发环境切换页面卡顿的问题（vite 会认为它是一个新的依赖包会重新加载并强制刷新页面），
       * 因为它既无法使用浏览器缓存，又没有在本地 node_modules/.vite 里缓存
       * 温馨提示：如果你使用的第三方库是全局引入，也就是引入到 src/main.ts 文件里，
       * 就不需要再添加到 include 里了，因为 vite 会自动将它们缓存到 node_modules/.vite
       */
      include: [
        "pinia",
        "lodash-es",
        "axios"
      ],
      // 打包时强制排除的依赖项
      exclude: [
        // https://www.mulingyuer.com/archives/928/
        "vant",
        "@vant/use"
      ]
    },
    // 加载插件
    plugins: createVitePlugins(viteEnv, isBuild)
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvdXRpbHMudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vaW5kZXgudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vaHRtbC50cyIsICJwYWNrYWdlLmpzb24iLCAiYnVpbGQvY29uc3RhbnQudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vY29tcHJlc3MudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vdmlzdWFsaXplci50cyIsICJidWlsZC92aXRlL3BsdWdpbi9zdmdTcHJpdGUudHMiLCAiYnVpbGQvdml0ZS9wcm94eS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDIwNzUyXFxcXERlc2t0b3BcXFxccGF5XHU5ODc5XHU3NkVFXFxcXGRheC1wYXktaDUobmV3KVxcXFxkYXgtcGF5LWdhdGV3YXktdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDIwNzUyXFxcXERlc2t0b3BcXFxccGF5XHU5ODc5XHU3NkVFXFxcXGRheC1wYXktaDUobmV3KVxcXFxkYXgtcGF5LWdhdGV3YXktdWlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzIwNzUyL0Rlc2t0b3AvcGF5JUU5JUExJUI5JUU3JTlCJUFFL2RheC1wYXktaDUobmV3KS9kYXgtcGF5LWdhdGV3YXktdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgdHlwZSB7IENvbmZpZ0VudiwgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucydcclxuaW1wb3J0IHsgd3JhcHBlckVudiB9IGZyb20gJy4vYnVpbGQvdXRpbHMnXHJcbmltcG9ydCB7IGNyZWF0ZVZpdGVQbHVnaW5zIH0gZnJvbSAnLi9idWlsZC92aXRlL3BsdWdpbidcclxuaW1wb3J0IHsgT1VUUFVUX0RJUiB9IGZyb20gJy4vYnVpbGQvY29uc3RhbnQnXHJcbmltcG9ydCB7IGNyZWF0ZVByb3h5IH0gZnJvbSAnLi9idWlsZC92aXRlL3Byb3h5J1xyXG5pbXBvcnQgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJ1xyXG5cclxuY29uc3QgeyBkZXBlbmRlbmNpZXMsIGRldkRlcGVuZGVuY2llcywgbmFtZSwgdmVyc2lvbiB9ID0gcGtnXHJcblxyXG4vLyBcdTVGNTNcdTRGN0ZcdTc1MjhcdTY1ODdcdTRFRjZcdTdDRkJcdTdFREZcdThERUZcdTVGODRcdTc2ODRcdTUyMkJcdTU0MERcdTY1RjZcdUZGMENcdThCRjdcdTU5Q0JcdTdFQzhcdTRGN0ZcdTc1MjhcdTdFRERcdTVCRjlcdThERUZcdTVGODRcdTMwMDJcdTc2RjhcdTVCRjlcdThERUZcdTVGODRcdTc2ODRcdTUyMkJcdTU0MERcdTUwM0NcdTRGMUFcdTUzOUZcdTVDMDFcdTRFMERcdTUyQThcdTU3MzBcdTg4QUJcdTRGN0ZcdTc1MjhcdUZGMENcdTU2RTBcdTZCNjRcdTY1RTBcdTZDRDVcdTg4QUJcdTZCNjNcdTVFMzhcdTg5RTNcdTY3OTBcdTMwMDJcclxuLy8gcGF0aC5yZXNvbHZlICgpIFx1NjVCOVx1NkNENVx1NzUyOFx1NEU4RVx1NUMwNlx1NEUwMFx1N0NGQlx1NTIxN1x1OERFRlx1NUY4NFx1NkJCNVx1ODlFM1x1Njc5MFx1NEUzQVx1N0VERFx1NUJGOVx1OERFRlx1NUY4NFx1MzAwMlx1NUI4M1x1OTAxQVx1OEZDN1x1NTkwNFx1NzQwNlx1NEVDRVx1NTNGM1x1NTIzMFx1NURFNlx1NzY4NFx1OERFRlx1NUY4NFx1NUU4Rlx1NTIxN1x1Njc2NVx1NURFNVx1NEY1Q1x1RkYwQ1x1NTcyOFx1NkJDRlx1NEUyQVx1OERFRlx1NUY4NFx1NEU0Qlx1NTI0RFx1NkRGQlx1NTJBMFx1RkYwQ1x1NzZGNFx1NTIzMFx1NTIxQlx1NUVGQVx1N0VERFx1NUJGOVx1OERFRlx1NUY4NFx1MzAwMlxyXG5mdW5jdGlvbiBwYXRoUmVzb2x2ZShkaXI6IHN0cmluZykge1xyXG4gIHJldHVybiByZXNvbHZlKHByb2Nlc3MuY3dkKCksICcuJywgZGlyKVxyXG59XHJcblxyXG5jb25zdCBfX0FQUF9JTkZPX18gPSB7XHJcbiAgLy8gQVBQIFx1NTQwRVx1NTNGMFx1N0JBMVx1NzQwNlx1NEZFMVx1NjA2RlxyXG4gIHBrZzogeyBkZXBlbmRlbmNpZXMsIGRldkRlcGVuZGVuY2llcywgbmFtZSwgdmVyc2lvbiB9LFxyXG4gIC8vIFx1NjcwMFx1NTQwRVx1N0YxNlx1OEJEMVx1NjVGNlx1OTVGNFxyXG4gIGxhc3RCdWlsZFRpbWU6IGZvcm1hdChuZXcgRGF0ZSgpLCAneXl5eS1NTS1kZCBISDptbTpzcycpLFxyXG59XHJcblxyXG4vKiogQHR5cGUge2ltcG9ydCgndml0ZScpLlVzZXJDb25maWd9ICovXHJcbmV4cG9ydCBkZWZhdWx0ICh7IGNvbW1hbmQsIG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XHJcbiAgLy8gcHJvY2Vzcy5jd2QoKSBcdTY1QjlcdTZDRDVcdThGRDRcdTU2REUgTm9kZS5qcyBcdThGREJcdTdBMEJcdTc2ODRcdTVGNTNcdTUyNERcdTVERTVcdTRGNUNcdTc2RUVcdTVGNTVcclxuICAvLyBtb2RlIFx1OEZENFx1NTZERVx1NUU5NFx1NzUyOFx1NzY4NFx1NzNBRlx1NTg4M1x1NkEyMVx1NUYwRiBkZXZlbG9wbWVudFx1RkYwOFx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1x1RkYwOSBcdTYyMTZcdTgwMDUgcHJvZHVjdGlvblx1RkYwOFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1RkYwOVxyXG4gIC8vIGNvbW1hbmQgXHU4RkQ0XHU1NkRFXHVGRjA4ZGV2L3NlcnZlIFx1NjIxNiBidWlsZFx1RkYwOVx1NTQ3RFx1NEVFNFx1NkEyMVx1NUYwRlx1RkYwQ3lhcm4gZGV2IFx1OEZENFx1NTZERSBkZXYvc2VydmUgeWFybiBidWlsZCBcdThGRDRcdTU2REUgYnVpbGRcclxuICBjb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKVxyXG4gIC8vIGxvYWRFbnYoKSBcdTY4MzlcdTYzNkUgbW9kZSBcdTY4QzBcdTY3RTUgcm9vdChcdTk4NzlcdTc2RUVcdTY4MzlcdThERUZcdTVGODQpIFx1OERFRlx1NUY4NFx1NEUwQiAuZW52XHUzMDAxLmVudi5kZXZlbG9wbWVudCBcdTczQUZcdTU4ODNcdTY1ODdcdTRFRjZcdUZGMENcdThGOTNcdTUxRkEgTk9ERV9FTlYgXHU1NDhDIFZJVEVfIFx1NUYwMFx1NTkzNFx1NzY4NFx1OTUyRVx1NTAzQ1x1OTYxRlxyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcm9vdClcclxuICAvLyBcdThCRkJcdTUzRDZcdTVFNzZcdTU5MDRcdTc0MDZcdTYyNDBcdTY3MDlcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjYgLmVudlxyXG4gIGNvbnN0IHZpdGVFbnYgPSB3cmFwcGVyRW52KGVudilcclxuXHJcbiAgY29uc3QgeyBWSVRFX1BVQkxJQ19QQVRILCBWSVRFX0RST1BfQ09OU09MRSwgVklURV9QT1JULCBWSVRFX1BST1hZIH1cclxuICAgID0gdml0ZUVudlxyXG5cclxuICBjb25zdCBpc0J1aWxkID0gY29tbWFuZCA9PT0gJ2J1aWxkJ1xyXG4gIC8vIGNvbW1hbmQgPT09ICdidWlsZCdcclxuICByZXR1cm4ge1xyXG4gICAgYmFzZTogVklURV9QVUJMSUNfUEFUSCxcclxuICAgIHJvb3QsXHJcblxyXG4gICAgLy8gXHU1MjJCXHU1NDBEXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiBbXHJcbiAgICAgICAgLy8gQC94eHh4ID0+IHNyYy94eHh4XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmluZDogL0BcXC8vLFxyXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IGAke3BhdGhSZXNvbHZlKCdzcmMnKX0vYCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vICMveHh4eCA9PiB0eXBlcy94eHh4XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmluZDogLyNcXC8vLFxyXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IGAke3BhdGhSZXNvbHZlKCd0eXBlcycpfS9gLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIGRlZHVwZTogWyd2dWUnXSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gXHU1QjlBXHU0RTQ5XHU1MTY4XHU1QzQwXHU1RTM4XHU5MUNGXHU2NkZGXHU2MzYyXHU2NUI5XHU1RjBGXHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgLy8gXHU1NzI4XHU3NTFGXHU0RUE3XHU0RTJEIFx1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjggaW50bGlmeS1kZXZ0b29scyBcdTU0OEMgdnVlLWRldnRvb2xzIFx1NjUyRlx1NjMwMVx1RkYwQ1x1OUVEOFx1OEJBNFx1NTAzQyBmYWxzZVxyXG4gICAgICBfX0lOVExJRllfUFJPRF9ERVZUT09MU19fOiBmYWxzZSxcclxuICAgICAgX19BUFBfSU5GT19fOiBKU09OLnN0cmluZ2lmeShfX0FQUF9JTkZPX18pLFxyXG4gICAgfSxcclxuXHJcbiAgICBlc2J1aWxkOiB7XHJcbiAgICAgIC8vIFx1NEY3Rlx1NzUyOCBlc2J1aWxkIFx1NTM4Qlx1N0YyOSBcdTUyNTRcdTk2NjQgY29uc29sZS5sb2dcclxuICAgICAgZHJvcDogVklURV9EUk9QX0NPTlNPTEUgPyBbJ2RlYnVnZ2VyJywgJ2NvbnNvbGUnXSA6IFtdLFxyXG4gICAgICAvLyBtaW5pZnk6IHRydWUsIC8vIG1pbmlmeTogdHJ1ZSwgXHU3QjQ5XHU0RThFIG1pbmlmeTogJ2VzYnVpbGQnLFxyXG4gICAgfSxcclxuXHJcbiAgICBidWlsZDoge1xyXG4gICAgICAvLyBcdThCQkVcdTdGNkVcdTY3MDBcdTdFQzhcdTY3ODRcdTVFRkFcdTc2ODRcdTZENEZcdTg5QzhcdTU2NjhcdTUxN0NcdTVCQjlcdTc2RUVcdTY4MDdcclxuICAgICAgdGFyZ2V0OiAnZXMyMDE1JyxcclxuICAgICAgbWluaWZ5OiAnZXNidWlsZCcsXHJcbiAgICAgIC8vIFx1Njc4NFx1NUVGQVx1NTQwRVx1NjYyRlx1NTQyNlx1NzUxRlx1NjIxMCBzb3VyY2UgbWFwIFx1NjU4N1x1NEVGNihcdTc1MjhcdTRFOEVcdTdFQkZcdTRFMEFcdTYyQTVcdTk1MTlcdTRFRTNcdTc4MDFcdTYyQTVcdTk1MTlcdTY2MjBcdTVDMDRcdTVCRjlcdTVFOTRcdTRFRTNcdTc4MDEpXHJcbiAgICAgIHNvdXJjZW1hcDogZmFsc2UsXHJcbiAgICAgIGNzc1RhcmdldDogJ2Nocm9tZTgwJyxcclxuICAgICAgLy8gXHU2MzA3XHU1QjlBXHU4RjkzXHU1MUZBXHU4REVGXHU1Rjg0XHVGRjA4XHU3NkY4XHU1QkY5XHU0RThFIFx1OTg3OVx1NzZFRVx1NjgzOVx1NzZFRVx1NUY1NSlcclxuICAgICAgb3V0RGlyOiBPVVRQVVRfRElSLFxyXG4gICAgICAvLyBcdTUzRUFcdTY3MDkgbWluaWZ5IFx1NEUzQSB0ZXJzZXIgXHU3Njg0XHU2NUY2XHU1MDE5LCBcdTY3MkNcdTkxNERcdTdGNkVcdTk4NzlcdTYyNERcdTgwRkRcdThENzdcdTRGNUNcdTc1MjhcclxuICAgICAgLy8gdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICAvLyAgIGNvbXByZXNzOiB7XHJcbiAgICAgIC8vICAgICAvLyBcdTk2MzJcdTZCNjIgSW5maW5pdHkgXHU4OEFCXHU1MzhCXHU3RjI5XHU2MjEwIDEvMFx1RkYwQ1x1OEZEOVx1NTNFRlx1ODBGRFx1NEYxQVx1NUJGQ1x1ODFGNCBDaHJvbWUgXHU0RTBBXHU3Njg0XHU2MDI3XHU4MEZEXHU5NUVFXHU5ODk4XHJcbiAgICAgIC8vICAgICBrZWVwX2luZmluaXR5OiB0cnVlLFxyXG4gICAgICAvLyAgICAgLy8gXHU2MjUzXHU1MzA1XHU2NjJGXHU1NDI2XHU4MUVBXHU1MkE4XHU1MjIwXHU5NjY0IGNvbnNvbGVcclxuICAgICAgLy8gICAgIGRyb3BfY29uc29sZTogVklURV9EUk9QX0NPTlNPTEUsXHJcbiAgICAgIC8vICAgfSxcclxuICAgICAgLy8gfSxcclxuICAgICAgLy8gXHU1NDJGXHU3NTI4L1x1Nzk4MVx1NzUyOCBnemlwIFx1NTM4Qlx1N0YyOVx1NTkyN1x1NUMwRlx1NjJBNVx1NTQ0QVxyXG4gICAgICAvLyBcdTUzOEJcdTdGMjlcdTU5MjdcdTU3OEJcdThGOTNcdTUxRkFcdTY1ODdcdTRFRjZcdTUzRUZcdTgwRkRcdTRGMUFcdTVGODhcdTYxNjJcdUZGMENcdTU2RTBcdTZCNjRcdTc5ODFcdTc1MjhcdThCRTVcdTUyOUZcdTgwRkRcdTUzRUZcdTgwRkRcdTRGMUFcdTYzRDBcdTlBRDhcdTU5MjdcdTU3OEJcdTk4NzlcdTc2RUVcdTc2ODRcdTY3ODRcdTVFRkFcdTYwMjdcdTgwRkRcclxuICAgICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IHRydWUsXHJcbiAgICAgIC8vIGNodW5rIFx1NTkyN1x1NUMwRlx1OEI2Nlx1NTQ0QVx1NzY4NFx1OTY1MFx1NTIzNlx1RkYwOFx1NEVFNSBrYnMgXHU0RTNBXHU1MzU1XHU0RjREXHVGRjA5XHJcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMjAwMCxcclxuICAgICAgLy8gXHU4MUVBXHU1QjlBXHU0RTQ5XHU1RTk1XHU1QzQyXHU3Njg0IFJvbGx1cCBcdTYyNTNcdTUzMDVcdTkxNERcdTdGNkVcclxuICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIC8vIFx1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFx1NTIwNlx1N0M3Qlx1NjI1M1x1NTMwNVxyXG4gICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdqcy9bbmFtZV0tW2hhc2hdLmpzJywgLy8gXHU1RjE1XHU1MTY1XHU2NTg3XHU0RUY2XHU1NDBEXHU3Njg0XHU1NDBEXHU3OUYwXHJcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLCAvLyBcdTUzMDVcdTc2ODRcdTUxNjVcdTUzRTNcdTY1ODdcdTRFRjZcdTU0MERcdTc5RjBcclxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XScsIC8vIFx1OEQ0NFx1NkU5MFx1NjU4N1x1NEVGNlx1NTBDRiBcdTVCNTdcdTRGNTNcdUZGMENcdTU2RkVcdTcyNDdcdTdCNDlcclxuICAgICAgICAgIC8vIFx1NUMwNiBub2RlX21vZHVsZXMgXHU0RTA5XHU2NUI5XHU0RjlEXHU4RDU2XHU1MzA1XHU2NzAwXHU1QzBGXHU1MzE2XHU2MkM2XHU1MjA2XHJcbiAgICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHBhdGhzID0gaWQudG9TdHJpbmcoKS5zcGxpdCgnbm9kZV9tb2R1bGVzLycpXHJcbiAgICAgICAgICAgICAgaWYgKHBhdGhzWzJdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0aHNbMl0uc3BsaXQoJy8nKVswXS50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICByZXR1cm4gcGF0aHNbMV0uc3BsaXQoJy8nKVswXS50b1N0cmluZygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBsZXNzOiB7XHJcbiAgICAgICAgICBtb2RpZnlWYXJzOiB7fSxcclxuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgLy8gXHU2Q0U4XHU1MTY1XHU1MTY4XHU1QzQwIGxlc3MgXHU1M0Q4XHU5MUNGXHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCJzcmMvc3R5bGVzL3Zhci5sZXNzXCI7YCxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaG9zdDogdHJ1ZSxcclxuICAgICAgLy8gXHU2NzBEXHU1MkExXHU1NDJGXHU1MkE4XHU2NUY2XHU2NjJGXHU1NDI2XHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU2RDRGXHU4OUM4XHU1NjY4XHJcbiAgICAgIG9wZW46IGZhbHNlLFxyXG4gICAgICAvLyBcdTY3MERcdTUyQTFcdTdBRUZcdTUzRTNcdTUzRjdcclxuICAgICAgcG9ydDogTnVtYmVyKFZJVEVfUE9SVCksXHJcbiAgICAgIHByb3h5OiBjcmVhdGVQcm94eShWSVRFX1BST1hZKSxcclxuICAgICAgLy8gXHU5ODg0XHU3MEVEXHU2NTg3XHU0RUY2XHU0RUU1XHU5NjREXHU0RjRFXHU1NDJGXHU1MkE4XHU2NzFGXHU5NUY0XHU3Njg0XHU1MjFEXHU1OUNCXHU5ODc1XHU5NzYyXHU1MkEwXHU4RjdEXHU2NUY2XHU5NTdGXHJcbiAgICAgIHdhcm11cDoge1xyXG4gICAgICAgIC8vIFx1OTg4NFx1NzBFRFx1NzY4NFx1NUJBMlx1NjIzN1x1N0FFRlx1NjU4N1x1NEVGNlx1RkYxQVx1OTk5Nlx1OTg3NVx1MzAwMXZpZXdzXHUzMDAxIGNvbXBvbmVudHNcclxuICAgICAgICBjbGllbnRGaWxlczogWycuL2luZGV4Lmh0bWwnLCAnLi9zcmMve3ZpZXdzLGNvbXBvbmVudHN9LyonXSxcclxuICAgICAgfSxcclxuICAgICAgLy8gcHJveHk6IHtcclxuICAgICAgLy8gICAgICcvYXBpJzoge1xyXG4gICAgICAvLyAgICAgICAgIHRhcmdldDogJycsXHJcbiAgICAgIC8vICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAvLyAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnL2FwaS92MScpXHJcbiAgICAgIC8vICAgICB9XHJcbiAgICAgIC8vIH1cclxuICAgIH0sXHJcblxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBcdTRGOURcdThENTZcdTk4ODRcdTY3ODRcdTVFRkFcdUZGMEN2aXRlIFx1NTQyRlx1NTJBOFx1NjVGNlx1NEYxQVx1NUMwNlx1NEUwQlx1OTc2MiBpbmNsdWRlIFx1OTFDQ1x1NzY4NFx1NkEyMVx1NTc1N1x1RkYwQ1x1N0YxNlx1OEJEMVx1NjIxMCBlc20gXHU2ODNDXHU1RjBGXHU1RTc2XHU3RjEzXHU1QjU4XHU1MjMwIG5vZGVfbW9kdWxlcy8udml0ZSBcdTY1ODdcdTRFRjZcdTU5MzlcdUZGMENcclxuICAgICAgICogXHU5ODc1XHU5NzYyXHU1MkEwXHU4RjdEXHU1MjMwXHU1QkY5XHU1RTk0XHU2QTIxXHU1NzU3XHU2NUY2XHU1OTgyXHU2NzlDXHU2RDRGXHU4OUM4XHU1NjY4XHU2NzA5XHU3RjEzXHU1QjU4XHU1QzMxXHU4QkZCXHU1M0Q2XHU2RDRGXHU4OUM4XHU1NjY4XHU3RjEzXHU1QjU4XHVGRjBDXHU1OTgyXHU2NzlDXHU2Q0ExXHU2NzA5XHU0RjFBXHU4QkZCXHU1M0Q2XHU2NzJDXHU1NzMwXHU3RjEzXHU1QjU4XHU1RTc2XHU2MzA5XHU5NzAwXHU1MkEwXHU4RjdEXHJcbiAgICAgICAqIFx1NUMyNFx1NTE3Nlx1NUY1M1x1NjBBOFx1Nzk4MVx1NzUyOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1N0YxM1x1NUI1OFx1NjVGNlx1RkYwOFx1OEZEOVx1NzlDRFx1NjBDNVx1NTFCNVx1NTNFQVx1NUU5NFx1OEJFNVx1NTNEMVx1NzUxRlx1NTcyOFx1OEMwM1x1OEJENVx1OTYzNlx1NkJCNVx1RkYwOVx1NUZDNVx1OTg3Qlx1NUMwNlx1NUJGOVx1NUU5NFx1NkEyMVx1NTc1N1x1NTJBMFx1NTE2NVx1NTIzMCBpbmNsdWRlIFx1OTFDQ1x1RkYwQ1xyXG4gICAgICAgKiBcdTU0MjZcdTUyMTlcdTRGMUFcdTkwNDdcdTUyMzBcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdTUyMDdcdTYzNjJcdTk4NzVcdTk3NjJcdTUzNjFcdTk4N0ZcdTc2ODRcdTk1RUVcdTk4OThcdUZGMDh2aXRlIFx1NEYxQVx1OEJBNFx1NEUzQVx1NUI4M1x1NjYyRlx1NEUwMFx1NEUyQVx1NjVCMFx1NzY4NFx1NEY5RFx1OEQ1Nlx1NTMwNVx1NEYxQVx1OTFDRFx1NjVCMFx1NTJBMFx1OEY3RFx1NUU3Nlx1NUYzQVx1NTIzNlx1NTIzN1x1NjVCMFx1OTg3NVx1OTc2Mlx1RkYwOVx1RkYwQ1xyXG4gICAgICAgKiBcdTU2RTBcdTRFM0FcdTVCODNcdTY1RTJcdTY1RTBcdTZDRDVcdTRGN0ZcdTc1MjhcdTZENEZcdTg5QzhcdTU2NjhcdTdGMTNcdTVCNThcdUZGMENcdTUzQzhcdTZDQTFcdTY3MDlcdTU3MjhcdTY3MkNcdTU3MzAgbm9kZV9tb2R1bGVzLy52aXRlIFx1OTFDQ1x1N0YxM1x1NUI1OFxyXG4gICAgICAgKiBcdTZFMjlcdTk5QThcdTYzRDBcdTc5M0FcdUZGMUFcdTU5ODJcdTY3OUNcdTRGNjBcdTRGN0ZcdTc1MjhcdTc2ODRcdTdCMkNcdTRFMDlcdTY1QjlcdTVFOTNcdTY2MkZcdTUxNjhcdTVDNDBcdTVGMTVcdTUxNjVcdUZGMENcdTRFNUZcdTVDMzFcdTY2MkZcdTVGMTVcdTUxNjVcdTUyMzAgc3JjL21haW4udHMgXHU2NTg3XHU0RUY2XHU5MUNDXHVGRjBDXHJcbiAgICAgICAqIFx1NUMzMVx1NEUwRFx1OTcwMFx1ODk4MVx1NTE4RFx1NkRGQlx1NTJBMFx1NTIzMCBpbmNsdWRlIFx1OTFDQ1x1NEU4Nlx1RkYwQ1x1NTZFMFx1NEUzQSB2aXRlIFx1NEYxQVx1ODFFQVx1NTJBOFx1NUMwNlx1NUI4M1x1NEVFQ1x1N0YxM1x1NUI1OFx1NTIzMCBub2RlX21vZHVsZXMvLnZpdGVcclxuICAgICAgICovXHJcbiAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAncGluaWEnLFxyXG4gICAgICAgICdsb2Rhc2gtZXMnLFxyXG4gICAgICAgICdheGlvcycsXHJcbiAgICAgIF0sXHJcbiAgICAgIC8vIFx1NjI1M1x1NTMwNVx1NjVGNlx1NUYzQVx1NTIzNlx1NjM5Mlx1OTY2NFx1NzY4NFx1NEY5RFx1OEQ1Nlx1OTg3OVxyXG4gICAgICBleGNsdWRlOiBbXHJcbiAgICAgICAgLy8gaHR0cHM6Ly93d3cubXVsaW5neXVlci5jb20vYXJjaGl2ZXMvOTI4L1xyXG4gICAgICAgICd2YW50JyxcclxuICAgICAgICAnQHZhbnQvdXNlJyxcclxuICAgICAgXSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gXHU1MkEwXHU4RjdEXHU2M0QyXHU0RUY2XHJcbiAgICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2lucyh2aXRlRW52LCBpc0J1aWxkKSxcclxuICB9XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyMDc1MlxcXFxEZXNrdG9wXFxcXHBheVx1OTg3OVx1NzZFRVxcXFxkYXgtcGF5LWg1KG5ldylcXFxcZGF4LXBheS1nYXRld2F5LXVpXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyMDc1MlxcXFxEZXNrdG9wXFxcXHBheVx1OTg3OVx1NzZFRVxcXFxkYXgtcGF5LWg1KG5ldylcXFxcZGF4LXBheS1nYXRld2F5LXVpXFxcXGJ1aWxkXFxcXHV0aWxzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8yMDc1Mi9EZXNrdG9wL3BheSVFOSVBMSVCOSVFNyU5QiVBRS9kYXgtcGF5LWg1KG5ldykvZGF4LXBheS1nYXRld2F5LXVpL2J1aWxkL3V0aWxzLnRzXCI7aW1wb3J0IGZzIGZyb20gJ25vZGU6ZnMnXHJcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcclxuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNEZXZGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICByZXR1cm4gbW9kZSA9PT0gJ2RldmVsb3BtZW50J1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9kRm4obW9kZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIG1vZGUgPT09ICdwcm9kdWN0aW9uJ1xyXG59XHJcblxyXG4vKipcclxuICogV2hldGhlciB0byBnZW5lcmF0ZSBwYWNrYWdlIHByZXZpZXdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1JlcG9ydE1vZGUoKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHByb2Nlc3MuZW52LlJFUE9SVCA9PT0gJ3RydWUnXHJcbn1cclxuXHJcbi8vIFJlYWQgYWxsIGVudmlyb25tZW50IHZhcmlhYmxlIGNvbmZpZ3VyYXRpb24gZmlsZXMgdG8gcHJvY2Vzcy5lbnZcclxuLy8gXHU4QkZCXHU1M0Q2XHU1RTc2XHU1OTA0XHU3NDA2XHU2MjQwXHU2NzA5XHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2IC5lbnZcclxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBwZXJFbnYoZW52Q29uZjogUmVjb3JkYWJsZSk6IFZpdGVFbnYge1xyXG4gIGNvbnN0IHJldDogYW55ID0ge31cclxuXHJcbiAgZm9yIChjb25zdCBlbnZOYW1lIG9mIE9iamVjdC5rZXlzKGVudkNvbmYpKSB7XHJcbiAgICAvLyBcdTUzQkJcdTk2NjRcdTdBN0FcdTY4M0NcclxuICAgIGxldCByZWFsTmFtZSA9IGVudkNvbmZbZW52TmFtZV0ucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpXHJcbiAgICByZWFsTmFtZSA9IHJlYWxOYW1lID09PSAndHJ1ZScgPyB0cnVlIDogcmVhbE5hbWUgPT09ICdmYWxzZScgPyBmYWxzZSA6IHJlYWxOYW1lXHJcblxyXG4gICAgaWYgKGVudk5hbWUgPT09ICdWSVRFX1BPUlQnKSB7XHJcbiAgICAgIHJlYWxOYW1lID0gTnVtYmVyKHJlYWxOYW1lKVxyXG4gICAgfVxyXG4gICAgaWYgKGVudk5hbWUgPT09ICdWSVRFX1BST1hZJykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJlYWxOYW1lID0gSlNPTi5wYXJzZShyZWFsTmFtZSlcclxuICAgICAgfVxyXG4gICAgICBjYXRjaCAoZXJyb3IpIHt9XHJcbiAgICB9XHJcbiAgICByZXRbZW52TmFtZV0gPSByZWFsTmFtZVxyXG4gICAgcHJvY2Vzcy5lbnZbZW52TmFtZV0gPSByZWFsTmFtZVxyXG4gIH1cclxuICByZXR1cm4gcmV0XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGVudmlyb25tZW50IHZhcmlhYmxlcyBzdGFydGluZyB3aXRoIHRoZSBzcGVjaWZpZWQgcHJlZml4XHJcbiAqIEBwYXJhbSBtYXRjaCBwcmVmaXhcclxuICogQHBhcmFtIGNvbmZGaWxlcyBleHRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnZDb25maWcobWF0Y2ggPSAnVklURV9HTE9CXycsIGNvbmZGaWxlcyA9IFsnLmVudicsICcuZW52LnByb2R1Y3Rpb24nXSkge1xyXG4gIGxldCBlbnZDb25maWcgPSB7fVxyXG4gIGNvbmZGaWxlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBlbnYgPSBkb3RlbnYucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBpdGVtKSkpXHJcbiAgICAgIGVudkNvbmZpZyA9IHsgLi4uZW52Q29uZmlnLCAuLi5lbnYgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7fVxyXG4gIH0pXHJcblxyXG4gIE9iamVjdC5rZXlzKGVudkNvbmZpZykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKGBeKCR7bWF0Y2h9KWApXHJcbiAgICBpZiAoIXJlZy50ZXN0KGtleSkpIHtcclxuICAgICAgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShlbnZDb25maWcsIGtleSlcclxuICAgIH1cclxuICB9KVxyXG4gIHJldHVybiBlbnZDb25maWdcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB1c2VyIHJvb3QgZGlyZWN0b3J5XHJcbiAqIEBwYXJhbSBkaXIgZmlsZSBwYXRoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9vdFBhdGgoLi4uZGlyOiBzdHJpbmdbXSkge1xyXG4gIHJldHVybiBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgLi4uZGlyKVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMjA3NTJcXFxcRGVza3RvcFxcXFxwYXlcdTk4NzlcdTc2RUVcXFxcZGF4LXBheS1oNShuZXcpXFxcXGRheC1wYXktZ2F0ZXdheS11aVxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMjA3NTJcXFxcRGVza3RvcFxcXFxwYXlcdTk4NzlcdTc2RUVcXFxcZGF4LXBheS1oNShuZXcpXFxcXGRheC1wYXktZ2F0ZXdheS11aVxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblxcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvMjA3NTIvRGVza3RvcC9wYXklRTklQTElQjklRTclOUIlQUUvZGF4LXBheS1oNShuZXcpL2RheC1wYXktZ2F0ZXdheS11aS9idWlsZC92aXRlL3BsdWdpbi9pbmRleC50c1wiO2ltcG9ydCAqIGFzIHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgdHlwZSB7IFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IFZhbnRSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCB7IHZpdGVWQ29uc29sZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXZjb25zb2xlJ1xyXG5pbXBvcnQgeyBjb25maWdIdG1sUGx1Z2luIH0gZnJvbSAnLi9odG1sJ1xyXG5pbXBvcnQgeyBjb25maWdDb21wcmVzc1BsdWdpbiB9IGZyb20gJy4vY29tcHJlc3MnXHJcbmltcG9ydCB7IGNvbmZpZ1Zpc3VhbGl6ZXJDb25maWcgfSBmcm9tICcuL3Zpc3VhbGl6ZXInXHJcbmltcG9ydCB7IGNvbmZpZ1N2Z0ljb25zUGx1Z2luIH0gZnJvbSAnLi9zdmdTcHJpdGUnXHJcbi8qKlxyXG4gKiBcdTkxNERcdTdGNkUgdml0ZSBcdTYzRDJcdTRFRjZcclxuICogQHBhcmFtIHZpdGVFbnYgdml0ZSBcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjZcdTk1MkVcdTUwM0NcdTk2MUYgb2JqZWN0XHJcbiAqIEBwYXJhbSBpc0J1aWxkIFx1NjYyRlx1NTQyNlx1NjYyRiBidWlsZCBcdTczQUZcdTU4ODMgdHJ1ZS9mYWxzZVxyXG4gKiBAcmV0dXJucyB2aXRlUGx1Z2luc1tdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVml0ZVBsdWdpbnModml0ZUVudjogVml0ZUVudiwgaXNCdWlsZDogYm9vbGVhbikge1xyXG4gIC8vIFZJVEVfQlVJTERfQ09NUFJFU1MgXHU2NjJGXHU1NDI2XHU1NDJGXHU3NTI4IGd6aXAgXHU1MzhCXHU3RjI5XHU2MjE2IGJyb3RsaSBcdTUzOEJcdTdGMjlcclxuICAvLyBcdTUzRUZcdTkwMDk6IGd6aXAgfCBicm90bGkgfCBub25lXHVGRjBDXHJcbiAgLy8gXHU1OTgyXHU2NzlDXHU0RjYwXHU5NzAwXHU4OTgxXHU1OTFBXHU3OUNEXHU1RjYyXHU1RjBGXHVGRjBDXHU0RjYwXHU1M0VGXHU0RUU1XHU3NTI4JywnXHU2NzY1XHU1MjA2XHU5Njk0XHJcblxyXG4gIC8vIFZJVEVfQlVJTERfQ09NUFJFU1NfREVMRVRFX09SSUdJTl9GSUxFIFx1NjI1M1x1NTMwNVx1NEY3Rlx1NzUyOFx1NTM4Qlx1N0YyOVx1NjVGNlx1NjYyRlx1NTQyNlx1NTIyMFx1OTY2NFx1NTM5Rlx1NTlDQlx1NjU4N1x1NEVGNlx1RkYwQ1x1OUVEOFx1OEJBNFx1NEUzQSBmYWxzZVxyXG4gIGNvbnN0IHsgVklURV9CVUlMRF9DT01QUkVTUywgVklURV9CVUlMRF9DT01QUkVTU19ERUxFVEVfT1JJR0lOX0ZJTEUgfSA9IHZpdGVFbnZcclxuXHJcbiAgY29uc3Qgdml0ZVBsdWdpbnM6IChQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSlbXSA9IFtcclxuICAgIC8vIGhhdmUgdG9cclxuICAgIHZ1ZSgpLFxyXG4gICAgdml0ZVZDb25zb2xlKHtcclxuICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZSgnc3JjL21haW4udHMnKSwgLy8gXHU2MjE2XHU4MDA1XHU1M0VGXHU0RUU1XHU0RjdGXHU3NTI4XHU4RkQ5XHU0RTJBXHU5MTREXHU3RjZFOiBbcGF0aC5yZXNvbHZlKCdzcmMvbWFpbi50cycpXVxyXG4gICAgICBlbmFibGVkOiB2aXRlRW52LlZJVEVfVl9DT05TT0xFLCAvLyBcdTUzRUZcdTgxRUFcdTg4NENcdTdFRDNcdTU0MDggbW9kZSBcdTU0OEMgY29tbWFuZCBcdThGREJcdTg4NENcdTUyMjRcdTY1QURcclxuICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgdGhlbWU6ICdkYXJrJyxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gICAgLy8gXHU2MzA5XHU5NzAwXHU1RjE1XHU1MTY1VmFudFVpXHU0RTE0XHU4MUVBXHU1MkE4XHU1MjFCXHU1RUZBXHU3RUM0XHU0RUY2XHU1OEYwXHU2NjBFXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgZHRzOiB0cnVlLFxyXG4gICAgICByZXNvbHZlcnM6IFtWYW50UmVzb2x2ZXIoKV0sXHJcbiAgICAgIHR5cGVzOiBbXSxcclxuICAgIH0pLFxyXG4gICAgLy8gVW5vQ1NTXHJcbiAgICBVbm9DU1MoKSxcclxuXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgLy8gdGFyZ2V0cyB0byB0cmFuc2Zvcm1cclxuICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgIC9cXC5bdGpdc3g/JC8sIC8vIC50cywgLnRzeCwgLmpzLCAuanN4XHJcbiAgICAgICAgL1xcLnZ1ZSQvLFxyXG4gICAgICAgIC9cXC52dWVcXD92dWUvLCAvLyAudnVlXHJcbiAgICAgIF0sXHJcbiAgICAgIGltcG9ydHM6IFtcclxuICAgICAgICAvLyBwcmVzZXRzXHJcbiAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxyXG4gICAgICAgICdwaW5pYScsXHJcbiAgICAgICAgJ0B2dWV1c2UvY29yZScsXHJcbiAgICAgIF0sXHJcbiAgICAgIGR0czogJ3R5cGVzL2F1dG8taW1wb3J0cy5kLnRzJyxcclxuICAgIH0pLFxyXG4gIF1cclxuXHJcbiAgLy8gXHU1MkEwXHU4RjdEIGh0bWwgXHU2M0QyXHU0RUY2IHZpdGUtcGx1Z2luLWh0bWxcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNvbmZpZ0h0bWxQbHVnaW4odml0ZUVudiwgaXNCdWlsZCkpXHJcblxyXG4gIC8vIHJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclxyXG4gIHZpdGVQbHVnaW5zLnB1c2goY29uZmlnVmlzdWFsaXplckNvbmZpZygpKVxyXG5cclxuICAvLyB2aXRlLXBsdWdpbi1zdmctaWNvbnNcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNvbmZpZ1N2Z0ljb25zUGx1Z2luKGlzQnVpbGQpKVxyXG5cclxuICBpZiAoaXNCdWlsZCkge1xyXG4gICAgLy8gcm9sbHVwLXBsdWdpbi1nemlwXHJcbiAgICAvLyBcdTUyQTBcdThGN0QgZ3ppcCBcdTYyNTNcdTUzMDVcclxuICAgIHZpdGVQbHVnaW5zLnB1c2goXHJcbiAgICAgIGNvbmZpZ0NvbXByZXNzUGx1Z2luKFZJVEVfQlVJTERfQ09NUFJFU1MsIFZJVEVfQlVJTERfQ09NUFJFU1NfREVMRVRFX09SSUdJTl9GSUxFKSxcclxuICAgIClcclxuICB9XHJcblxyXG4gIHJldHVybiB2aXRlUGx1Z2luc1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMjA3NTJcXFxcRGVza3RvcFxcXFxwYXlcdTk4NzlcdTc2RUVcXFxcZGF4LXBheS1oNShuZXcpXFxcXGRheC1wYXktZ2F0ZXdheS11aVxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMjA3NTJcXFxcRGVza3RvcFxcXFxwYXlcdTk4NzlcdTc2RUVcXFxcZGF4LXBheS1oNShuZXcpXFxcXGRheC1wYXktZ2F0ZXdheS11aVxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblxcXFxodG1sLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8yMDc1Mi9EZXNrdG9wL3BheSVFOSVBMSVCOSVFNyU5QiVBRS9kYXgtcGF5LWg1KG5ldykvZGF4LXBheS1nYXRld2F5LXVpL2J1aWxkL3ZpdGUvcGx1Z2luL2h0bWwudHNcIjsvKipcclxuICogUGx1Z2luIHRvIG1pbmltaXplIGFuZCB1c2UgZWpzIHRlbXBsYXRlIHN5bnRheCBpbiBpbmRleC5odG1sLlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5uY3diL3ZpdGUtcGx1Z2luLWh0bWxcclxuICovXHJcbmltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnXHJcbmltcG9ydCBwa2cgZnJvbSAnLi4vLi4vLi4vcGFja2FnZS5qc29uJ1xyXG5pbXBvcnQgeyBHTE9CX0NPTkZJR19GSUxFX05BTUUgfSBmcm9tICcuLi8uLi9jb25zdGFudCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWdIdG1sUGx1Z2luKGVudjogVml0ZUVudiwgaXNCdWlsZDogYm9vbGVhbikge1xyXG4gIGNvbnN0IHsgVklURV9HTE9CX0FQUF9USVRMRSwgVklURV9QVUJMSUNfUEFUSCB9ID0gZW52XHJcblxyXG4gIGNvbnN0IHBhdGggPSBWSVRFX1BVQkxJQ19QQVRILmVuZHNXaXRoKCcvJykgPyBWSVRFX1BVQkxJQ19QQVRIIDogYCR7VklURV9QVUJMSUNfUEFUSH0vYFxyXG5cclxuICBjb25zdCBnZXRBcHBDb25maWdTcmMgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gYCR7cGF0aCB8fCAnLyd9JHtHTE9CX0NPTkZJR19GSUxFX05BTUV9P3Y9JHtwa2cudmVyc2lvbn0tJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1gXHJcbiAgfVxyXG5cclxuICAvLyBcdTVGNTNcdTYyNjdcdTg4NEMgeWFybiBidWlsZCBcdTY3ODRcdTVFRkFcdTk4NzlcdTc2RUVcdTRFNEJcdTU0MEVcdUZGMENcdTRGMUFcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTAgX2FwcC5jb25maWcuanMgXHU2NTg3XHU0RUY2XHU1RTc2XHU2M0QyXHU1MTY1IGluZGV4Lmh0bWxcclxuICAvLyBfYXBwLmNvbmZpZy5qcyBcdTc1MjhcdTRFOEVcdTk4NzlcdTc2RUVcdTU3MjhcdTYyNTNcdTUzMDVcdTU0MEVcdUZGMENcdTk3MDBcdTg5ODFcdTUyQThcdTYwMDFcdTRGRUVcdTY1MzlcdTkxNERcdTdGNkVcdTc2ODRcdTk3MDBcdTZDNDJcdUZGMENcdTU5ODJcdTYzQTVcdTUzRTNcdTU3MzBcdTU3NDBcclxuICAvLyBcdTRFMERcdTc1MjhcdTkxQ0RcdTY1QjBcdThGREJcdTg4NENcdTYyNTNcdTUzMDVcdUZGMENcdTUzRUZcdTU3MjhcdTYyNTNcdTUzMDVcdTU0MEVcdTRGRUVcdTY1MzkgL2Rpc3QvX2FwcC5jb25maWcuanMgXHU1MTg1XHU3Njg0XHU1M0Q4XHU5MUNGXHVGRjBDXHU1MjM3XHU2NUIwXHU1MzczXHU1M0VGXHU2NkY0XHU2NUIwXHU0RUUzXHU3ODAxXHU1MTg1XHU3Njg0XHU1QzQwXHU5MEU4XHU1M0Q4XHU5MUNGXHJcblxyXG4gIGNvbnN0IGh0bWxQbHVnaW46IFBsdWdpbk9wdGlvbltdID0gY3JlYXRlSHRtbFBsdWdpbih7XHJcbiAgICBtaW5pZnk6IGlzQnVpbGQsXHJcbiAgICBpbmplY3Q6IHtcclxuICAgICAgLy8gSW5qZWN0IGRhdGEgaW50byBlanMgdGVtcGxhdGVcclxuICAgICAgLy8gXHU5NzAwXHU4OTgxXHU2Q0U4XHU1MTY1IGluZGV4Lmh0bWwgZWpzIFx1NkEyMVx1NzI0OFx1NzY4NFx1NjU3MFx1NjM2RSBcdTRGN0ZcdTc1MjhcdTU3MjggaHRtbCBcdTRFMkQgXHVGRjFBPGRpdj48JT0gdGl0bGUgJT48L2Rpdj5cclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHRpdGxlOiBWSVRFX0dMT0JfQVBQX1RJVExFLFxyXG4gICAgICB9LFxyXG5cclxuICAgICAgLy8gRW1iZWQgdGhlIGdlbmVyYXRlZCBhcHAuY29uZmlnLmpzIGZpbGUgXHU5NzAwXHU4OTgxXHU2Q0U4XHU1MTY1XHU3Njg0XHU2ODA3XHU3QjdFXHU1MjE3XHU4ODY4XHJcbiAgICAgIHRhZ3M6IGlzQnVpbGRcclxuICAgICAgICA/IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRhZzogJ3NjcmlwdCcsXHJcbiAgICAgICAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgICAgIHNyYzogZ2V0QXBwQ29uZmlnU3JjKCksXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIF1cclxuICAgICAgICA6IFtdLFxyXG4gICAgfSxcclxuICB9KVxyXG4gIHJldHVybiBodG1sUGx1Z2luXHJcbn1cclxuIiwgIntcclxuICBcIm5hbWVcIjogXCJkYXhwYXktZ2F0ZXdheS11aVwiLFxyXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gIFwidmVyc2lvblwiOiBcIjMuMC4wXCIsXHJcbiAgXCJlbmdpbmVzXCI6IHtcclxuICAgIFwibm9kZVwiOiBcIj49MjAuNi4wXCIsXHJcbiAgICBcInBucG1cIjogXCI+PTkuMC4yXCJcclxuICB9LFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcInByZWluc3RhbGxcIjogXCJucHggb25seS1hbGxvdyBwbnBtXCIsXHJcbiAgICBcImJvb3RzdHJhcFwiOiBcInBucG0gaW5zdGFsbFwiLFxyXG4gICAgXCJzZXJ2ZVwiOiBcIm5wbSBydW4gZGV2XCIsXHJcbiAgICBcImRldlwiOiBcImNyb3NzLWVudiBWSVRFX0NKU19JR05PUkVfV0FSTklORz10cnVlIHZpdGUgZGV2XCIsXHJcbiAgICBcImRldjpkZWJ1Z2Nqc1wiOiBcImNyb3NzLWVudiBWSVRFX0NKU19UUkFDRT10cnVlIHZpdGUgZGV2XCIsXHJcbiAgICBcImJ1aWxkXCI6IFwiY3Jvc3MtZW52IE5PREVfRU5WPXByb2R1Y3Rpb24gdml0ZSBidWlsZCAmJiBlc25vIC4vYnVpbGQvc2NyaXB0L3Bvc3RCdWlsZC50c1wiLFxyXG4gICAgXCJidWlsZDpuby1jYWNoZVwiOiBcInBucG0gY2xlYW46Y2FjaGUgJiYgbnBtIHJ1biBidWlsZFwiLFxyXG4gICAgXCJyZXBvcnRcIjogXCJjcm9zcy1lbnYgUkVQT1JUPXRydWUgbnBtIHJ1biBidWlsZFwiLFxyXG4gICAgXCJ0eXBlOmNoZWNrXCI6IFwidnVlLXRzYyAtLW5vRW1pdCAtLXNraXBMaWJDaGVja1wiLFxyXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXHJcbiAgICBcImNsZWFuOmNhY2hlXCI6IFwicmltcmFmIG5vZGVfbW9kdWxlcy8uY2FjaGUvICYmIHJpbXJhZiBub2RlX21vZHVsZXMvLnZpdGVcIixcclxuICAgIFwiY2xlYW46bGliXCI6IFwicmltcmFmIG5vZGVfbW9kdWxlc1wiLFxyXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC5cIixcclxuICAgIFwibGludDpmaXhcIjogXCJlc2xpbnQgLiAtLWZpeFwiLFxyXG4gICAgXCJsaW50OmxpbnQtc3RhZ2VkXCI6IFwibGludC1zdGFnZWRcIlxyXG4gIH0sXHJcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAdHlwZXMvbG9kYXNoLWVzXCI6IFwiXjQuMTcuMTJcIixcclxuICAgIFwiQHVub2Nzcy9yZXNldFwiOiBcIl4wLjU4LjlcIixcclxuICAgIFwiQHZ1ZXVzZS9jb3JlXCI6IFwiXjEwLjExLjFcIixcclxuICAgIFwidnVlLXFyXCI6IFwiXjQuMC45XCIsXHJcbiAgICBcImF4aW9zXCI6IFwiXjEuNy45XCIsXHJcbiAgICBcImRhdGUtZm5zXCI6IFwiXjMuNi4wXCIsXHJcbiAgICBcImxvZGFzaC1lc1wiOiBcIl40LjE3LjIxXCIsXHJcbiAgICBcIm5wcm9ncmVzc1wiOiBcIl4wLjIuMFwiLFxyXG4gICAgXCJwaW5pYVwiOiBcIl4yLjMuMFwiLFxyXG4gICAgXCJwaW5pYS1wbHVnaW4tcGVyc2lzdFwiOiBcIl4xLjAuMFwiLFxyXG4gICAgXCJxc1wiOiBcIl42LjEzLjFcIixcclxuICAgIFwidmFudFwiOiBcIl40LjkuMTBcIixcclxuICAgIFwidnVlXCI6IFwiXjMuNS4xM1wiLFxyXG4gICAgXCJ2dWUtcXJcIjogXCJeNC4wLjlcIixcclxuICAgIFwidnVlLXJvdXRlclwiOiBcIjQuMi41XCJcclxuICB9LFxyXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQGFudGZ1L2VzbGludC1jb25maWdcIjogXCJeMi4yNy4zXCIsXHJcbiAgICBcIkBjb21taXRsaW50L2NsaVwiOiBcIl4xOC42LjFcIixcclxuICAgIFwiQGNvbW1pdGxpbnQvY29uZmlnLWNvbnZlbnRpb25hbFwiOiBcIl4xOC42LjNcIixcclxuICAgIFwiQGljb25pZnkvanNvblwiOiBcIl4yLjIuMjgxXCIsXHJcbiAgICBcIkB0eXBlcy9mcy1leHRyYVwiOiBcIl4xMS4wLjRcIixcclxuICAgIFwiQHR5cGVzL21vY2tqc1wiOiBcIl4xLjAuMTBcIixcclxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMTcuOVwiLFxyXG4gICAgXCJAdHlwZXMvbnByb2dyZXNzXCI6IFwiXjAuMi4zXCIsXHJcbiAgICBcIkB0eXBlcy9xc1wiOiBcIl42LjkuMTdcIixcclxuICAgIFwiQHVub2Nzcy9lc2xpbnQtcGx1Z2luXCI6IFwiXjAuNTguOVwiLFxyXG4gICAgXCJAdW5vY3NzL3ByZXNldC1pY29uc1wiOiBcIl4wLjU4LjlcIixcclxuICAgIFwiQHVub2Nzcy9wcmVzZXQtcmVtLXRvLXB4XCI6IFwiXjAuNTguOVwiLFxyXG4gICAgXCJAdW5vY3NzL3RyYW5zZm9ybWVyLWRpcmVjdGl2ZXNcIjogXCJeMC41OC45XCIsXHJcbiAgICBcIkB1bm9jc3MvdHJhbnNmb3JtZXItdmFyaWFudC1ncm91cFwiOiBcIl4wLjU4LjlcIixcclxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjUuMi4xXCIsXHJcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjIwXCIsXHJcbiAgICBcImNyb3NzLWVudlwiOiBcIl43LjAuM1wiLFxyXG4gICAgXCJjei1naXRcIjogXCJeMS4xMS4wXCIsXHJcbiAgICBcImRvdGVudlwiOiBcIl4xNi40LjdcIixcclxuICAgIFwiZXNsaW50XCI6IFwiXjguNTcuMVwiLFxyXG4gICAgXCJlc2xpbnQtcGx1Z2luLWZvcm1hdFwiOiBcIl4wLjEuM1wiLFxyXG4gICAgXCJlc25vXCI6IFwiXjAuMTYuM1wiLFxyXG4gICAgXCJmcy1leHRyYVwiOiBcIl4xMS4yLjBcIixcclxuICAgIFwibGVzc1wiOiBcIl40LjIuMVwiLFxyXG4gICAgXCJsaW50LXN0YWdlZFwiOiBcIl4xNS4yLjEwXCIsXHJcbiAgICBcIm9ubHktYWxsb3dcIjogXCJeMS4yLjFcIixcclxuICAgIFwicGljb2NvbG9yc1wiOiBcIl4xLjEuMVwiLFxyXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC40OVwiLFxyXG4gICAgXCJwb3N0Y3NzLW1vYmlsZS1mb3JldmVyXCI6IFwiXjQuMy4xXCIsXHJcbiAgICBcInJpbXJhZlwiOiBcIl4zLjAuMlwiLFxyXG4gICAgXCJyb2xsdXBcIjogXCJeNC4yOC4xXCIsXHJcbiAgICBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiOiBcIl41LjEyLjBcIixcclxuICAgIFwic2ltcGxlLWdpdC1ob29rc1wiOiBcIl4yLjExLjFcIixcclxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjcuMlwiLFxyXG4gICAgXCJ1bm9jc3NcIjogXCJeMC41OC45XCIsXHJcbiAgICBcInVucGx1Z2luLWF1dG8taW1wb3J0XCI6IFwiXjAuMTcuOFwiLFxyXG4gICAgXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50c1wiOiBcIl4wLjI2LjBcIixcclxuICAgIFwidmNvbnNvbGVcIjogXCJeMy4xNS4xXCIsXHJcbiAgICBcInZpdGVcIjogXCI1LjQuNlwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiOiBcIl4wLjUuMVwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1odG1sXCI6IFwiXjMuMi4yXCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLW1vY2tcIjogXCJeMi45LjhcIixcclxuICAgIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI6IFwiXjIuMC4xXCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLXZjb25zb2xlXCI6IFwiXjIuMS4xXCIsXHJcbiAgICBcInZ1ZS10c2NcIjogXCJeMS44LjI3XCJcclxuICB9LFxyXG4gIFwibGludC1zdGFnZWRcIjoge1xyXG4gICAgXCIqXCI6IFwiZXNsaW50IC0tZml4XCJcclxuICB9XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyMDc1MlxcXFxEZXNrdG9wXFxcXHBheVx1OTg3OVx1NzZFRVxcXFxkYXgtcGF5LWg1KG5ldylcXFxcZGF4LXBheS1nYXRld2F5LXVpXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyMDc1MlxcXFxEZXNrdG9wXFxcXHBheVx1OTg3OVx1NzZFRVxcXFxkYXgtcGF5LWg1KG5ldylcXFxcZGF4LXBheS1nYXRld2F5LXVpXFxcXGJ1aWxkXFxcXGNvbnN0YW50LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8yMDc1Mi9EZXNrdG9wL3BheSVFOSVBMSVCOSVFNyU5QiVBRS9kYXgtcGF5LWg1KG5ldykvZGF4LXBheS1nYXRld2F5LXVpL2J1aWxkL2NvbnN0YW50LnRzXCI7LyoqXHJcbiAqIFRoZSBuYW1lIG9mIHRoZSBjb25maWd1cmF0aW9uIGZpbGUgZW50ZXJlZCBpbiB0aGUgcHJvZHVjdGlvbiBlbnZpcm9ubWVudFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IEdMT0JfQ09ORklHX0ZJTEVfTkFNRSA9ICdhcHAuY29uZmlnLmpzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IE9VVFBVVF9ESVIgPSAnZGlzdCdcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyMDc1MlxcXFxEZXNrdG9wXFxcXHBheVx1OTg3OVx1NzZFRVxcXFxkYXgtcGF5LWg1KG5ldylcXFxcZGF4LXBheS1nYXRld2F5LXVpXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyMDc1MlxcXFxEZXNrdG9wXFxcXHBheVx1OTg3OVx1NzZFRVxcXFxkYXgtcGF5LWg1KG5ldylcXFxcZGF4LXBheS1nYXRld2F5LXVpXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXFxcXGNvbXByZXNzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8yMDc1Mi9EZXNrdG9wL3BheSVFOSVBMSVCOSVFNyU5QiVBRS9kYXgtcGF5LWg1KG5ldykvZGF4LXBheS1nYXRld2F5LXVpL2J1aWxkL3ZpdGUvcGx1Z2luL2NvbXByZXNzLnRzXCI7LyoqXHJcbiAqIFVzZWQgdG8gcGFja2FnZSBhbmQgb3V0cHV0IGd6aXAuIE5vdGUgdGhhdCB0aGlzIGRvZXMgbm90IHdvcmsgcHJvcGVybHkgaW4gVml0ZSwgdGhlIHNwZWNpZmljIHJlYXNvbiBpcyBzdGlsbCBiZWluZyBpbnZlc3RpZ2F0ZWRcclxuICogaHR0cHM6Ly9naXRodWIuY29tL2FubmN3Yi92aXRlLXBsdWdpbi1jb21wcmVzc2lvblxyXG4gKi9cclxuaW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xyXG5cclxuaW1wb3J0IGNvbXByZXNzUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ0NvbXByZXNzUGx1Z2luKFxyXG4gIGNvbXByZXNzOiAnZ3ppcCcgfCAnYnJvdGxpJyB8ICdub25lJyxcclxuICBkZWxldGVPcmlnaW5GaWxlID0gZmFsc2UsXHJcbik6IFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdIHtcclxuICBjb25zdCBjb21wcmVzc0xpc3QgPSBjb21wcmVzcy5zcGxpdCgnLCcpXHJcblxyXG4gIGNvbnN0IHBsdWdpbnM6IFBsdWdpbk9wdGlvbltdID0gW11cclxuXHJcbiAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcygnZ3ppcCcpKSB7XHJcbiAgICBwbHVnaW5zLnB1c2goXHJcbiAgICAgIGNvbXByZXNzUGx1Z2luKHtcclxuICAgICAgICBleHQ6ICcuZ3onLFxyXG4gICAgICAgIGRlbGV0ZU9yaWdpbkZpbGUsXHJcbiAgICAgIH0pLFxyXG4gICAgKVxyXG4gIH1cclxuICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdicm90bGknKSkge1xyXG4gICAgcGx1Z2lucy5wdXNoKFxyXG4gICAgICBjb21wcmVzc1BsdWdpbih7XHJcbiAgICAgICAgZXh0OiAnLmJyJyxcclxuICAgICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXHJcbiAgICAgICAgZGVsZXRlT3JpZ2luRmlsZSxcclxuICAgICAgfSksXHJcbiAgICApXHJcbiAgfVxyXG4gIHJldHVybiBwbHVnaW5zXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyMDc1MlxcXFxEZXNrdG9wXFxcXHBheVx1OTg3OVx1NzZFRVxcXFxkYXgtcGF5LWg1KG5ldylcXFxcZGF4LXBheS1nYXRld2F5LXVpXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyMDc1MlxcXFxEZXNrdG9wXFxcXHBheVx1OTg3OVx1NzZFRVxcXFxkYXgtcGF5LWg1KG5ldylcXFxcZGF4LXBheS1nYXRld2F5LXVpXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXFxcXHZpc3VhbGl6ZXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzIwNzUyL0Rlc2t0b3AvcGF5JUU5JUExJUI5JUU3JTlCJUFFL2RheC1wYXktaDUobmV3KS9kYXgtcGF5LWdhdGV3YXktdWkvYnVpbGQvdml0ZS9wbHVnaW4vdmlzdWFsaXplci50c1wiOy8qKlxyXG4gKiBQYWNrYWdlIGZpbGUgdm9sdW1lIGFuYWx5c2lzXHJcbiAqL1xyXG5pbXBvcnQgdmlzdWFsaXplciBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXHJcbmltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgaXNSZXBvcnRNb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnVmlzdWFsaXplckNvbmZpZygpIHtcclxuICBpZiAoaXNSZXBvcnRNb2RlKCkpIHtcclxuICAgIHJldHVybiB2aXN1YWxpemVyKHtcclxuICAgICAgZmlsZW5hbWU6ICcuL25vZGVfbW9kdWxlcy8uY2FjaGUvdmlzdWFsaXplci9zdGF0cy5odG1sJyxcclxuICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgZ3ppcFNpemU6IHRydWUsXHJcbiAgICAgIGJyb3RsaVNpemU6IHRydWUsXHJcbiAgICB9KSBhcyBQbHVnaW5PcHRpb25cclxuICB9XHJcbiAgcmV0dXJuIFtdXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyMDc1MlxcXFxEZXNrdG9wXFxcXHBheVx1OTg3OVx1NzZFRVxcXFxkYXgtcGF5LWg1KG5ldylcXFxcZGF4LXBheS1nYXRld2F5LXVpXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyMDc1MlxcXFxEZXNrdG9wXFxcXHBheVx1OTg3OVx1NzZFRVxcXFxkYXgtcGF5LWg1KG5ldylcXFxcZGF4LXBheS1nYXRld2F5LXVpXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXFxcXHN2Z1Nwcml0ZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvMjA3NTIvRGVza3RvcC9wYXklRTklQTElQjklRTclOUIlQUUvZGF4LXBheS1oNShuZXcpL2RheC1wYXktZ2F0ZXdheS11aS9idWlsZC92aXRlL3BsdWdpbi9zdmdTcHJpdGUudHNcIjsvKipcclxuICogIFZpdGUgUGx1Z2luIGZvciBmYXN0IGNyZWF0aW5nIFNWRyBzcHJpdGVzLlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5uY3diL3ZpdGUtcGx1Z2luLXN2Zy1pY29uc1xyXG4gKi9cclxuXHJcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnU3ZnSWNvbnNQbHVnaW4oaXNCdWlsZDogYm9vbGVhbikge1xyXG4gIC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxyXG4gIGNvbnN0IHN2Z0ljb25zUGx1Z2luID0gY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXHJcbiAgICAvLyBcdTY2MkZcdTU0MjZcdTUzOEJcdTdGMjlcclxuICAgIHN2Z29PcHRpb25zOiBpc0J1aWxkLFxyXG4gICAgLy8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcclxuICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxyXG4gIH0pXHJcbiAgcmV0dXJuIHN2Z0ljb25zUGx1Z2luXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyMDc1MlxcXFxEZXNrdG9wXFxcXHBheVx1OTg3OVx1NzZFRVxcXFxkYXgtcGF5LWg1KG5ldylcXFxcZGF4LXBheS1nYXRld2F5LXVpXFxcXGJ1aWxkXFxcXHZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDIwNzUyXFxcXERlc2t0b3BcXFxccGF5XHU5ODc5XHU3NkVFXFxcXGRheC1wYXktaDUobmV3KVxcXFxkYXgtcGF5LWdhdGV3YXktdWlcXFxcYnVpbGRcXFxcdml0ZVxcXFxwcm94eS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvMjA3NTIvRGVza3RvcC9wYXklRTklQTElQjklRTclOUIlQUUvZGF4LXBheS1oNShuZXcpL2RheC1wYXktZ2F0ZXdheS11aS9idWlsZC92aXRlL3Byb3h5LnRzXCI7LyoqXHJcbiAqIFVzZWQgdG8gcGFyc2UgdGhlIC5lbnYuZGV2ZWxvcG1lbnQgcHJveHkgY29uZmlndXJhdGlvblxyXG4gKi9cclxuaW1wb3J0IHR5cGUgeyBQcm94eU9wdGlvbnMgfSBmcm9tICd2aXRlJ1xyXG5cclxudHlwZSBQcm94eUl0ZW0gPSBbc3RyaW5nLCBzdHJpbmddXHJcblxyXG50eXBlIFByb3h5TGlzdCA9IFByb3h5SXRlbVtdXHJcblxyXG50eXBlIFByb3h5VGFyZ2V0TGlzdCA9IFJlY29yZDxzdHJpbmcsIFByb3h5T3B0aW9ucyAmIHsgcmV3cml0ZTogKHBhdGg6IHN0cmluZykgPT4gc3RyaW5nIH0+XHJcblxyXG5jb25zdCBodHRwc1JFID0gL15odHRwczpcXC9cXC8vXHJcblxyXG4vKipcclxuICogR2VuZXJhdGUgcHJveHlcclxuICogQHBhcmFtIGxpc3RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm94eShsaXN0OiBQcm94eUxpc3QgPSBbXSkge1xyXG4gIGNvbnN0IHJldDogUHJveHlUYXJnZXRMaXN0ID0ge31cclxuICBmb3IgKGNvbnN0IFtwcmVmaXgsIHRhcmdldF0gb2YgbGlzdCkge1xyXG4gICAgY29uc3QgaXNIdHRwcyA9IGh0dHBzUkUudGVzdCh0YXJnZXQpXHJcblxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2h0dHAtcGFydHkvbm9kZS1odHRwLXByb3h5I29wdGlvbnNcclxuICAgIHJldFtwcmVmaXhdID0ge1xyXG4gICAgICB0YXJnZXQsXHJcbiAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgd3M6IHRydWUsXHJcbiAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3ByZWZpeH1gKSwgJycpLFxyXG4gICAgICAvLyBodHRwcyBpcyByZXF1aXJlIHNlY3VyZT1mYWxzZVxyXG4gICAgICAvLyBcdTU5ODJcdTY3OUNcdTYwQThzZWN1cmU9XCJ0cnVlXCJcdTUzRUFcdTUxNDFcdThCQjhcdTY3NjVcdTgxRUEgSFRUUFMgXHU3Njg0XHU4QkY3XHU2QzQyXHVGRjBDXHU1MjE5c2VjdXJlPVwiZmFsc2VcIlx1NjEwRlx1NTQ3M1x1Nzc0MFx1NTE0MVx1OEJCOFx1Njc2NVx1ODFFQSBIVFRQIFx1NTQ4QyBIVFRQUyBcdTc2ODRcdThCRjdcdTZDNDJcdTMwMDJcclxuICAgICAgLi4uKGlzSHR0cHMgPyB7IHNlY3VyZTogZmFsc2UgfSA6IHt9KSxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiByZXRcclxuXHJcbiAgLy8gcmV0XHJcbiAgLy8ge1xyXG4gIC8vICAgJy90ZXN0L2FwaSc6IHtcclxuICAvLyAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDgwL3Rlc3QvYXBpJyxcclxuICAvLyAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gIC8vICAgICB3czogdHJ1ZSxcclxuICAvLyAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKC9eXFwvdGVzdC9hcGkvKSwgJycpLFxyXG4gIC8vICAgfSxcclxuICAvLyAgICcvdXBsb2FkJzoge1xyXG4gIC8vICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjgwMDEvdXBsb2FkJyxcclxuICAvLyAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gIC8vICAgICB3czogdHJ1ZSxcclxuICAvLyAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKC9eXFwvdXBsb2FkLyksICcnKSxcclxuICAvLyAgIH1cclxuICAvLyB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2WSxTQUFTLFdBQUFBLGdCQUFlO0FBRXJhLFNBQVMsZUFBZTtBQUN4QixTQUFTLGNBQWM7OztBQ0R2QixPQUFPLFlBQVk7QUFhWixTQUFTLGVBQXdCO0FBQ3RDLFNBQU8sUUFBUSxJQUFJLFdBQVc7QUFDaEM7QUFJTyxTQUFTLFdBQVcsU0FBOEI7QUFDdkQsUUFBTSxNQUFXLENBQUM7QUFFbEIsYUFBVyxXQUFXLE9BQU8sS0FBSyxPQUFPLEdBQUc7QUFFMUMsUUFBSSxXQUFXLFFBQVEsT0FBTyxFQUFFLFFBQVEsUUFBUSxJQUFJO0FBQ3BELGVBQVcsYUFBYSxTQUFTLE9BQU8sYUFBYSxVQUFVLFFBQVE7QUFFdkUsUUFBSSxZQUFZLGFBQWE7QUFDM0IsaUJBQVcsT0FBTyxRQUFRO0FBQUEsSUFDNUI7QUFDQSxRQUFJLFlBQVksY0FBYztBQUM1QixVQUFJO0FBQ0YsbUJBQVcsS0FBSyxNQUFNLFFBQVE7QUFBQSxNQUNoQyxTQUNPLE9BQU87QUFBQSxNQUFDO0FBQUEsSUFDakI7QUFDQSxRQUFJLE9BQU8sSUFBSTtBQUNmLFlBQVEsSUFBSSxPQUFPLElBQUk7QUFBQSxFQUN6QjtBQUNBLFNBQU87QUFDVDs7O0FDMUM2YixZQUFZQyxXQUFVO0FBRW5kLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7OztBQ0Y3QixTQUFTLHdCQUF3Qjs7O0FDTGpDO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixNQUFRO0FBQUEsRUFD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QjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUVBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQTtBQUFBLE1BRU4sTUFBTTtBQUFBO0FBQUEsTUFFTixNQUFNLE9BQU8sU0FBUztBQUFBLE1BQ3RCLE9BQU8sWUFBWSxVQUFVO0FBQUE7QUFBQSxNQUU3QixRQUFRO0FBQUE7QUFBQSxRQUVOLGFBQWEsQ0FBQyxnQkFBZ0IsNEJBQTRCO0FBQUEsTUFDNUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBUUY7QUFBQSxJQUVBLGNBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVVaLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUE7QUFBQSxNQUVBLFNBQVM7QUFBQTtBQUFBLFFBRVA7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBR0EsU0FBUyxrQkFBa0IsU0FBUyxPQUFPO0FBQUEsRUFDN0M7QUFDRjsiLAogICJuYW1lcyI6IFsicmVzb2x2ZSIsICJwYXRoIiwgInBhdGgiLCAicGF0aCIsICJyZXNvbHZlIl0KfQo=
