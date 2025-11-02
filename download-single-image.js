const https = require('https');
const fs = require('fs');
const path = require('path');

// Use your Unsplash Access Key
const ACCESS_KEY = '7UDuvV9ofuK0AR4HxGzlUnr1GlqJyGDQCoBobTYHuhU';
const searchQuery = 'mac and cheese side dish';
const category = 'sides';
const filename = 'macaroni-and-cheese-side.jpg';

function downloadImage() {
  return new Promise((resolve, reject) => {
    const encodedQuery = encodeURIComponent(searchQuery);
    const options = {
      hostname: 'api.unsplash.com',
      path: `/search/photos?query=${encodedQuery}&per_page=1&orientation=landscape`,
      headers: {
        'Authorization': `Client-ID ${ACCESS_KEY}`
      }
    };

    console.log(`Searching Unsplash for: '${searchQuery}'`);
    https.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.results && result.results.length > 0) {
            const imageUrl = result.results[0].urls.regular;
            console.log(`Found image! Downloading from: ${imageUrl}`);
            
            https.get(imageUrl, (res) => {
              const filePath = path.join(__dirname, 'images', category, filename);
              const fileStream = fs.createWriteStream(filePath);

              res.pipe(fileStream);

              fileStream.on('finish', () => {
                fileStream.close();
                console.log(`✓ Successfully downloaded: ${filename}`);
                resolve();
              });

              fileStream.on('error', (error) => {
                console.error(`❌ Error saving ${filename}:`, error.message);
                resolve();
              });
            }).on('error', (error) => {
              console.error(`❌ Error downloading ${filename}:`, error.message);
              resolve();
            });
          } else {
            console.log(`⚠ No image found for: ${searchQuery}`);
            resolve();
          }
        } catch (error) {
          console.error(`❌ Error parsing response:`, error.message);
          resolve();
        }
      });
    }).on('error', (error) => {
      console.error(`❌ Error searching:`, error.message);
      resolve();
    });
  });
}

// Make sure the directory exists
const dir = path.join(__dirname, 'images', category);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
  console.log(`Created directory: ${dir}`);
}

downloadImage().then(() => {
  console.log('Done!');
});
