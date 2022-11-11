import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        uni()
    ],
    server: {
        host: '192.168.1.4',
        port: 9292
    }
});
