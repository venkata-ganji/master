import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ca.truecredit.app',
  appName: 'TrueCredit',
  webDir: 'dist/truecredit-client',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3b82f6",
      showSpinner: true,
      spinnerColor: "#ffffff"
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: "#3b82f6"
    },
    Keyboard: {
      resize: 'body',
      style: 'dark'
    }
  }
};

export default config;