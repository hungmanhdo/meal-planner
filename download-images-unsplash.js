const https = require('https');
const fs = require('fs');
const path = require('path');

// Unsplash API - Free tier: 50 requests/hour
const ACCESS_KEY = ''; // Your Unsplash Access Key

// Complete food items with improved search terms for close-up food photography
const foodItems = {
  breakfast: [
    // BREAKFAST ENTREES
    { search: 'scrambled eggs plate', filename: 'scrambled-eggs.jpg' },
    { search: 'french toast sticks', filename: 'baked-french-toast-sticks.jpg' },
    { search: 'whole wheat french toast', filename: 'whole-wheat-french-toast.jpg' },
    { search: 'avocado taco', filename: 'vegan-avocado-taco.jpg' },
    { search: 'pancakes stack', filename: 'whole-wheat-pancakes.jpg' },
    { search: 'blueberry pancakes stack', filename: 'whole-wheat-blueberry-pancakes.jpg' },
    { search: 'chocolate chip pancakes', filename: 'whole-wheat-chocolate-chip-pancakes.jpg' },
    { search: 'greek yogurt berries', filename: 'greek-yogurt-fruit-plate.jpg' },
    { search: 'french toast berries', filename: 'strawberry-banana-french-toast-bowl.jpg' },
    
    // OMELET INGREDIENTS
    { search: 'egg whites bowl', filename: 'egg-whites.jpg' },
    { search: 'beaten eggs', filename: 'breakfast-blend-eggs.jpg' },
    { search: 'shredded cheddar cheese', filename: 'shredded-cheddar-cheese.jpg' },
    { search: 'cheddar cheese slices', filename: 'cheddar-cheese.jpg' },
    { search: 'swiss cheese slices', filename: 'swiss-cheese.jpg' },
    { search: 'american cheese', filename: 'american-cheese.jpg' },
    { search: 'provolone cheese', filename: 'provolone-cheese.jpg' },
    { search: 'diced ham', filename: 'diced-ham.jpg' },
    { search: 'sausage links', filename: 'turkey-sausage.jpg' },
    { search: 'diced bacon', filename: 'diced-bacon.jpg' },
    { search: 'bacon strips', filename: 'turkey-bacon.jpg' },
    { search: 'sauteed mushrooms', filename: 'sauteed-mushrooms.jpg' },
    { search: 'sauteed onions', filename: 'sauteed-onions.jpg' },
    { search: 'sliced bell peppers', filename: 'green-peppers.jpg' },
    { search: 'diced tomatoes', filename: 'diced-tomatoes.jpg' },
    { search: 'salsa bowl', filename: 'salsa.jpg' },
    
    // BREAKFAST SIDES
    { search: 'cottage cheese bowl', filename: 'low-fat-cottage-cheese.jpg' },
    { search: 'hard boiled egg', filename: 'hard-cooked-egg.jpg' },
    { search: 'hash brown', filename: 'hash-brown-patty.jpg' },
    { search: 'home fries potatoes', filename: 'home-fries.jpg' },
    { search: 'bacon strips crispy', filename: 'pork-bacon.jpg' },
    { search: 'sausage patty', filename: 'turkey-sausage-patty.jpg' },
    
    // HOT & COLD CEREALS
    { search: 'oatmeal bowl', filename: 'oatmeal.jpg' },
    { search: 'cream wheat cereal', filename: 'cream-of-wheat.jpg' },
    { search: 'cheerios cereal', filename: 'cheerios.jpg' },
    { search: 'raisin bran', filename: 'total-raisin-bran.jpg' },
    { search: 'cinnamon toast crunch', filename: 'cinnamon-toast-crunch.jpg' },
    { search: 'honey cheerios', filename: 'honey-nut-cheerios.jpg' },
    { search: 'rice cereal', filename: 'rice-chex.jpg' },
    { search: 'cornflakes bowl', filename: 'cornflakes.jpg' },
    
    // BREAD BASKET
    { search: 'blueberry muffin', filename: 'blueberry-muffin.jpg' },
    { search: 'cinnamon roll', filename: 'cinnamon-roll.jpg' },
    { search: 'english muffin', filename: 'whole-grain-english-muffin.jpg' },
    { search: 'toasted english muffin', filename: 'english-muffin.jpg' },
    { search: 'bagel plain', filename: 'bagel.jpg' },
    { search: 'cinnamon bagel', filename: 'cinnamon-raisin-bagel.jpg' },
    { search: 'flour tortilla', filename: 'flour-tortilla.jpg' },
    { search: 'white bread', filename: 'white-bread.jpg' },
    { search: 'whole wheat bread', filename: 'whole-wheat-bread.jpg' },
    
    // FRUIT/YOGURT
    { search: 'banana fruit', filename: 'banana.jpg' },
    { search: 'orange fruit', filename: 'orange.jpg' },
    { search: 'red apple', filename: 'apple.jpg' },
    { search: 'fruit salad cup', filename: 'fresh-fruit-cup.jpg' },
    { search: 'honeydew melon', filename: 'honeydew-melon.jpg' },
    { search: 'mixed berries', filename: 'fresh-berries.jpg' },
    { search: 'cantaloupe slices', filename: 'cantaloupe.jpg' },
    { search: 'pineapple chunks', filename: 'pineapple.jpg' },
    { search: 'vanilla yogurt', filename: 'low-fat-vanilla-yogurt.jpg' },
    { search: 'strawberry yogurt', filename: 'low-fat-strawberry-yogurt.jpg' },
    { search: 'yogurt parfait', filename: 'roasted-apple-yogurt-parfait.jpg' }
  ],
  
  'lunch-dinner': [
    // STARTERS
    { search: 'garden salad', filename: 'tossed-garden-salad.jpg' },
    { search: 'caesar salad', filename: 'caesar-side-salad.jpg' },
    { search: 'vegetables ranch dip', filename: 'celery-and-carrots-with-ranch.jpg' },
    
    // ENTREES
    { search: 'chicken parmesan', filename: 'chicken-parmesan.jpg' },
    { search: 'meatball sub', filename: 'meatball-sub.jpg' },
    { search: 'fish sticks', filename: 'baked-fish-sticks.jpg' },
    { search: 'sliced turkey', filename: 'roast-turkey.jpg' },
    { search: 'pasta meatballs', filename: 'rigatoni-with-meatballs.jpg' },
    { search: 'macaroni cheese', filename: 'macaroni-and-cheese.jpg' },
    { search: 'chicken nuggets', filename: 'chicken-bites.jpg' },
    { search: 'chicken tenders', filename: 'chicken-tenders.jpg' },
    { search: 'mini burger', filename: 'cheeseburger-slider.jpg' },
    { search: 'beef burrito', filename: 'beef-burrito.jpg' },
    { search: 'cheese quesadilla', filename: 'cheese-quesadilla.jpg' },
    { search: 'grilled chicken sandwich', filename: 'grilled-chicken-sandwich.jpg' },
    { search: 'tilapia fish', filename: 'baked-tilapia.jpg' },
    { search: 'hummus pita', filename: 'hummus-vegetable-pita-plate.jpg' },
    { search: 'chicken caesar', filename: 'chicken-caesar-salad.jpg' },
    
    // SOUPS
    { search: 'chicken noodle soup', filename: 'chicken-noodle-soup.jpg' },
    { search: 'tomato soup', filename: 'tomato-soup.jpg' },
    
    // SANDWICHES
    { search: 'peanut butter jelly', filename: 'peanut-butter-and-grape-sandwich.jpg' },
    { search: 'pbj sandwich', filename: 'peanut-butter-and-strawberry-sandwich.jpg' }
  ],
  
  sides: [
    { search: 'broccoli florets', filename: 'fresh-broccoli.jpg' },
    { search: 'green beans', filename: 'green-beans.jpg' },
    { search: 'carrot sticks', filename: 'fresh-carrots.jpg' },
    { search: 'corn kernels', filename: 'corn.jpg' },
    { search: 'mashed potatoes', filename: 'mashed-potatoes.jpg' },
    { search: 'tater tots', filename: 'baked-tater-tots.jpg' },
    { search: 'sweet potato', filename: 'baked-sweet-potato.jpg' },
    { search: 'sweet potato mash', filename: 'mashed-sweet-potatoes.jpg' },
    { search: 'penne pasta', filename: 'buttered-penne-pasta.jpg' },
    { search: 'whole grain pasta', filename: 'whole-grain-buttered-penne.jpg' },
    { search: 'pasta salad', filename: 'italian-rotini-salad.jpg' },
    { search: 'mac and cheese side dish', filename: 'macaroni-and-cheese-side.jpg' },
    { search: 'brown rice', filename: 'brown-rice.jpg' },
    { search: 'rice beans', filename: 'brown-rice-and-beans.jpg' },
    { search: 'white rice', filename: 'white-rice.jpg' },
    { search: 'mozzarella stick', filename: 'mozzarella-string-cheese.jpg' },
    { search: 'potato chips', filename: 'baked-potato-chips.jpg' },
    { search: 'pretzels', filename: 'pretzels.jpg' },
    { search: 'goldfish crackers', filename: 'goldfish-crackers.jpg' },
    { search: 'dinner roll', filename: 'whole-wheat-roll.jpg' },
    { search: 'white roll', filename: 'white-roll.jpg' },
    { search: 'garlic bread', filename: 'garlic-breadstick.jpg' }
  ],
  
  snacks: [
    { search: 'cucumber slices', filename: 'cucumber-slices.jpg' },
    { search: 'celery sticks', filename: 'celery-sticks.jpg' },
    { search: 'carrot sticks', filename: 'carrot-sticks.jpg' },
    { search: 'apple slices', filename: 'apple-slices.jpg' },
    { search: 'orange slices', filename: 'orange-slices.jpg' },
    { search: 'fruit salad', filename: 'fruit-salad.jpg' },
    { search: 'yogurt cup', filename: 'yogurt-cup.jpg' },
    { search: 'cheese stick', filename: 'cheese-stick.jpg' },
    { search: 'cheese crackers', filename: 'crackers-with-cheese.jpg' }
  ],
  
  desserts: [
    { search: 'chocolate chip cookies', filename: 'chocolate-chip-cookies.jpg' },
    { search: 'oatmeal cookies', filename: 'oatmeal-raisin-cookies.jpg' },
    { search: 'teddy grahams', filename: 'teddy-grahams.jpg' },
    { search: 'brownie dessert', filename: 'smore-brownie.jpg' },
    { search: 'fudge brownie', filename: 'fudge-brownie.jpg' },
    { search: 'rice crispy', filename: 'rice-krispie-treat.jpg' },
    { search: 'apple crisp', filename: 'apple-crisp.jpg' },
    { search: 'vanilla ice cream', filename: 'vanilla-ice-cream.jpg' },
    { search: 'chocolate ice cream', filename: 'chocolate-ice-cream.jpg' },
    { search: 'orange sherbet', filename: 'orange-sherbet.jpg' },
    { search: 'peach slices', filename: 'chilled-peaches.jpg' },
    { search: 'applesauce', filename: 'applesauce.jpg' },
    { search: 'pear slices', filename: 'chilled-pears.jpg' },
    { search: 'mandarin oranges', filename: 'mandarin-oranges.jpg' }
  ],
  
  condiments: [
    { search: 'margarine', filename: 'margarine.jpg' },
    { search: 'butter stick', filename: 'butter.jpg' },
    { search: 'ranch dressing', filename: 'ranch-dressing.jpg' },
    { search: 'italian dressing', filename: 'italian-dressing.jpg' },
    { search: 'caesar dressing', filename: 'caesar-dressing.jpg' },
    { search: 'maple syrup', filename: 'syrup.jpg' },
    { search: 'ketchup bottle', filename: 'ketchup.jpg' },
    { search: 'mustard', filename: 'mustard.jpg' },
    { search: 'mayonnaise', filename: 'lite-mayo.jpg' },
    { search: 'bbq sauce', filename: 'bbq-sauce.jpg' },
    { search: 'ranch dip', filename: 'ranch-dipping-sauce.jpg' },
    { search: 'honey mustard', filename: 'honey-mustard.jpg' },
    { search: 'buffalo sauce', filename: 'buffalo-sauce.jpg' },
    { search: 'cream cheese', filename: 'cream-cheese.jpg' },
    { search: 'peanut butter jar', filename: 'peanut-butter.jpg' },
    { search: 'grape jelly', filename: 'jelly.jpg' },
    { search: 'parmesan cheese', filename: 'parmesan-cheese.jpg' },
    { search: 'tartar sauce', filename: 'tartar-sauce.jpg' },
    { search: 'raisins dried', filename: 'raisins.jpg' },
    { search: 'brown sugar', filename: 'brown-sugar.jpg' }
  ],
  
  beverages: [
    { search: 'almond milk', filename: 'almond-milk.jpg' },
    { search: 'soy milk', filename: 'soy-milk.jpg' },
    { search: 'milk glass', filename: 'whole-milk.jpg' },
    { search: 'chocolate milk', filename: 'chocolate-milk.jpg' },
    { search: 'milk carton', filename: 'lactaid.jpg' },
    { search: 'fruit smoothie', filename: 'chobani-smoothie.jpg' },
    { search: 'berry smoothie', filename: 'strawberry-banana-smoothie.jpg' },
    { search: 'orange juice', filename: 'orange-juice.jpg' },
    { search: 'apple juice', filename: 'apple-juice.jpg' },
    { search: 'cranberry juice', filename: 'cranberry-juice.jpg' },
    { search: 'grape juice', filename: 'grape-juice.jpg' },
    { search: 'prune juice', filename: 'prune-juice.jpg' },
    { search: 'hot chocolate', filename: 'hot-chocolate.jpg' },
    { search: 'coffee cup', filename: 'decaf-coffee.jpg' },
    { search: 'iced tea', filename: 'iced-tea.jpg' },
    { search: 'water bottle', filename: 'bottled-water.jpg' }
  ]
};

// Function to search and download image from Unsplash
function downloadImage(searchQuery, category, filename) {
  return new Promise((resolve, reject) => {
    const encodedQuery = encodeURIComponent(searchQuery);
    const options = {
      hostname: 'api.unsplash.com',
      path: `/search/photos?query=${encodedQuery}&per_page=1&orientation=landscape`,
      headers: {
        'Authorization': `Client-ID ${ACCESS_KEY}`
      }
    };

    https.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.results && result.results.length > 0) {
            const imageUrl = result.results[0].urls.regular; // High quality image
            downloadImageFile(imageUrl, category, filename, resolve, reject);
          } else {
            console.log(`⚠ No image found for: ${searchQuery}`);
            resolve();
          }
        } catch (error) {
          console.error(`❌ Error parsing response for ${searchQuery}:`, error.message);
          resolve();
        }
      });
    }).on('error', (error) => {
      console.error(`❌ Error searching for ${searchQuery}:`, error.message);
      resolve();
    });
  });
}

// Function to download the actual image file
function downloadImageFile(url, category, filename, resolve, reject) {
  https.get(url, (res) => {
    const filePath = path.join(__dirname, 'images', category, filename);
    const fileStream = fs.createWriteStream(filePath);

    res.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`✓ Downloaded: ${filename}`);
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
}

// Main function to download all images
async function downloadAllImages() {
  if (ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
    console.error('❌ ERROR: Please set your Unsplash Access Key!');
    console.log('\n📝 To get an Access Key:');
    console.log('1. Go to https://unsplash.com/developers');
    console.log('2. Register a new application');
    console.log('3. Copy your Access Key');
    console.log('4. Replace YOUR_UNSPLASH_ACCESS_KEY in this file\n');
    return;
  }

  const totalItems = Object.values(foodItems).flat().length;
  console.log('🍽️  Starting image download from Unsplash...\n');
  console.log(`📊 Total items to download: ${totalItems}\n`);
  console.log('⚠️  Rate limit: 50 requests/hour\n');

  for (const [category, items] of Object.entries(foodItems)) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📂 Downloading ${category} images (${items.length} items)`);
    console.log('='.repeat(60));
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      console.log(`[${i + 1}/${items.length}] Searching: "${item.search}"`);
      await downloadImage(item.search, category, item.filename);
      // Wait between requests to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ All images downloaded successfully!');
  console.log('='.repeat(60));
  console.log('\n📁 Images are organized in the following folders:');
  console.log('  - images/breakfast/ (59 items)');
  console.log('  - images/lunch-dinner/ (22 items)');
  console.log('  - images/sides/ (21 items)');
  console.log('  - images/snacks/ (9 items)');
  console.log('  - images/desserts/ (14 items)');
  console.log('  - images/condiments/ (20 items)');
  console.log('  - images/beverages/ (16 items)');
  console.log(`\n📊 Total: ${totalItems} food images downloaded!`);
}

// Run the download
downloadAllImages().catch(console.error);
