import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/alramz-/', // تعديل المسار ليتناسب مع اسم المستودع
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
