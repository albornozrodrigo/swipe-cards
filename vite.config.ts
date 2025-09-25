// import { federation } from '@module-federation/vite';
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5001,
    host: true,
    cors: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "swipe",
      filename: "remoteEntry.js",
      exposes: {
        "./swipe-cards": "./src/components/swipe-cards/index.tsx",
        "./interfaces": "./src/components/swipe-cards/interfaces.ts",
        "./no-users": "./src/components/swipe-cards/no-users.tsx",
        "./ripple": "./src/components/swipe-cards/ripple.tsx",
        "./swipe-card": "./src/components/swipe-cards/swipe-card.tsx",
        "./swipe-cards.state": "./src/components/swipe-cards/swipe-cards.state.ts",
        "./swipe-cards.css": "./src/components/swipe-cards/swipe-cards.css",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: [], // Não externalizar nada
    },
  },
  preview: {
    host: "localhost",
    port: 5001,
    strictPort: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
})
