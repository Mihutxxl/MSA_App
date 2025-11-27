// Load environment variables from .env file
require('dotenv').config();

// Access the variables you defined in .env
// These variables must be defined in your .env file in the project root.
const IOS_KEY = process.env.GOOGLE_MAPS_IOS_API_KEY || "";
const ANDROID_KEY = process.env.GOOGLE_MAPS_ANDROID_API_KEY || "";

/**
 * Expo configuration file for dynamically loading API keys from the .env file.
 * This function returns the configuration object used by Expo CLI.
 */
export default ({ config }) => {
  return {
    ...config,
    // Add custom configuration here
    name: "MSA_App_Map",
    slug: "msa-app-map",
    version: "1.0.0",
    orientation: "portrait",
    
    "ios": {
      "supportsTablet": true,
      "config": {
        // Reference the secure environment variable for iOS
        "googleMapsApiKey": IOS_KEY 
      },
      "bundleIdentifier": "com.yourcompany.msaappmap"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "config": {
        "googleMaps": {
          // Reference the secure environment variable for Android
          "apiKey": ANDROID_KEY
        }
      },
      "package": "com.yourcompany.msaappmap"
    }
  };
};