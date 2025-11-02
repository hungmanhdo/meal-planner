# Meal Planner Application - Memory Bank

This document provides a comprehensive overview of all functionalities, features, and technical implementation details of the Meal Planner application.

## Table of Contents

1. [Core Features](#core-features)
2. [Data Structure](#data-structure)
3. [Exchange System](#exchange-system)
4. [User Interface Components](#user-interface-components)
5. [Food Management](#food-management)
6. [Storage and Persistence](#storage-and-persistence)
7. [Visual Feedback and Animations](#visual-feedback-and-animations)
8. [Recently Added Features](#recently-added-features)
9. [Utility Functions](#utility-functions)
10. [Future Enhancements](#future-enhancements)

---

## Core Features

### Meal Planning System

The application allows users to plan five meals per day:
- Breakfast
- Snack 1
- Lunch
- Snack 2
- Dinner

Users can add food items to each meal, with each food item having associated exchange values.

### Food Database

The application includes a comprehensive food database with categorized food items:
- Breakfast items
- Lunch/Dinner items
- Sides
- Snacks
- Desserts
- Condiments
- Beverages

Each food item includes:
- Name
- Image path
- Exchange values (nutritional exchange units)

### Exchange Tracking

The application tracks nutritional exchanges across different categories:
- Grain (G)
- Protein (P) 
- Dairy (D)
- Fruit (FR)
- Vegetable (V)
- Fat (FA)
- Other/Extra (EX)

Users can set daily exchange goals and track progress toward meeting these goals.

### Goal System

- Users can select different daily exchange goals (8, 10, 12, 14, 16, 18, 20, or 22 exchanges)
- Each goal has specific targets for different exchange types
- Visual progress indicators show progress toward exchange goals
- Special handling for when goals are reached

---

## Data Structure

### State Management

The application maintains several key state variables:

```javascript
// Main storage for meal contents
let mealPlans = {
    breakfast: [],
    snack1: [],
    lunch: [],
    snack2: [],
    dinner: []
};

// Track completed meal animations
let completedMeals = {
    breakfast: false,
    snack1: false,
    lunch: false,
    snack2: false,
    dinner: false
};

// Currently active meal for food addition
let currentMeal = '';

// Exchange goals for different calorie levels
let dailyGoals = {
    8: { G: 2, P: 2, D: 3, FR: 1, V: 0, FA: 0 },
    10: { G: 3, P: 3, D: 3, FR: 1, V: 0, FA: 0 },
    12: { G: 4, P: 3, D: 3, FR: 1, V: 0, FA: 1 },
    14: { G: 4, P: 4, D: 3, FR: 2, V: 0, FA: 1 },
    16: { G: 5, P: 5, D: 3, FR: 2, V: 0, FA: 1 },
    18: { G: 6, P: 6, D: 3, FR: 2, V: 0, FA: 1 },
    20: { G: 6, P: 6, D: 3, FR: 3, V: 0, FA: 2 },
    22: { G: 6, P: 6, D: 3, FR: 3, V: 0, FA: 4 }
};

// Currently selected goal
let currentGoal = 8;

// Active food category filter
let activeCategory = 'all';
```

### Food Item Structure

Each food item in the database follows this structure:

```javascript
{
    name: "Food Name",
    image: "path/to/image.jpg",
    exchanges: { 
        G: 1,  // Number of grain exchanges
        P: 2,  // Number of protein exchanges
        // etc. for other exchange types
    }
}
```

When added to a meal, food items gain a `quantity` property:

```javascript
{
    name: "Food Name",
    image: "path/to/image.jpg",
    exchanges: { ... },
    quantity: 2  // User-specified quantity
}
```

---

## Exchange System

### Exchange Categories

The application tracks seven types of nutritional exchanges:

| Code | Exchange Type | UI Color |
|------|--------------|----------|
| G    | Grain        | Amber    |
| P    | Protein      | Red      |
| D    | Dairy        | Blue     |
| FR   | Fruit        | Pink     |
| V    | Vegetable    | Green    |
| FA   | Fat          | Yellow   |
| EX   | Other        | Purple   |

### Exchange Calculation

Exchanges are calculated based on food items and their quantities in meals:

```javascript
function calculateTotalExchanges(foods) {
    const totals = { G: 0, P: 0, D: 0, FR: 0, V: 0, FA: 0 };
    
    foods.forEach(food => {
        const quantity = food.quantity || 1;
        Object.entries(food.exchanges).forEach(([type, count]) => {
            totals[type] = (totals[type] || 0) + (count * quantity);
        });
    });
    
    return totals;
}
```

### Goal System

- Regular meals (breakfast, lunch, dinner) get the full goal value
- Snacks get half the goal value (rounded up)
- Goal progress is visually indicated with different status indicators:
  - Start: 0-39% of goal
  - Progress: 40-69% of goal
  - Approaching: 70-99% of goal
  - Complete: 100%+ of goal

---

## User Interface Components

### Main Sections

1. **Header**
   - Application title and subtitle
   - Goal selector dropdown

2. **Daily Summary**
   - Exchange total badges for each exchange type
   - Visual indicators for goal completion

3. **Meal Sections**
   - Individual sections for each of the five meals
   - Progress bars showing goal completion
   - Lists of added food items
   - "Add Food" button for each meal

4. **Food Selection Modal**
   - Search functionality
   - Category filtering
   - Food grid with cards
   - Quantity selectors for food items

### Visual Elements

- **Exchange Badges**: Color-coded badges displaying exchange values
- **Progress Bars**: Visual indicators of goal completion status
- **Food Cards**: Visual representations of food items
- **Notifications**: Alerts for completed goals
- **Empty States**: Placeholder content when no foods are added

---

## Food Management

### Adding Food

1. Users click "Add Food" button for a meal
2. Food selection modal appears (unless goal already reached)
3. Users can browse/search/filter food items
4. Users can set quantity with +/- buttons
5. Upon adding, the application:
   - Checks if food already exists in meal
   - If yes: increases quantity of existing food
   - If no: adds as new food item
   - Updates all related UI elements

```javascript
function addFoodToMeal(food, quantity = 1) {
    // Check if this food already exists in the current meal
    const existingFoodIndex = mealPlans[currentMeal].findIndex(item => item.name === food.name);
    
    if (existingFoodIndex !== -1) {
        // Food already exists, increase quantity
        mealPlans[currentMeal][existingFoodIndex].quantity += quantity;
    } else {
        // Food doesn't exist, add as new
        const foodItem = {
            ...food,
            quantity: quantity
        };
        mealPlans[currentMeal].push(foodItem);
    }
    
    saveToLocalStorage();
    renderMeal(currentMeal);
    updateDailySummary();
    closeFoodModal();
}
```

### Removing Food

- Each food item has a remove button
- Clicking removes the food from the meal completely
- UI is updated to reflect the change

### Adjusting Quantity

- Hover over food items to reveal quantity controls
- Users can increase/decrease quantity or type a specific value
- Quantities below 1 are automatically set to 1
- Exchange calculations update automatically

---

## Storage and Persistence

The application uses localStorage to persist user data across sessions:

```javascript
// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('mealPlans', JSON.stringify(mealPlans));
    localStorage.setItem('currentGoal', currentGoal.toString());
    localStorage.setItem('completedMeals', JSON.stringify(completedMeals));
}

// Load from localStorage
function loadFromLocalStorage() {
    const savedPlans = localStorage.getItem('mealPlans');
    const savedGoal = localStorage.getItem('currentGoal');
    const savedCompletedMeals = localStorage.getItem('completedMeals');
    
    // Loading logic for each item...
}
```

### Stored Data

The application stores:
1. All meal plans with food items and quantities
2. The current goal setting
3. Record of which meals have shown completion animations

### Data Export

Users can export their meal plan as a JSON file:

```javascript
function exportMealPlan() {
    const plan = {
        date: new Date().toLocaleDateString(),
        goal: currentGoal,
        meals: mealPlans
    };
    
    // Export logic...
}
```

---

## Visual Feedback and Animations

### Goal Progress Indicators

- Progress bars indicate goal completion status
- Color coding provides intuitive feedback:
  - Gray: Starting (0-39%)
  - Blue: In progress (40-69%)
  - Orange: Approaching goal (70-99%)
  - Green: Goal completed (100%+)

### Animations

- Staggered animations for food items
- Celebratory animations when goals are met
- Smooth transitions for UI elements
- Pop-in effects for achievement indicators

### Notifications

- Goal completion notifications
- Visual celebrations when exchange targets are reached
- Status indicators throughout the interface

---

## Recently Added Features

### Meal Completion Handling

The application prevents adding more food when a meal has reached its exchange goal:

```javascript
function openFoodModal(mealType) {
    // Check if meal has reached its goal already
    const foods = mealPlans[mealType];
    const totalExchanges = calculateTotalExchanges(foods);
    const exchangeCount = Object.values(totalExchanges).reduce((sum, val) => sum + val, 0);
    const mealGoal = getMealExchangeGoal(mealType);
    
    // If goal has been reached, show notification and don't open modal
    if (exchangeCount >= mealGoal) {
        showGoalReachedNotification(mealType);
        return;
    }
    
    // Continue with modal opening...
}
```

### Completion Animation Fix

The application now tracks which meals have already shown their completion animation to prevent duplicate animations on page load:

```javascript
// Track which meals have already shown their completion animation
let completedMeals = {
    breakfast: false,
    snack1: false,
    lunch: false,
    snack2: false,
    dinner: false
};
```

### Favicon Integration

The application includes a favicon for browser identification:

```html
<!-- Favicon -->
<link rel="icon" href="favico.ico" type="image/x-icon">
<link rel="shortcut icon" href="favico.ico" type="image/x-icon">
<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" href="favico.ico">
<!-- Microsoft Tile -->
<meta name="msapplication-TileImage" content="favico.ico">
<meta name="msapplication-TileColor" content="#19848F">
```

---

## Utility Functions

### Goal Calculation

```javascript
// Get meal exchange goal value
function getMealExchangeGoal(mealType) {
    // Regular meals get the full goal amount, snacks get half
    const isSnack = mealType.startsWith('snack');
    return isSnack ? Math.ceil(currentGoal / 2) : currentGoal;
}

// Get progress status for UI indicators
function getMealProgressStatus(current, goal) {
    const percentage = (current / goal) * 100;
    
    if (percentage >= 100) {
        return 'complete'; // Goal reached or exceeded
    } else if (percentage >= 70) {
        return 'approaching'; // Close to goal
    } else if (percentage >= 40) {
        return 'progress'; // Making progress
    } else {
        return 'start'; // Just starting
    }
}
```

### Clear All Functionality

```javascript
// Clear all meals (utility function)
function clearAllMeals() {
    if (confirm('Are you sure you want to clear all meals?')) {
        mealPlans = {
            breakfast: [],
            snack1: [],
            lunch: [],
            snack2: [],
            dinner: []
        };
        
        // Reset completed meals tracking
        completedMeals = {
            breakfast: false,
            snack1: false,
            lunch: false,
            snack2: false,
            dinner: false
        };
        
        saveToLocalStorage();
        renderAllMeals();
        updateDailySummary();
    }
}
```

### Print Functionality

```javascript
// Print meal plan
function printMealPlan() {
    window.print();
}
```

---

## Future Enhancements

Potential areas for further development:

1. **Multi-day Planning**: Extend planning capability beyond a single day
2. **User Accounts**: Add user authentication and cloud storage
3. **Custom Foods**: Allow users to add custom food items to the database
4. **Nutrition Analysis**: Provide more detailed nutritional information
5. **Meal Templates**: Save and reuse common meal combinations
6. **Shopping List Generation**: Create grocery lists from planned meals
7. **Mobile App Version**: Develop native mobile applications
8. **Meal Recommendations**: Suggest foods based on remaining exchange goals
9. **Historical Tracking**: Track exchange patterns over time
10. **Social Sharing**: Allow sharing meal plans with others

---

*Documentation created: November 2, 2025*
