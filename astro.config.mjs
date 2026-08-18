import react from "@astrojs/react"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  vite: {
    ssr: {
      noExternal: ["animal-island-ui"],
    },
  },
  integrations: [react()],
})
