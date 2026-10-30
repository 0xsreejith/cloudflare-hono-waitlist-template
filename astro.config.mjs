import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  srcDir: "./src/client",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    server:{
      proxy:{
        "/api":{
          target:"http://localhost:8787"
        }
      }
    }
  },
});
