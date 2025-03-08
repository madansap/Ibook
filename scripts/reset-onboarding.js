const fs = require('fs');
const path = require('path');

// Function to reset AsyncStorage in Expo development
console.log('Resetting onboarding state...');

// Path to the AsyncStorage directory in Expo development
const asyncStoragePath = path.join(__dirname, '../node_modules/react-native/Libraries/Storage/AsyncStorage');

// Check if the directory exists
if (fs.existsSync(asyncStoragePath)) {
  // Remove the AsyncStorage files
  const files = fs.readdirSync(asyncStoragePath);
  files.forEach(file => {
    if (file.includes('onboarding_completed')) {
      fs.unlinkSync(path.join(asyncStoragePath, file));
      console.log(`Removed ${file}`);
    }
  });
  console.log('Onboarding state reset successfully!');
} else {
  console.log('AsyncStorage directory not found. You may need to clear app data manually.');
}

// Instructions for manual reset
console.log('\nIf the automatic reset doesn\'t work, you can manually reset by:');
console.log('1. In your app, use AsyncStorage.removeItem("onboarding_completed")');
console.log('2. Or clear app data in your device settings');
console.log('3. Or use the resetOnboarding function from useOnboardingState hook in development'); 