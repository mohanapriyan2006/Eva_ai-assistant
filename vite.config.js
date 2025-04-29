import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables for the current mode
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    define: {
      __API_URL__: JSON.stringify(env.VITE_API_KEY),
    },
  };
});
