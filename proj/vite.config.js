// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// This tells Vite to run both .jsx and .tsx files through
// the React-specific JSX transform (automatic runtime).
export default defineConfig({
    plugins: [react()],
});
