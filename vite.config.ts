/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,               // ✅ дозволяє використовувати test(), expect(), describe() без імпорту
    environment: 'jsdom',        // ✅ потрібне для тестів React-компонентів
    setupFiles: './src/setupTests.ts', // ✅ якщо є такий файл
  },
});
