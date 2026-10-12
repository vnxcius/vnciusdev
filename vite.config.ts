import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  // Nitro picks the deploy target from the environment (Vercel, Cloudflare
  // Workers Builds); set NITRO_PRESET to build for one locally.
  plugins: [tailwindcss(), tanstackStart(), nitro(), viteReact()],
});
