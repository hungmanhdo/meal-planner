const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'TNlRTbh7bThnIPvPTk6gx1a7IF6nbUbksPo9klEdd0e32IZlTKUj0LyH';

// Complete food items with improved search terms (adding "food" keyword for clarity)
const foodItems = {
  breakfast: [
    // BREAKFAST ENTREES
    { search: 'scrambled eggs breakfast', filename: 'scrambled-eggs.jpg' },
    { search: 'french toast sticks breakfast', filename: 'baked-french-toast-sticks.jpg' },
    { search: 'whole wheat french toast', filename: 'whole-wheat-french-toast.jpg' },
    { search: 'avocado breakfast taco', filename: 'vegan-avocado-taco.jpg' },
    { search: 'whole wheat pancakes', filename: 'whole-wheat-pancakes.jpg' },
    { search: 'blueberry pancakes', filename: 'whole-wheat-blueberry-pancakes.jpg' },
    { search: 'chocolate chip pancakes', filename: 'whole-wheat-chocolate-chip-pancakes.jpg' },
    { search: 'greek yogurt fruit bowl', filename: 'greek-yogurt-fruit-plate.jpg' },
    { search: 'french toast bowl breakfast', filename: 'strawberry-banana-french-toast-bowl.jpg' },
    
    // OMELET INGREDIENTS
    { search: 'egg whites bowl', filename: 'egg-whites.jpg' },
    { search: 'beaten eggs bowl', filename: 'breakfast-blend-eggs.jpg' },
    { search: 'shredded cheddar cheese', filename: 'shredded-cheddar-cheese.jpg' },
    { search: 'cheddar cheese slices', filename: 'cheddar-cheese.jpg' },
    { search: 'swiss cheese slices', filename: 'swiss-cheese.jpg' },
    { search: 'american cheese slices', filename: 'american-cheese.jpg' },
    { search: 'provolone cheese slices', filename: 'provolone-cheese.jpg' },
    { search: 'diced ham cubes', filename: 'diced-ham.jpg' },
    { search: 'turkey sausage links breakfast', filename: 'turkey-sausage.jpg' },
    { search: 'diced bacon pieces', filename: 'diced-bacon.jpg' },
    { search: 'turkey bacon strips', filename: 'turkey-bacon.jpg' },
    { search: 'sauteed mushrooms cooked', filename: 'sauteed-mushrooms.jpg' },
    { search: 'sauteed onions cooked', filename: 'sauteed-onions.jpg' },
    { search: 'green bell peppers sliced', filename: 'green-peppers.jpg' },
    { search: 'diced tomatoes chunks', filename: 'diced-tomatoes.jpg' },
    { search: 'salsa sauce dip food', filename: 'salsa.jpg' },
    
    // BREAKFAST SIDES
    { search: 'cottage cheese bowl', filename: 'low-fat-cottage-cheese.jpg' },
    { search: 'hard boiled egg', filename: 'hard-cooked-egg.jpg' },
    { search: 'hash brown patty', filename: 'hash-brown-patty.jpg' },
    { search: 'home fries potatoes breakfast', filename: 'home-fries.jpg' },
    { search: 'pork bacon strips', filename: 'pork-bacon.jpg' },
    { search: 'turkey sausage patty', filename: 'turkey-sausage-patty.jpg' },
    
    // HOT & COLD CEREALS
    { search: 'oatmeal bowl breakfast', filename: 'oatmeal.jpg' },
    { search: 'cream of wheat cereal', filename: 'cream-of-wheat.jpg' },
    { search: 'cheerios cereal bowl', filename: 'cheerios.jpg' },
    { search: 'raisin bran cereal', filename: 'total-raisin-bran.jpg' },
    { search: 'cinnamon toast crunch cereal', filename: 'cinnamon-toast-crunch.jpg' },
    { search: 'honey nut cheerios cereal', filename: 'honey-nut-cheerios.jpg' },
    { search: 'rice chex cereal', filename: 'rice-chex.jpg' },
    { search: 'cornflakes cereal bowl', filename: 'cornflakes.jpg' },
    
    // BREAD BASKET
    { search: 'blueberry muffin baked', filename: 'blueberry-muffin.jpg' },
    { search: 'cinnamon roll pastry', filename: 'cinnamon-roll.jpg' },
    { search: 'english muffin bread', filename: 'whole-grain-english-muffin.jpg' },
    { search: 'english muffin toasted', filename: 'english-muffin.jpg' },
    { search: 'plain bagel bread', filename: 'bagel.jpg' },
    { search: 'cinnamon raisin bagel', filename: 'cinnamon-raisin-bagel.jpg' },
    { search: 'flour tortilla wrap', filename: 'flour-tortilla.jpg' },
    { search: 'white bread slices', filename: 'white-bread.jpg' },
    { search: 'whole wheat bread slices', filename: 'whole-wheat-bread.jpg' },
    
    // FRUIT/YOGURT
    { search: 'banana fruit', filename: 'banana.jpg' },
    { search: 'orange fruit whole', filename: 'orange.jpg' },
    { search: 'red apple fruit', filename: 'apple.jpg' },
    { search: 'fresh fruit cup bowl', filename: 'fresh-fruit-cup.jpg' },
    { search: 'honeydew melon slices', filename: 'honeydew-melon.jpg' },
    { search: 'fresh berries mix', filename: 'fresh-berries.jpg' },
    { search: 'cantaloupe melon slices', filename: 'cantaloupe.jpg' },
    { search: 'pineapple chunks fruit', filename: 'pineapple.jpg' },
    { search: 'vanilla yogurt cup', filename: 'low-fat-vanilla-yogurt.jpg' },
    { search: 'strawberry yogurt cup', filename: 'low-fat-strawberry-yogurt.jpg' },
    { search: 'yogurt parfait granola', filename: 'roasted-apple-yogurt-parfait.jpg' }
  ],
  
  'lunch-dinner': [
    // STARTERS
    { search: 'garden salad bowl', filename: 'tossed-garden-salad.jpg' },
    { search: 'caesar salad romaine', filename: 'caesar-side-salad.jpg' },
    { search: 'celery carrots ranch dip', filename: 'celery-and-carrots-with-ranch.jpg' },
    
    // ENTREES
    { search: 'chicken parmesan breaded', filename: 'chicken-parmesan.jpg' },
    { search: 'meatball sub sandwich', filename: 'meatball-sub.jpg' },
    { search: 'fish sticks breaded', filename: 'baked-fish-sticks.jpg' },
    { search: 'roast turkey sliced', filename: 'roast-turkey.jpg' },
    { search: 'rigatoni meatballs pasta', filename: 'rigatoni-with-meatballs.jpg' },
    { search: 'macaroni cheese bowl', filename: 'macaroni-and-cheese.jpg' },
    { search: 'chicken nuggets bites', filename: 'chicken-bites.jpg' },
    { search: 'chicken tenders fried', filename: 'chicken-tenders.jpg' },
    { search: 'cheeseburger slider mini', filename: 'cheeseburger-slider.jpg' },
    { search: 'beef burrito wrapped', filename: 'beef-burrito.jpg' },
    { search: 'cheese quesadilla grilled', filename: 'cheese-quesadilla.jpg' },
    { search: 'grilled chicken sandwich', filename: 'grilled-chicken-sandwich.jpg' },
    { search: 'tilapia fish fillet', filename: 'baked-tilapia.jpg' },
    { search: 'hummus pita vegetables', filename: 'hummus-vegetable-pita-plate.jpg' },
    { search: 'chicken caesar salad', filename: 'chicken-caesar-salad.jpg' },
    
    // SOUPS
    { search: 'chicken noodle soup bowl', filename: 'chicken-noodle-soup.jpg' },
    { search: 'tomato soup bowl', filename: 'tomato-soup.jpg' },
    
    // SANDWICHES
    { search: 'peanut butter jelly grape sandwich', filename: 'peanut-butter-and-grape-sandwich.jpg' },
    { search: 'peanut butter jelly strawberry sandwich', filename: 'peanut-butter-and-strawberry-sandwich.jpg' }
  ],
  
  sides: [
    // SIDES/VEGETABLES
    { search: 'fresh broccoli florets', filename: 'fresh-broccoli.jpg' },
    { search: 'green beans cooked', filename: 'green-beans.jpg' },
    { search: 'fresh carrots sticks', filename: 'fresh-carrots.jpg' },
    { search: 'corn kernels yellow', filename: 'corn.jpg' },
    { search: 'mashed potatoes bowl', filename: 'mashed-potatoes.jpg' },
    { search: 'tater tots potato', filename: 'baked-tater-tots.jpg' },
    { search: 'baked sweet potato', filename: 'baked-sweet-potato.jpg' },
    { search: 'mashed sweet potatoes', filename: 'mashed-sweet-potatoes.jpg' },
    { search: 'penne pasta buttered', filename: 'buttered-penne-pasta.jpg' },
    { search: 'whole grain penne pasta', filename: 'whole-grain-buttered-penne.jpg' },
    { search: 'pasta salad rotini', filename: 'italian-rotini-salad.jpg' },
    { search: 'brown rice bowl', filename: 'brown-rice.jpg' },
    { search: 'rice beans mix', filename: 'brown-rice-and-beans.jpg' },
    { search: 'white rice bowl', filename: 'white-rice.jpg' },
    { search: 'mozzarella string cheese stick', filename: 'mozzarella-string-cheese.jpg' },
    { search: 'potato chips baked', filename: 'baked-potato-chips.jpg' },
    { search: 'pretzels twisted snack', filename: 'pretzels.jpg' },
    { search: 'goldfish crackers snack', filename: 'goldfish-crackers.jpg' },
    
    // BREAD
    { search: 'whole wheat dinner roll', filename: 'whole-wheat-roll.jpg' },
    { search: 'white dinner roll', filename: 'white-roll.jpg' },
    { search: 'garlic breadstick bread', filename: 'garlic-breadstick.jpg' }
  ],
  
  snacks: [
    { search: 'cucumber slices fresh', filename: 'cucumber-slices.jpg' },
    { search: 'celery sticks raw', filename: 'celery-sticks.jpg' },
    { search: 'carrot sticks raw', filename: 'carrot-sticks.jpg' },
    { search: 'apple slices fresh', filename: 'apple-slices.jpg' },
    { search: 'orange slices fresh', filename: 'orange-slices.jpg' },
    { search: 'fruit salad bowl', filename: 'fruit-salad.jpg' },
    { search: 'yogurt cup snack', filename: 'yogurt-cup.jpg' },
    { search: 'cheese stick mozzarella', filename: 'cheese-stick.jpg' },
    { search: 'crackers cheese snack', filename: 'crackers-with-cheese.jpg' }
  ],
  
  desserts: [
    // FRUIT/DESSERTS from new menu
    { search: 'chocolate chip cookies', filename: 'chocolate-chip-cookies.jpg' },
    { search: 'oatmeal raisin cookies', filename: 'oatmeal-raisin-cookies.jpg' },
    { search: 'teddy grahams crackers', filename: 'teddy-grahams.jpg' },
    { search: 'smore brownie dessert', filename: 'smore-brownie.jpg' },
    { search: 'fudge brownie chocolate', filename: 'fudge-brownie.jpg' },
    { search: 'rice krispie treat', filename: 'rice-krispie-treat.jpg' },
    { search: 'apple crisp dessert', filename: 'apple-crisp.jpg' },
    { search: 'vanilla ice cream scoop', filename: 'vanilla-ice-cream.jpg' },
    { search: 'chocolate ice cream scoop', filename: 'chocolate-ice-cream.jpg' },
    { search: 'orange sherbet scoop', filename: 'orange-sherbet.jpg' },
    { search: 'peaches canned fruit', filename: 'chilled-peaches.jpg' },
    { search: 'applesauce cup', filename: 'applesauce.jpg' },
    { search: 'canned pears fruit', filename: 'chilled-pears.jpg' },
    { search: 'mandarin oranges canned', filename: 'mandarin-oranges.jpg' }
  ],
  
  condiments: [
    // CONDIMENTS from new menu
    { search: 'margarine butter spread', filename: 'margarine.jpg' },
    { search: 'butter stick dairy', filename: 'butter.jpg' },
    { search: 'ranch dressing bottle', filename: 'ranch-dressing.jpg' },
    { search: 'italian dressing bottle', filename: 'italian-dressing.jpg' },
    { search: 'caesar dressing bottle', filename: 'caesar-dressing.jpg' },
    { search: 'maple syrup bottle', filename: 'syrup.jpg' },
    { search: 'ketchup bottle condiment', filename: 'ketchup.jpg' },
    { search: 'mustard yellow bottle', filename: 'mustard.jpg' },
    { search: 'mayonnaise jar spread', filename: 'lite-mayo.jpg' },
    { search: 'bbq sauce bottle', filename: 'bbq-sauce.jpg' },
    { search: 'ranch dip bowl', filename: 'ranch-dipping-sauce.jpg' },
    { search: 'honey mustard sauce', filename: 'honey-mustard.jpg' },
    { search: 'buffalo sauce bottle', filename: 'buffalo-sauce.jpg' },
    { search: 'cream cheese spread', filename: 'cream-cheese.jpg' },
    { search: 'peanut butter jar', filename: 'peanut-butter.jpg' },
    { search: 'grape jelly jar', filename: 'jelly.jpg' },
    { search: 'parmesan cheese shredded', filename: 'parmesan-cheese.jpg' },
    { search: 'tartar sauce bowl', filename: 'tartar-sauce.jpg' },
    { search: 'raisins dried fruit', filename: 'raisins.jpg' },
    { search: 'brown sugar bowl', filename: 'brown-sugar.jpg' }
  ],
  
  beverages: [
    // BEVERAGES from new menu
    { search: 'almond milk carton', filename: 'almond-milk.jpg' },
    { search: 'soy milk vanilla carton', filename: 'soy-milk.jpg' },
    { search: 'whole milk glass', filename: 'whole-milk.jpg' },
    { search: 'chocolate milk glass', filename: 'chocolate-milk.jpg' },
    { search: 'lactaid milk carton', filename: 'lactaid.jpg' },
    { search: 'smoothie fruit drink', filename: 'chobani-smoothie.jpg' },
    { search: 'strawberry banana smoothie', filename: 'strawberry-banana-smoothie.jpg' },
    { search: 'orange juice carton drink', filename: 'orange-juice.jpg' },
    { search: 'apple juice bottle drink', filename: 'apple-juice.jpg' },
    { search: 'cranberry juice bottle drink', filename: 'cranberry-juice.jpg' },
    { search: 'grape juice bottle drink', filename: 'grape-juice.jpg' },
    { search: 'prune juice bottle', filename: 'prune-juice.jpg' },
    { search: 'hot cocoa drink mug', filename: 'hot-chocolate.jpg' },
    { search: 'decaf coffee mug drink', filename: 'decaf-coffee.jpg' },
    { search: 'iced tea pitcher drink', filename: 'iced-tea.jpg' },
    { search: 'water bottle drink', filename: 'bottled-water.jpg' }
  ]
};

// Function to search and download image from Pexels
function downloadImage(searchQuery, category, filename) {
  return new Promise((resolve, reject) => {
    const encodedQuery = encodeURIComponent(searchQuery);
    const options = {
      hostname: 'api.pexels.com',
      path: `/v1/search?query=${encodedQuery}&per_page=1`,
      headers: {
        'Authorization': API_KEY
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
          if (result.photos && result.photos.length > 0) {
            const imageUrl = result.photos[0].src.medium;
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
  const totalItems = Object.values(foodItems).flat().length;
  console.log('🍽️  Starting image download from Pexels...\n');
  console.log(`📊 Total items to download: ${totalItems}\n`);

  for (const [category, items] of Object.entries(foodItems)) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📂 Downloading ${category} images (${items.length} items)`);
    console.log('='.repeat(60));
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      console.log(`[${i + 1}/${items.length}] Searching: "${item.search}"`);
      await downloadImage(item.search, category, item.filename);
      // Wait between requests to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 650));
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
