const fs = require('fs');
const path = require('path');

const faviconPath = path.join(__dirname, 'app', 'favicon.ico');

try {
  if (fs.existsSync(faviconPath)) {
    fs.unlinkSync(faviconPath);
    console.log('✅ Deleted app/favicon.ico');
  } else {
    console.log('ℹ️  File does not exist');
  }
} catch (error) {
  console.error('❌ Error:', error.message);
}
