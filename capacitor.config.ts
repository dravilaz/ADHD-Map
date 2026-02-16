import type { CapacitorConfig } from '@capacitor/cli'

/**
 * Capacitor configuration for future native iOS/Android packaging.
 *
 * To build native apps:
 * 1. npm run build
 * 2. npx cap add ios / npx cap add android
 * 3. npx cap sync
 * 4. npx cap open ios / npx cap open android
 */
const config: CapacitorConfig = {
  appId: 'com.systemone.adhdmap',
  appName: 'System One — ADHD Map',
  webDir: 'dist',
  server: {
    // For development — remove in production
    // url: 'http://localhost:5173',
    // cleartext: true,
  },
  ios: {
    contentInset: 'automatic',
    scheme: 'SystemOne',
  },
  android: {
    backgroundColor: '#f8fafc',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#f8fafc',
      showSpinner: false,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#ffffff',
    },
  },
}

export default config
