import pages from "./page.json"
import path from "path"


let entrys = {};
pages.map(item => {
  if (item.type == "build") {
    entrys[path.basename(path.dirname(item.path))] = item.path;
  }
})
const buildInput = function () {
  let inputs = {}
  Object.keys(entrys).map(item => {
    inputs[item] = path.resolve(__dirname, entrys[item])
  })
  return inputs
}

export default {
  base: "/",
  envDir: "./config/",
  define: {
    env_pages: JSON.stringify(entrys),
    env_index_page: JSON.stringify(pages),
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        ...buildInput(),
        list: "/list.html",
        index: "/index.html",
      },
    },
    manifest: true
  },
  server: {
    host: "localhost",
    port: "8003",
    open: true,
    hmr: {
      overlay: false
    }
  },
  plugins: []
}