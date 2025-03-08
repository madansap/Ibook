const fs = require('fs');
const path = require('path');

// Function to reset AsyncStorage in Expo development
console.log('Resetting user flow...');

// Path to the AsyncStorage directory in Expo development
const asyncStoragePath = path.join(__dirname, '../node_modules/react-native/Libraries/Storage/AsyncStorage');

// Keys to remove
const keysToRemove = [
  'onboarding_completed',
  'preferences_completed'
];

// Check if the directory exists
if (fs.existsSync(asyncStoragePath)) {
  // Remove the AsyncStorage files
  const files = fs.readdirSync(asyncStoragePath);
  files.forEach(file => {
    for (const key of keysToRemove) {
      if (file.includes(key)) {
        fs.unlinkSync(path.join(asyncStoragePath, file));
        console.log(`Removed ${file}`);
      }
    }
  });
  console.log('User flow reset successfully!');
} else {
  console.log('AsyncStorage directory not found. You may need to clear app data manually.');
}

// Instructions for manual reset
console.log('\nIf the automatic reset doesn\'t work, you can manually reset by:');
console.log('1. In your app, use the resetUserFlow function from userFlow.ts');
console.log('2. Or clear app data in your device settings'); 