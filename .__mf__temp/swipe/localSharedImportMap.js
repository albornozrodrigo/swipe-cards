
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    const importMap = {
      
        "framer-motion": async () => {
          let pkg = await import("__mf__virtual/swipe__prebuild__framer_mf_2_motion__prebuild__.js")
          return pkg
        }
      ,
        "react": async () => {
          let pkg = await import("__mf__virtual/swipe__prebuild__react__prebuild__.js")
          return pkg
        }
      ,
        "react-dom": async () => {
          let pkg = await import("__mf__virtual/swipe__prebuild__react_mf_2_dom__prebuild__.js")
          return pkg
        }
      ,
        "zustand": async () => {
          let pkg = await import("__mf__virtual/swipe__prebuild__zustand__prebuild__.js")
          return pkg
        }
      
    }
      const usedShared = {
      
          "framer-motion": {
            name: "framer-motion",
            version: "12.23.18",
            scope: ["default"],
            loaded: false,
            from: "swipe",
            async get () {
              usedShared["framer-motion"].loaded = true
              const {"framer-motion": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^12.23.18"
            }
          }
        ,
          "react": {
            name: "react",
            version: "19.1.1",
            scope: ["default"],
            loaded: false,
            from: "swipe",
            async get () {
              usedShared["react"].loaded = true
              const {"react": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.1.1"
            }
          }
        ,
          "react-dom": {
            name: "react-dom",
            version: "19.1.1",
            scope: ["default"],
            loaded: false,
            from: "swipe",
            async get () {
              usedShared["react-dom"].loaded = true
              const {"react-dom": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.1.1"
            }
          }
        ,
          "zustand": {
            name: "zustand",
            version: "5.0.8",
            scope: ["default"],
            loaded: false,
            from: "swipe",
            async get () {
              usedShared["zustand"].loaded = true
              const {"zustand": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^5.0.8"
            }
          }
        
    }
      const usedRemotes = [
      ]
      export {
        usedShared,
        usedRemotes
      }
      