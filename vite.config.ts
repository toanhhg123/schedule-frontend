import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': `${path.resolve(__dirname, './src/app/')}`,
      '@services': `${path.resolve(__dirname, './src/services/')}`,
      '@context': `${path.resolve(__dirname, './src/context/')}`,
      '@components': `${path.resolve(__dirname, './src/components/')}`,
      '@assets': `${path.resolve(__dirname, './src/assets/')}`,
      '@hooks': `${path.resolve(__dirname, './src/hooks/')}`,
      '@pages': `${path.resolve(__dirname, './src/pages/')}`,
      '@sections': `${path.resolve(__dirname, './src/sections/')}`,
      '@utils': `${path.resolve(__dirname, './src/utils/')}`,
      '@config': `${path.resolve(__dirname, './src/config/')}`
    }
  }
})
