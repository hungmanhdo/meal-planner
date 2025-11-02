// Meal Planner Application

// State Management
let mealPlans = {
    breakfast: [],
    snack1: [],
    lunch: [],
    snack2: [],
    dinner: []
};

let currentMeal = '';
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

let currentGoal = 8;
let activeCategory = 'all';

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    renderAllMeals();
    updateDailySummary();
    
    // Add event listener for goal selector
    document.getElementById('dailyGoal').addEventListener('change', function(e) {
        currentGoal = parseInt(e.target.value);
        saveToLocalStorage();
        updateDailySummary();
    });
});

// Modal Functions
function openFoodModal(mealType) {
    currentMeal = mealType;
    const modal = document.getElementById('foodModal');
    modal.classList.add('active');
    renderFoodGrid();
    
    // Reset search and category
    document.getElementById('foodSearch').value = '';
    activeCategory = 'all';
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.category-btn').classList.add('active');
}

function closeFoodModal() {
    const modal = document.getElementById('foodModal');
    modal.classList.remove('active');
    currentMeal = '';
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('foodModal');
    if (e.target === modal) {
        closeFoodModal();
    }
});

// Filter Functions
function filterByCategory(category) {
    activeCategory = category;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderFoodGrid();
}

function filterFoods() {
    renderFoodGrid();
}

// Render Food Grid
function renderFoodGrid() {
    const searchTerm = document.getElementById('foodSearch').value.toLowerCase();
    const foodGrid = document.getElementById('foodGrid');
    foodGrid.innerHTML = '';
    
    // Get all foods based on category
    let foods = [];
    if (activeCategory === 'all') {
        foods = [
            ...foodDatabase.breakfast,
            ...foodDatabase.lunchDinner,
            ...foodDatabase.sides,
            ...foodDatabase.snacks,
            ...foodDatabase.desserts,
            ...foodDatabase.condiments,
            ...foodDatabase.beverages
        ];
    } else {
        foods = foodDatabase[activeCategory] || [];
    }
    
    // Filter by search term
    if (searchTerm) {
        foods = foods.filter(food => 
            food.name.toLowerCase().includes(searchTerm)
        );
    }
    
    // Render food cards
    foods.forEach(food => {
        const card = createFoodCard(food);
        foodGrid.appendChild(card);
    });
    
    // Show empty state if no foods found
    if (foods.length === 0) {
        foodGrid.innerHTML = '<div class="empty-state"><p>No foods found</p></div>';
    }
}

function createFoodCard(food) {
    const card = document.createElement('div');
    card.className = 'food-card';
    
    const exchangeTags = Object.entries(food.exchanges)
        .map(([type, count]) => `<span class="exchange-tag ${type}">${count}${type}</span>`)
        .join('');
    
    card.innerHTML = `
        <img src="${food.image}" alt="${food.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27150%27%3E%3Crect fill=%27%23E2E8F0%27 width=%27200%27 height=%27150%27/%3E%3Ctext fill=%27%23718096%27 font-family=%27Arial%27 font-size=%2714%27 x=%2750%25%27 y=%2750%25%27 text-anchor=%27middle%27 dy=%27.3em%27%3ENo Image%3C/text%3E%3C/svg%3E'">
        <div class="food-card-info">
            <div class="food-card-name">${food.name}</div>
            <div class="food-card-exchanges">${exchangeTags || '<span style="color: #718096; font-size: 0.8rem;">No exchanges</span>'}</div>
        </div>
        <div class="quantity-selector">
            <button class="qty-btn" onclick="event.stopPropagation(); changeQuantity(this, -1)">-</button>
            <input type="number" class="qty-input" value="1" min="1" max="99" onclick="event.stopPropagation()">
            <button class="qty-btn" onclick="event.stopPropagation(); changeQuantity(this, 1)">+</button>
        </div>
        <button class="add-to-meal-btn" onclick="event.stopPropagation(); addFoodToMealWithQuantity(this)">Add to Meal</button>
    `;
    
    // Store food data on the card
    card.foodData = food;
    
    return card;
}

// Change quantity in food card
function changeQuantity(btn, delta) {
    const input = btn.parentElement.querySelector('.qty-input');
    let value = parseInt(input.value) + delta;
    if (value < 1) value = 1;
    if (value > 99) value = 99;
    input.value = value;
}

// Add food with quantity
function addFoodToMealWithQuantity(btn) {
    const card = btn.closest('.food-card');
    const quantity = parseInt(card.querySelector('.qty-input').value);
    const food = card.foodData;
    
    addFoodToMeal(food, quantity);
}

// Add Food to Meal
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

// Remove Food from Meal
function removeFoodFromMeal(mealType, index) {
    mealPlans[mealType].splice(index, 1);
    saveToLocalStorage();
    renderMeal(mealType);
    updateDailySummary();
}

// Update Food Quantity
function updateFoodQuantity(mealType, index, newQuantity) {
    // Ensure quantity doesn't go below 1
    newQuantity = Math.max(1, newQuantity);
    
    // Update the quantity
    mealPlans[mealType][index].quantity = newQuantity;
    
    // Save changes and update UI
    saveToLocalStorage();
    renderMeal(mealType);
    updateDailySummary();
}

// Render Specific Meal
function renderMeal(mealType) {
    const container = document.getElementById(`${mealType}Foods`);
    const foods = mealPlans[mealType];
    
    if (foods.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No foods added yet</p><p style="font-size: 0.9rem;">Click "+ Add Food" to get started</p></div>';
    } else {
        container.innerHTML = foods.map((food, index) => {
            const quantity = food.quantity || 1;
            const exchangeTags = Object.entries(food.exchanges)
                .map(([type, count]) => {
                    const totalCount = count * quantity;
                    return `<span class="exchange-tag ${type}">${totalCount}${type}</span>`;
                })
                .join('');
            
            return `
                <div class="food-item">
                    ${quantity > 1 ? `<div class="quantity-badge">${quantity}x</div>` : ''}
                    <img src="${food.image}" alt="${food.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2760%27 height=%2760%27%3E%3Crect fill=%27%23E2E8F0%27 width=%2760%27 height=%2760%27/%3E%3C/svg%3E'">
                    <div class="food-item-info">
                        <div class="food-item-name">${food.name}</div>
                        <div class="food-item-exchanges">${exchangeTags || '<span style="color: #718096; font-size: 0.75rem;">No exchanges</span>'}</div>
                    </div>
                    <div class="quantity-control-panel">
                        <button class="quantity-control-btn" onclick="updateFoodQuantity('${mealType}', ${index}, ${quantity - 1})">-</button>
                        <input type="number" class="quantity-control-input" value="${quantity}" min="1" max="99" 
                            onchange="updateFoodQuantity('${mealType}', ${index}, parseInt(this.value) || 1)">
                        <button class="quantity-control-btn" onclick="updateFoodQuantity('${mealType}', ${index}, ${quantity + 1})">+</button>
                    </div>
                    <button class="remove-food-btn" onclick="removeFoodFromMeal('${mealType}', ${index})">×</button>
                </div>
            `;
        }).join('');
    }
    
    // Update meal exchange count and progress
    updateMealProgress(mealType);
}

// Update Meal Progress
function updateMealProgress(mealType) {
    const foods = mealPlans[mealType];
    const totalExchanges = calculateTotalExchanges(foods);
    const exchangeCount = Object.values(totalExchanges).reduce((sum, val) => sum + val, 0);
    
    // Update exchange count display
    const exchangesElement = document.getElementById(`${mealType}Exchanges`);
    const exchangeText = Object.entries(totalExchanges)
        .filter(([_, count]) => count > 0)
        .map(([type, count]) => `${count}${type}`)
        .join(', ');
    
    exchangesElement.innerHTML = `<span class="exchange-count">${exchangeCount} exchanges${exchangeText ? ': ' + exchangeText : ''}</span>`;
    
    // Update progress bar (assuming 8 exchanges as a reasonable meal goal)
    const mealGoal = currentGoal / 3; // Rough estimate per meal
    const progressPercent = Math.min((exchangeCount / mealGoal) * 100, 100);
    const progressBar = document.getElementById(`${mealType}Progress`);
    progressBar.style.width = progressPercent + '%';
}

// Calculate Total Exchanges
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

// Update Daily Summary
function updateDailySummary() {
    const allFoods = [
        ...mealPlans.breakfast,
        ...mealPlans.snack1,
        ...mealPlans.lunch,
        ...mealPlans.snack2,
        ...mealPlans.dinner
    ];
    
    const totals = calculateTotalExchanges(allFoods);
    const goals = dailyGoals[currentGoal];
    
    // Update each exchange badge
    Object.keys(totals).forEach(type => {
        const element = document.getElementById(`total${type}`);
        if (element) {
            const goal = goals[type] || 0;
            const current = totals[type];
            element.textContent = goal > 0 ? `${current}/${goal}` : current;
            
            // Add visual feedback if goal is met
            const badge = element.closest('.exchange-badge');
            if (goal > 0 && current >= goal) {
                badge.style.opacity = '1';
            } else if (goal > 0) {
                badge.style.opacity = '0.7';
            }
        }
    });
}

// Render All Meals
function renderAllMeals() {
    Object.keys(mealPlans).forEach(mealType => {
        renderMeal(mealType);
    });
}

// Local Storage Functions
function saveToLocalStorage() {
    localStorage.setItem('mealPlans', JSON.stringify(mealPlans));
    localStorage.setItem('currentGoal', currentGoal.toString());
}

function loadFromLocalStorage() {
    const savedPlans = localStorage.getItem('mealPlans');
    const savedGoal = localStorage.getItem('currentGoal');
    
    if (savedPlans) {
        try {
            mealPlans = JSON.parse(savedPlans);
        } catch (e) {
            console.error('Error loading meal plans:', e);
        }
    }
    
    if (savedGoal) {
        currentGoal = parseInt(savedGoal);
        document.getElementById('dailyGoal').value = currentGoal;
    }
}

// Clear All Meals (Optional utility function)
function clearAllMeals() {
    if (confirm('Are you sure you want to clear all meals?')) {
        mealPlans = {
            breakfast: [],
            snack1: [],
            lunch: [],
            snack2: [],
            dinner: []
        };
        saveToLocalStorage();
        renderAllMeals();
        updateDailySummary();
    }
}

// Export meal plan (Optional feature)
function exportMealPlan() {
    const plan = {
        date: new Date().toLocaleDateString(),
        goal: currentGoal,
        meals: mealPlans
    };
    
    const dataStr = JSON.stringify(plan, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `meal-plan-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Print meal plan (Optional feature)
function printMealPlan() {
    window.print();
}
