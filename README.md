# 🍽️ Meal Planner - Exchange Tracker

A modern, beautiful web application for planning daily meals with exchange tracking based on the Children's National Medical Center exchange system.

## Why This App Matters

• **Simplifies Nutritional Exchange Tracking** — Makes it easy to follow specialized diets that require tracking food exchanges (like diabetes management or clinical nutrition plans)

• **Promotes Balanced Nutrition** — Ensures proper distribution of food groups through visual tracking of grains, proteins, dairy, fruits, vegetables, and fats

• **Saves Time on Meal Planning** — Random meal generation feature automatically creates balanced meals that meet nutritional goals

• **Enhances Dietary Compliance** — Visual progress indicators provide immediate feedback on how well daily nutritional goals are being met

• **Reduces Decision Fatigue** — Organized food database eliminates the stress of deciding what to eat while staying within dietary requirements

• **Supports Medical Nutrition Therapy** — Ideal tool for patients following exchange-based meal plans prescribed by healthcare providers

• **Visualizes Nutritional Balance** — Color-coded exchange tags make it easy to see the nutritional composition of meals at a glance

• **Provides Structure with Flexibility** — Allows customization of meals while maintaining nutritional guardrails

• **Enables Better Food Choices** — Encourages mindful eating by making nutritional content transparent and accessible

## Features

✨ **Modern Design**
- Clean, health-focused color scheme with fresh greens, warm oranges, and vibrant accents
- Responsive design that works on desktop, tablet, and mobile
- Beautiful food photography for all menu items
- Smooth animations and transitions

📊 **Exchange Tracking**
- Track 6 types of exchanges: Grain (G), Protein (P), Dairy (D), Fruit (FR), Vegetable (V), Fat (FA)
- Visual progress bars for each meal
- Daily summary dashboard with color-coded badges
- Configurable daily goals (8-22 exchanges)

🍳 **Meal Planning**
- Plan 3 main meals (Breakfast, Lunch, Dinner)
- Plan 2 snacks throughout the day
- Complete food database with 100+ items from the Children's National menu
- Search and filter functionality
- Add/remove foods with a click

💾 **Data Persistence**
- Automatically saves your meal plans to local storage
- Plans persist between sessions
- Easy to clear and start fresh

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### Usage

1. **Open the Application**
   - Simply open `index.html` in your web browser
   - Or use a local development server:
     ```bash
     # Using Python
     python -m http.server 8000
     # Then visit http://localhost:8000
     
     # Using Node.js
     npx http-server
     ```

2. **Select Your Daily Goal**
   - Choose your exchange goal from the dropdown (8-22 exchanges)
   - The goal corresponds to the advancement schedule from the menu

3. **Plan Your Meals**
   - Click "+ Add Food" for any meal
   - Browse or search for foods
   - Filter by category (Breakfast, Lunch/Dinner, Sides, Snacks)
   - Click a food card to add it to your meal

4. **Track Your Progress**
   - Watch the progress bars fill as you add foods
   - Monitor your daily exchange totals in the summary dashboard
   - Each exchange type is color-coded for easy tracking

5. **Remove Foods**
   - Click the × button next to any food to remove it
   - Your totals update automatically

## Food Database

The application includes a complete food database based on the Children's National Exchange Menu:

- **59 Breakfast Items**: Eggs, pancakes, cereals, fruits, yogurt, breads, and more
- **22 Lunch/Dinner Items**: Entrees, soups, salads, and sandwiches
- **21 Side Items**: Vegetables, starches, breads, and snacks
- **9 Snack Items**: Healthy snack options throughout the day

All foods include:
- High-quality images from Pexels
- Accurate exchange values (G, P, D, FR, V, FA)
- Easy-to-read names and labels

## Image Management

### Downloaded Images
All food images have been downloaded locally using the Pexels API and are organized in:
```
images/
├── breakfast/     (59 images)
├── lunch-dinner/  (22 images)
├── sides/         (21 images)
└── snacks/        (9 images)
```

### Re-downloading Images
If you need to refresh the images:

1. Get a free API key from [Pexels](https://www.pexels.com/api/)
2. Update the API key in `download-images.js`
3. Run the download script:
   ```bash
   node download-images.js
   ```

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, gradients, and animations
- **Vanilla JavaScript**: No frameworks - pure, performant JavaScript
- **Local Storage**: Client-side data persistence
- **Pexels API**: High-quality food photography

## Color Scheme

The application uses a health-focused color palette:

- **Primary Green**: `#4CAF50` - Health and nutrition
- **Secondary Orange**: `#FF9800` - Appetizing and energetic
- **Accent Teal**: `#00BCD4` - Clean and modern
- **Background Cream**: `#FAFAF8` - Warm and inviting

Exchange-specific colors:
- **Grain**: Amber `#F59E0B`
- **Protein**: Red `#EF4444`
- **Dairy**: Blue `#3B82F6`
- **Fruit**: Pink `#EC4899`
- **Vegetable**: Green `#10B981`
- **Fat**: Yellow `#FBBF24`

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Project Structure

```
meal-planner/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles
├── js/
│   ├── app.js              # Application logic
│   └── foodDatabase.js     # Complete food database
├── images/                 # All food images (111 total)
│   ├── breakfast/
│   ├── lunch-dinner/
│   ├── sides/
│   └── snacks/
├── download-images.js      # Image download script
└── README.md              # This file
```

## Customization

### Adding New Foods
Edit `js/foodDatabase.js` and add new food items:
```javascript
{
  name: 'Food Name',
  image: 'images/category/food-name.jpg',
  exchanges: { G: 2, P: 1, D: 0, FR: 0, V: 0, FA: 1 }
}
```

### Changing Goals
Modify the `dailyGoals` object in `js/app.js` to add or adjust exchange goals.

### Styling
All styles are in `css/styles.css`. CSS variables at the top make it easy to adjust colors.

## License

This project uses:
- Food images from [Pexels](https://www.pexels.com/) (Free to use)
- Based on Children's National Medical Center exchange menu

## Support

For issues or questions:
1. Check that all files are in the correct directories
2. Ensure images have downloaded properly
3. Clear browser cache and local storage if experiencing issues
4. Make sure JavaScript is enabled in your browser

## Future Enhancements

### Core Feature Enhancements
Potential features for future versions:
- Export meal plans as PDF
- Print-friendly view
- Recipe suggestions
- Nutritional information beyond exchanges
- Multi-day meal planning
- Meal plan templates
- Shopping list generation

### AI Enhancement Opportunities

#### Personalized Meal Recommendations
- **Adaptive Learning System**: AI that learns user preferences over time and suggests meals based on previous selections
- **Health Profile Integration**: Generate meal plans based on individual health metrics (BMI, activity level, health conditions)
- **Smart Meal Optimization**: Automatically balance nutrients across meals to achieve optimal distribution throughout the day

#### Enhanced Food Analysis
- **Nutritional Analysis**: Use computer vision to analyze photos of meals and estimate their exchange values
- **Recipe Parsing**: Extract exchange values from recipe websites automatically by analyzing ingredient lists
- **Alternative Suggestions**: Recommend healthier alternatives when users select foods high in certain exchanges

#### Predictive Features
- **Smart Exchange Forecasting**: Predict if a user will exceed their daily goals based on historical eating patterns
- **Hunger Pattern Recognition**: Learn when users typically add specific food types and pre-suggest options at those times
- **Health Outcome Predictions**: Project potential health improvements based on adherence to exchange goals

#### Natural Language Processing
- **Voice Input**: Allow users to add foods by speaking ("Add two slices of whole wheat bread to breakfast")
- **Meal Planning Assistant**: Chatbot that helps users plan their meals through conversational interaction
- **Smart Search**: Understand complex food queries ("Show me high-protein breakfast options under 3 exchanges")

#### Smart Automation
- **Adaptive Random Meal Generation**: Generate random meals that not only meet exchange goals but also align with user preferences
- **Automatic Meal Balancing**: Suggest additions or removals to optimize meals when users are close to their goals
- **Smart Grocery Lists**: Generate shopping lists based on planned meals with AI optimization for cost and nutritional value

#### Data Insights
- **Pattern Recognition**: Identify eating habits and visualize trends in exchange consumption
- **Progress Tracking**: Predict long-term nutritional balance based on current habits
- **Comparative Analysis**: Benchmark user's meal plans against optimal nutritional profiles for their demographic

#### Integration Possibilities
- **Wearable Device Sync**: Adjust recommendations based on real-time activity data from fitness trackers
- **Calendar Integration**: AI that suggests meals based on your schedule (quick breakfasts on busy mornings, etc.)
- **Environmental Context**: Factor in weather, season, and local food availability for more relevant suggestions

---

Made with ❤️ for healthy meal planning
