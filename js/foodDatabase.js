// Complete food database with exchange values from Children's National Menu
// Exchange types: G=Grain, P=Protein, D=Dairy, FR=Fruit, V=Vegetable, FA=Fat, EX=Other

// Function to parse exchange strings like "1V, 3FA" into object format {V: 1, FA: 3}
function parseExchanges(exchangeString) {
  if (!exchangeString || exchangeString === '-') return {};
  
  const exchanges = {};
  const parts = exchangeString.split(', ');
  
  parts.forEach(part => {
    // Handle special case like "2P or 2D"
    if (part.includes(' or ')) {
      const options = part.split(' or ');
      // Use the first option by default
      const firstOption = options[0];
      const count = parseInt(firstOption);
      const type = firstOption.replace(/\d+/g, '');
      exchanges[type] = count;
    } else {
      // Normal case like "1V"
      const count = parseInt(part);
      const type = part.replace(/\d+/g, '');
      exchanges[type] = count;
    }
  });
  
  return exchanges;
}

const foodDatabase = {
  breakfast: [
    // BREAKFAST ENTREES
    { name: 'Scrambled Eggs', image: 'images/breakfast/scrambled-eggs.jpg', exchanges: { P: 2 } },
    { name: 'Baked French Toast Sticks', image: 'images/breakfast/baked-french-toast-sticks.jpg', exchanges: { G: 2 } },
    { name: 'Whole Wheat French Toast', image: 'images/breakfast/whole-wheat-french-toast.jpg', exchanges: { G: 2 } },
    { name: 'Vegan Avocado Taco', image: 'images/breakfast/vegan-avocado-taco.jpg', exchanges: { G: 2, P: 2, V: 1, FA: 2 } },
    { name: 'Whole Wheat Pancakes', image: 'images/breakfast/whole-wheat-pancakes.jpg', exchanges: { G: 2 } },
    { name: 'Whole Wheat Blueberry Pancakes', image: 'images/breakfast/whole-wheat-blueberry-pancakes.jpg', exchanges: { G: 2 } },
    { name: 'Whole Wheat Chocolate Chip Pancakes', image: 'images/breakfast/whole-wheat-chocolate-chip-pancakes.jpg', exchanges: { G: 3 } },
    { name: 'Greek Yogurt Fruit Plate', image: 'images/breakfast/greek-yogurt-fruit-plate.jpg', exchanges: { D: 3, FR: 2 } },
    { name: 'Strawberry Banana French Toast Bowl', image: 'images/breakfast/strawberry-banana-french-toast-bowl.jpg', exchanges: { G: 6, P: 2, FR: 2 } },
    
    // BUILD YOUR OWN OMELET
    { name: 'Egg Whites', image: 'images/breakfast/egg-whites.jpg', exchanges: { P: 1 } },
    { name: 'Breakfast Blend', image: 'images/breakfast/breakfast-blend-eggs.jpg', exchanges: { P: 2 } },
    { name: 'Cheddar', image: 'images/breakfast/cheddar-cheese.jpg', exchanges: { D: 1 } },
    { name: 'Swiss', image: 'images/breakfast/swiss-cheese.jpg', exchanges: { D: 1 } },
    { name: 'American', image: 'images/breakfast/american-cheese.jpg', exchanges: { D: 1 } },
    { name: 'Provolone', image: 'images/breakfast/provolone-cheese.jpg', exchanges: { D: 1 } },
    { name: 'Diced Ham', image: 'images/breakfast/diced-ham.jpg', exchanges: { P: 1 } },
    { name: 'Turkey Sausage', image: 'images/breakfast/turkey-sausage.jpg', exchanges: { P: 1 } },
    { name: 'Diced Bacon', image: 'images/breakfast/diced-bacon.jpg', exchanges: { P: 2 } },
    { name: 'Turkey Bacon', image: 'images/breakfast/turkey-bacon.jpg', exchanges: { P: 1 } },
    { name: 'Sautéed Mushrooms', image: 'images/breakfast/sauteed-mushrooms.jpg', exchanges: {} },
    { name: 'Sautéed Onions', image: 'images/breakfast/sauteed-onions.jpg', exchanges: {} },
    { name: 'Green Peppers', image: 'images/breakfast/green-peppers.jpg', exchanges: {} },
    { name: 'Diced Tomatoes', image: 'images/breakfast/diced-tomatoes.jpg', exchanges: {} },
    { name: 'Salsa', image: 'images/breakfast/salsa.jpg', exchanges: {} },
    
    // BREAKFAST SIDES
    { name: 'Low Fat Cottage Cheese', image: 'images/breakfast/low-fat-cottage-cheese.jpg', exchanges: { D: 2 } },
    { name: 'Hard Cooked Egg', image: 'images/breakfast/hard-cooked-egg.jpg', exchanges: { P: 1 } },
    { name: 'Hash Brown Patty', image: 'images/breakfast/hash-brown-patty.jpg', exchanges: { G: 2 } },
    { name: 'Home Fries', image: 'images/breakfast/home-fries.jpg', exchanges: { G: 2 } },
    { name: 'Pork Bacon', image: 'images/breakfast/pork-bacon.jpg', exchanges: { P: 2 } },
    { name: 'Turkey Bacon', image: 'images/breakfast/turkey-bacon.jpg', exchanges: { P: 1 } },
    { name: 'Turkey Sausage Patty', image: 'images/breakfast/turkey-sausage-patty.jpg', exchanges: { P: 2 } },
    
    // HOT & COLD CEREALS
    { name: 'Oatmeal', image: 'images/breakfast/oatmeal.jpg', exchanges: { G: 3 } },
    { name: 'Cream of Wheat', image: 'images/breakfast/cream-of-wheat.jpg', exchanges: { G: 3 } },
    { name: 'Cheerios', image: 'images/breakfast/cheerios.jpg', exchanges: { G: 2 } },
    { name: 'Total Raisin Bran', image: 'images/breakfast/total-raisin-bran.jpg', exchanges: { G: 3 } },
    { name: 'Honey Nut Cheerios', image: 'images/breakfast/honey-nut-cheerios.jpg', exchanges: { G: 2 } },
    { name: 'Rice Chex', image: 'images/breakfast/rice-chex.jpg', exchanges: { G: 2 } },
    { name: 'Cornflakes', image: 'images/breakfast/cornflakes.jpg', exchanges: { G: 1 } },
    
    // BREAD BASKET
    { name: 'Blueberry Muffin', image: 'images/breakfast/blueberry-muffin.jpg', exchanges: { G: 3 } },
    { name: 'Cinnamon Roll', image: 'images/breakfast/cinnamon-roll.jpg', exchanges: { G: 4 } },
    { name: 'Whole Grain English Muffin', image: 'images/breakfast/whole-grain-english-muffin.jpg', exchanges: { G: 2 } },
    { name: 'English Muffin', image: 'images/breakfast/english-muffin.jpg', exchanges: { G: 2 } },
    { name: 'Bagel', image: 'images/breakfast/bagel.jpg', exchanges: { G: 3 } },
    { name: 'Cinnamon Raisin Bagel', image: 'images/breakfast/cinnamon-raisin-bagel.jpg', exchanges: { G: 3 } },
    { name: 'Flour Tortilla', image: 'images/breakfast/flour-tortilla.jpg', exchanges: { G: 2 } },
    { name: 'White Bread', image: 'images/breakfast/white-bread.jpg', exchanges: { G: 1 } },
    { name: 'Whole Wheat Bread', image: 'images/breakfast/whole-wheat-bread.jpg', exchanges: { G: 1 } },
    
    // FRUIT/YOGURT
    { name: 'Banana', image: 'images/breakfast/banana.jpg', exchanges: { FR: 2 } },
    { name: 'Orange', image: 'images/breakfast/orange.jpg', exchanges: { FR: 1 } },
    { name: 'Apple', image: 'images/breakfast/apple.jpg', exchanges: { FR: 1 } },
    { name: 'Fresh Fruit Cup', image: 'images/breakfast/fresh-fruit-cup.jpg', exchanges: { FR: 1 } },
    { name: 'Honeydew', image: 'images/breakfast/honeydew-melon.jpg', exchanges: { FR: 1 } },
    { name: 'Fresh Berries', image: 'images/breakfast/fresh-berries.jpg', exchanges: { FR: 1 } },
    { name: 'Cantaloupe', image: 'images/breakfast/cantaloupe.jpg', exchanges: { FR: 1 } },
    { name: 'Pineapple', image: 'images/breakfast/pineapple.jpg', exchanges: { FR: 1 } },
    { name: 'Low Fat Vanilla Yogurt', image: 'images/breakfast/low-fat-vanilla-yogurt.jpg', exchanges: { D: 3 } },
    { name: 'Low Fat Strawberry Yogurt', image: 'images/breakfast/low-fat-strawberry-yogurt.jpg', exchanges: { D: 2 } },
    { name: 'Roasted Apple Yogurt Parfait', image: 'images/breakfast/roasted-apple-yogurt-parfait.jpg', exchanges: { D: 1 } }
  ],
  
  lunchDinner: [
    // STARTERS
    { name: 'Tossed Garden Salad with Cucumbers and Tomato', image: 'images/lunch-dinner/tossed-garden-salad.jpg', exchanges: { V: 1 } },
    { name: 'Caesar Side Salad', image: 'images/lunch-dinner/caesar-side-salad.jpg', exchanges: { V: 1 } },
    { name: 'Celery and Carrots with Ranch', image: 'images/lunch-dinner/celery-and-carrots-with-ranch.jpg', exchanges: { V: 1, FA: 3 } },
    
    // SOUPS
    { name: 'Chicken Noodle Soup', image: 'images/lunch-dinner/chicken-noodle-soup.jpg', exchanges: { G: 1, P: 1 } },
    { name: 'Tomato Soup', image: 'images/lunch-dinner/tomato-soup.jpg', exchanges: { V: 2 } },
    
    // ENTREES
    { name: 'Chicken Parmesan', image: 'images/lunch-dinner/chicken-parmesan.jpg', exchanges: { P: 5 } },
    { name: 'Meatball Sub', image: 'images/lunch-dinner/meatball-sub.jpg', exchanges: { G: 4, P: 3 } },
    { name: 'Baked Fish Sticks', image: 'images/lunch-dinner/baked-fish-sticks.jpg', exchanges: { P: 4, FA: 1 } },
    { name: 'Roast Turkey', image: 'images/lunch-dinner/roast-turkey.jpg', exchanges: { P: 3 } },
    { name: 'Rigatoni with Meatballs', image: 'images/lunch-dinner/rigatoni-with-meatballs.jpg', exchanges: { G: 4, P: 3 } },
    { name: 'Macaroni & Cheese', image: 'images/lunch-dinner/macaroni-and-cheese.jpg', exchanges: { G: 4, D: 3 } },
    { name: 'Chicken Bites', image: 'images/lunch-dinner/chicken-bites.jpg', exchanges: { P: 3 } },
    { name: 'Chicken Tenders', image: 'images/lunch-dinner/chicken-tenders.jpg', exchanges: { P: 7 } },
    { name: 'Cheeseburger Slider', image: 'images/lunch-dinner/cheeseburger-slider.jpg', exchanges: { G: 2, P: 2, D: 1 } },
    { name: 'Beef Burrito with Salsa', image: 'images/lunch-dinner/beef-burrito.jpg', exchanges: { G: 4, P: 4, V: 1 } },
    { name: 'Cheese Quesadilla w/ Salsa', image: 'images/lunch-dinner/cheese-quesadilla.jpg', exchanges: { G: 3, D: 2 } },
    { name: 'Grilled Chicken Sandwich on Whole Wheat', image: 'images/lunch-dinner/grilled-chicken-sandwich.jpg', exchanges: { G: 3, P: 3 } },
    { name: 'Baked Tilapia', image: 'images/lunch-dinner/baked-tilapia.jpg', exchanges: { P: 2 } },
    { name: 'Hummus, Vegetable & Pita Plate', image: 'images/lunch-dinner/hummus-vegetable-pita-plate.jpg', exchanges: { G: 2, P: 2, V: 1 } },
    { name: 'Chicken Caesar Salad', image: 'images/lunch-dinner/chicken-caesar-salad.jpg', exchanges: { P: 2, V: 2, FA: 2 } },
    
    // SANDWICHES
    { name: 'Peanut Butter & Grape', image: 'images/lunch-dinner/peanut-butter-and-grape-sandwich.jpg', exchanges: { G: 2, P: 2, FA: 2 } },
    { name: 'Peanut Butter & Strawberry', image: 'images/lunch-dinner/peanut-butter-and-strawberry-sandwich.jpg', exchanges: { G: 2, P: 2, FA: 2 } }
  ],
  
  sides: [
    // BREADBASKET
    { name: 'Whole Wheat Roll', image: 'images/sides/whole-wheat-roll.jpg', exchanges: { G: 2 } },
    { name: 'White Roll', image: 'images/sides/white-roll.jpg', exchanges: { G: 2 } },
    { name: 'White Bread', image: 'images/breakfast/white-bread.jpg', exchanges: { G: 1 } },
    { name: 'Wheat Bread', image: 'images/breakfast/whole-wheat-bread.jpg', exchanges: { G: 1 } },
    { name: 'Garlic Breadstick', image: 'images/sides/garlic-breadstick.jpg', exchanges: { G: 1 } },
    { name: 'Flour Tortilla', image: 'images/breakfast/flour-tortilla.jpg', exchanges: { G: 2 } },
    
    // SIDES/VEGETABLES
    { name: 'Fresh Broccoli', image: 'images/sides/fresh-broccoli.jpg', exchanges: { V: 1 } },
    { name: 'Green Beans', image: 'images/sides/green-beans.jpg', exchanges: { V: 1 } },
    { name: 'Fresh Carrots', image: 'images/sides/fresh-carrots.jpg', exchanges: { V: 1 } },
    { name: 'Corn', image: 'images/sides/corn.jpg', exchanges: { G: 1 } },
    { name: 'Mashed Potatoes', image: 'images/sides/mashed-potatoes.jpg', exchanges: { G: 2 } },
    { name: 'Baked Tater Tots', image: 'images/sides/baked-tater-tots.jpg', exchanges: { G: 2 } },
    { name: 'Baked Sweet Potato', image: 'images/sides/baked-sweet-potato.jpg', exchanges: { G: 2 } },
    { name: 'Mashed Sweet Potatoes', image: 'images/sides/mashed-sweet-potatoes.jpg', exchanges: { G: 2 } },
    { name: 'Buttered Penne', image: 'images/sides/buttered-penne-pasta.jpg', exchanges: { G: 2 } },
    { name: 'Whole Grain Buttered Penne', image: 'images/sides/whole-grain-buttered-penne.jpg', exchanges: { G: 2 } },
    { name: 'Italian Rotini Salad', image: 'images/sides/italian-rotini-salad.jpg', exchanges: { G: 4, FA: 2 } },
    { name: 'Macaroni & Cheese (Side)', image: 'images/sides/macaroni-and-cheese-side.jpg', exchanges: { G: 2, D: 1 } },
    { name: 'Brown Rice', image: 'images/sides/brown-rice.jpg', exchanges: { G: 2 } },
    { name: 'Brown Rice & Beans', image: 'images/sides/brown-rice-and-beans.jpg', exchanges: { G: 2 } },
    { name: 'White Rice', image: 'images/sides/white-rice.jpg', exchanges: { G: 2 } },
    { name: 'Mozzarella String Cheese', image: 'images/sides/mozzarella-string-cheese.jpg', exchanges: { D: 1 } },
    { name: 'Baked Potato Chips', image: 'images/sides/baked-potato-chips.jpg', exchanges: { G: 2 } },
    { name: 'Pretzels', image: 'images/sides/pretzels.jpg', exchanges: { G: 2 } },
    { name: 'Goldfish Crackers', image: 'images/sides/goldfish-crackers.jpg', exchanges: { G: 2 } }
  ],
  
  snacks: [
    { name: 'Cucumber Slices', image: 'images/snacks/cucumber-slices.jpg', exchanges: { V: 1 } },
    { name: 'Celery Sticks', image: 'images/snacks/celery-sticks.jpg', exchanges: { V: 1 } },
    { name: 'Carrot Sticks', image: 'images/snacks/carrot-sticks.jpg', exchanges: { V: 1 } },
    { name: 'Apple Slices', image: 'images/snacks/apple-slices.jpg', exchanges: { FR: 1 } },
    { name: 'Orange Slices', image: 'images/snacks/orange-slices.jpg', exchanges: { FR: 1 } },
    { name: 'Fruit Salad', image: 'images/snacks/fruit-salad.jpg', exchanges: { FR: 1 } },
    { name: 'Yogurt Cup', image: 'images/snacks/yogurt-cup.jpg', exchanges: { D: 1 } },
    { name: 'Cheese Stick', image: 'images/snacks/cheese-stick.jpg', exchanges: { D: 1 } },
    { name: 'Crackers with Cheese', image: 'images/snacks/crackers-with-cheese.jpg', exchanges: { G: 2, D: 1 } }
  ],
  
  desserts: [
    // COOKIES/DESSERTS
    { name: 'Chocolate Chip Cookies', image: 'images/desserts/chocolate-chip-cookies.jpg', exchanges: { G: 3, FA: 3 } },
    { name: 'Oatmeal Raisin Cookies', image: 'images/desserts/oatmeal-raisin-cookies.jpg', exchanges: { G: 3, FA: 3 } },
    { name: 'Teddy Grahams', image: 'images/desserts/teddy-grahams.jpg', exchanges: { G: 2 } },
    { name: "S'more Brownie", image: 'images/desserts/smore-brownie.jpg', exchanges: { G: 3, FA: 3 } },
    { name: 'Fudge Brownie', image: 'images/desserts/fudge-brownie.jpg', exchanges: { G: 2, FA: 2 } },
    { name: 'Rice Krispie Treat', image: 'images/desserts/rice-krispie-treat.jpg', exchanges: { G: 3 } },
    { name: 'Apple Crisp', image: 'images/desserts/apple-crisp.jpg', exchanges: { G: 2, FR: 1, FA: 1 } },
    { name: 'Vanilla Ice Cream', image: 'images/desserts/vanilla-ice-cream.jpg', exchanges: { D: 2 } },
    { name: 'Chocolate Ice Cream', image: 'images/desserts/chocolate-ice-cream.jpg', exchanges: { D: 2 } },
    { name: 'Orange Sherbet', image: 'images/desserts/orange-sherbet.jpg', exchanges: { D: 2 } },
    
    // FRUITS
    { name: 'Chilled Peaches', image: 'images/desserts/chilled-peaches.jpg', exchanges: { FR: 1 } },
    { name: 'Applesauce', image: 'images/desserts/applesauce.jpg', exchanges: { FR: 1 } },
    { name: 'Chilled Pears', image: 'images/desserts/chilled-pears.jpg', exchanges: { FR: 1 } },
    { name: 'Fresh Fruit Cup', image: 'images/breakfast/fresh-fruit-cup.jpg', exchanges: { FR: 1 } },
    { name: 'Orange', image: 'images/breakfast/orange.jpg', exchanges: { FR: 1 } },
    { name: 'Apple', image: 'images/breakfast/apple.jpg', exchanges: { FR: 1 } },
    { name: 'Mandarin Oranges', image: 'images/desserts/mandarin-oranges.jpg', exchanges: { FR: 1 } },
    { name: 'Banana', image: 'images/breakfast/banana.jpg', exchanges: { FR: 2 } },
    { name: 'Fresh Berries', image: 'images/breakfast/fresh-berries.jpg', exchanges: { FR: 1 } },
    { name: 'Cantaloupe', image: 'images/breakfast/cantaloupe.jpg', exchanges: { FR: 1 } },
    { name: 'Honeydew', image: 'images/breakfast/honeydew-melon.jpg', exchanges: { FR: 1 } },
    { name: 'Fresh Pineapple', image: 'images/breakfast/pineapple.jpg', exchanges: { FR: 1 } }
  ],
  
  condiments: [
    // CONDIMENTS
    { name: 'Margarine', image: 'images/condiments/margarine.jpg', exchanges: { FA: 1 } },
    { name: 'Butter', image: 'images/condiments/butter.jpg', exchanges: { FA: 1 } },
    { name: 'Ranch Dressing', image: 'images/condiments/ranch-dressing.jpg', exchanges: { FA: 1 } },
    { name: 'Italian Dressing', image: 'images/condiments/italian-dressing.jpg', exchanges: { FA: 4 } },
    { name: 'Caesar Dressing', image: 'images/condiments/caesar-dressing.jpg', exchanges: { EX: 2 } },
    { name: 'Ketchup', image: 'images/condiments/ketchup.jpg', exchanges: {} },
    { name: 'Mustard', image: 'images/condiments/mustard.jpg', exchanges: { FA: 1 } },
    { name: 'Lite Mayo', image: 'images/condiments/lite-mayo.jpg', exchanges: { FA: 1 } },
    { name: 'BBQ Sauce', image: 'images/condiments/bbq-sauce.jpg', exchanges: { FA: 3 } },
    { name: 'Ranch Dipping Sauce', image: 'images/condiments/ranch-dipping-sauce.jpg', exchanges: { FA: 2 } },
    { name: 'Honey Mustard', image: 'images/condiments/honey-mustard.jpg', exchanges: {} },
    { name: 'Buffalo Sauce', image: 'images/condiments/buffalo-sauce.jpg', exchanges: {} },
    { name: 'Peanut Butter', image: 'images/condiments/peanut-butter.jpg', exchanges: { P: 2, FA: 2 } },
    { name: 'Jelly', image: 'images/condiments/jelly.jpg', exchanges: {} },
    { name: 'Parmesan Cheese', image: 'images/condiments/parmesan-cheese.jpg', exchanges: {} },
    { name: 'Tartar Sauce', image: 'images/condiments/tartar-sauce.jpg', exchanges: { FA: 1 } },
    { name: 'Salsa', image: 'images/condiments/salsa.jpg', exchanges: {} },
    { name: 'Raisins', image: 'images/condiments/raisins.jpg', exchanges: { FR: 1 } },
    { name: 'Brown Sugar', image: 'images/condiments/brown-sugar.jpg', exchanges: { EX: 1 } }
  ],
  
  beverages: [
    // BEVERAGES
    { name: 'Almond Milk', image: 'images/beverages/almond-milk.jpg', exchanges: { D: 2 } },
    { name: 'Soy Milk (Vanilla or Chocolate)', image: 'images/beverages/soy-milk.jpg', exchanges: { D: 3 } },
    { name: 'Whole Milk', image: 'images/beverages/whole-milk.jpg', exchanges: { D: 3 } },
    { name: '1% Chocolate Milk', image: 'images/beverages/chocolate-milk.jpg', exchanges: { D: 3 } },
    { name: 'Lactaid', image: 'images/beverages/lactaid.jpg', exchanges: { D: 2 } },
    { name: 'Chobani Peach Smoothie', image: 'images/beverages/chobani-smoothie.jpg', exchanges: { D: 3 } },
    { name: 'Chobani Strawberry Banana Smoothie', image: 'images/beverages/strawberry-banana-smoothie.jpg', exchanges: { D: 3 } },
    { name: 'Orange Juice', image: 'images/beverages/orange-juice.jpg', exchanges: { FR: 1 } },
    { name: 'Apple Juice', image: 'images/beverages/apple-juice.jpg', exchanges: { FR: 1 } },
    { name: 'Cranberry Juice', image: 'images/beverages/cranberry-juice.jpg', exchanges: { FR: 1 } },
    { name: 'Grape Juice', image: 'images/beverages/grape-juice.jpg', exchanges: { FR: 1 } },
    { name: 'Prune Juice', image: 'images/beverages/prune-juice.jpg', exchanges: { FR: 1 } },
    { name: 'Hot Chocolate', image: 'images/beverages/hot-chocolate.jpg', exchanges: { EX: 2 } },
    { name: 'Decaf Coffee', image: 'images/beverages/decaf-coffee.jpg', exchanges: {} },
    { name: 'Decaf Iced Tea', image: 'images/beverages/iced-tea.jpg', exchanges: {} },
    { name: 'Bottled Water', image: 'images/beverages/bottled-water.jpg', exchanges: {} }
  ]
};

// Exchange color mapping
const exchangeColors = {
  G: { color: '#F59E0B', label: 'Grain' },      // Amber
  P: { color: '#EF4444', label: 'Protein' },    // Red
  D: { color: '#3B82F6', label: 'Dairy' },      // Blue
  FR: { color: '#EC4899', label: 'Fruit' },     // Pink
  V: { color: '#10B981', label: 'Vegetable' },  // Green
  FA: { color: '#FBBF24', label: 'Fat' },       // Yellow
  EX: { color: '#8B5CF6', label: 'Other' }      // Purple
};
