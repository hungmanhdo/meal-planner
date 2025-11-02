// Meal Planner Application

// State Management
let mealPlans = {
    breakfast: [],
    snack1: [],
    lunch: [],
    snack2: [],
    dinner: []
};

// Track which meals have already shown their completion animation
let completedMeals = {
    breakfast: false,
    snack1: false,
    lunch: false,
    snack2: false,
    dinner: false
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
        renderAllMeals(); // Re-render all meals to update progress bars and goal indicators
    });
});

// Meal Exchange Goals
function getMealExchangeGoal(mealType) {
    // Regular meals get the full goal amount, snacks get half
    const isSnack = mealType.startsWith('snack');
    return isSnack ? Math.ceil(currentGoal / 2) : currentGoal;
}

// Get Progress Status for UI indicators
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

// Modal Functions
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
    
    // Continue with modal opening if goal not reached
    currentMeal = mealType;
    const modal = document.getElementById('foodModal');
    modal.classList.add('active');
    
    // Update modal header to show goal progress
    updateModalHeader(mealType);
    
    renderFoodGrid();
    
    // Reset search and category
    document.getElementById('foodSearch').value = '';
    activeCategory = 'all';
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.category-btn').classList.add('active');
}

// Notification for meal goal reached
function showGoalReachedNotification(mealType) {
    // Format the meal name for display (e.g. "breakfast" -> "Breakfast")
    const mealName = mealType.charAt(0).toUpperCase() + mealType.slice(1);
    
    // Create notification element if it doesn't exist
    let notification = document.getElementById('goal-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'goal-notification';
        notification.className = 'goal-notification';
        document.body.appendChild(notification);
    }
    
    // Set notification content and show it
    notification.innerHTML = `
        <div class="notification-icon">✓</div>
        <div class="notification-content">
            <h3>${mealName} Goal Reached</h3>
            <p>You've reached your exchange goal for ${mealName}.</p>
        </div>
        <button class="notification-close" onclick="this.parentElement.classList.remove('active')">×</button>
    `;
    
    // Animate the notification
    notification.classList.add('active');
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        notification.classList.remove('active');
    }, 5000);
}

// Update modal header with goal progress information
function updateModalHeader(mealType) {
    const modalHeader = document.querySelector('.modal-header h2');
    const foods = mealPlans[mealType];
    const totalExchanges = calculateTotalExchanges(foods);
    const exchangeCount = Object.values(totalExchanges).reduce((sum, val) => sum + val, 0);
    const mealGoal = getMealExchangeGoal(mealType);
    const remaining = Math.max(0, mealGoal - exchangeCount);
    
    // Create goal progress element if it doesn't exist
    let goalProgress = document.getElementById('modalGoalProgress');
    if (!goalProgress) {
        goalProgress = document.createElement('div');
        goalProgress.id = 'modalGoalProgress';
        goalProgress.className = 'modal-goal-progress';
        modalHeader.parentNode.insertBefore(goalProgress, modalHeader.nextSibling);
    }
    
    // Get meal name for display
    const mealName = mealType.charAt(0).toUpperCase() + mealType.slice(1);
    const status = getMealProgressStatus(exchangeCount, mealGoal);
    
    goalProgress.innerHTML = `
        <div class="goal-progress-bar">
            <div class="goal-progress-fill ${status}" style="width: ${Math.min(100, (exchangeCount / mealGoal) * 100)}%"></div>
        </div>
        <div class="goal-progress-text">
            <span class="current">${exchangeCount}</span>/<span class="goal">${mealGoal}</span> exchanges
            ${remaining > 0 ? `<span class="remaining">(${remaining} more needed)</span>` : '<span class="complete">✓ Goal complete!</span>'}
        </div>
    `;
    
    // Update modal title
    modalHeader.textContent = `Add Food to ${mealName}`;
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
    
    // Check if meal has reached its goal
    const totalExchanges = calculateTotalExchanges(foods);
    const exchangeCount = Object.values(totalExchanges).reduce((sum, val) => sum + val, 0);
    const mealGoal = getMealExchangeGoal(mealType);
    const isComplete = exchangeCount >= mealGoal;
    
    // Set data attribute on meal section for staggered animation
    const mealSection = container.closest('.meal-section');
    if (mealSection) {
        // Set index based on meal type for staggered animation
        const mealIndex = ['breakfast', 'snack1', 'lunch', 'snack2', 'dinner'].indexOf(mealType);
        mealSection.style.setProperty('--meal-index', mealIndex);
        
        // Update completion status
        if (isComplete) {
            mealSection.setAttribute('data-goal-complete', 'true');
        } else {
            mealSection.removeAttribute('data-goal-complete');
        }
    }
    
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
                <div class="food-item" style="--item-index: ${index}">
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
    
    // Update Add Food button based on goal completion
    updateAddFoodButton(mealType);
}

// Update Add Food Button based on goal completion
function updateAddFoodButton(mealType) {
    const totalExchanges = calculateTotalExchanges(mealPlans[mealType]);
    const exchangeCount = Object.values(totalExchanges).reduce((sum, val) => sum + val, 0);
    const mealGoal = getMealExchangeGoal(mealType);
    const isComplete = exchangeCount >= mealGoal;
    
    // Get the add food button for this meal
    const addFoodBtn = document.querySelector(`#${mealType}Foods`).closest('.meal-section').querySelector('.add-food-btn');
    
    if (isComplete) {
        // Disable the button and show completion message
        addFoodBtn.disabled = true;
        addFoodBtn.classList.add('goal-complete');
        addFoodBtn.innerHTML = `<span class="goal-complete-icon">✓</span> Goal Completed`;
    } else {
        // Enable the button with normal text
        addFoodBtn.disabled = false;
        addFoodBtn.classList.remove('goal-complete');
        addFoodBtn.innerHTML = `<span>+</span> Add Food`;
    }
}

// Update Meal Progress
function updateMealProgress(mealType) {
    const foods = mealPlans[mealType];
    const totalExchanges = calculateTotalExchanges(foods);
    const exchangeCount = Object.values(totalExchanges).reduce((sum, val) => sum + val, 0);
    
    // Get the goal for this meal type
    const mealGoal = getMealExchangeGoal(mealType);
    
    // Update exchange count display
    const exchangesElement = document.getElementById(`${mealType}Exchanges`);
    const exchangeText = Object.entries(totalExchanges)
        .filter(([_, count]) => count > 0)
        .map(([type, count]) => `${count}${type}`)
        .join(', ');
    
    // Determine progress status for styling
    const status = getMealProgressStatus(exchangeCount, mealGoal);
    const isComplete = status === 'complete';
    
    // Update the HTML with goal information
    exchangesElement.innerHTML = `
        <span class="exchange-count ${status}">
            ${exchangeCount}/${mealGoal} exchanges
            ${isComplete ? '<span class="goal-complete-badge">✓</span>' : ''}
            ${exchangeText ? ': ' + exchangeText : ''}
        </span>
    `;
    
    // Update progress bar
    const progressPercent = Math.min((exchangeCount / mealGoal) * 100, 100);
    const progressBar = document.getElementById(`${mealType}Progress`);
    
    // Update progress bar width
    progressBar.style.width = progressPercent + '%';
    
    // Remove all status classes and add the current one
    progressBar.classList.remove('start', 'progress', 'approaching', 'complete');
    progressBar.classList.add(status);
    
    // Update meal section status
    const mealSection = document.getElementById(`${mealType}Foods`).closest('.meal-section');
    mealSection.classList.remove('goal-complete', 'goal-approaching', 'goal-progress', 'goal-start');
    mealSection.classList.add('goal-' + status);
    
    // Check if meal is newly completed - only show animation for newly completed meals, not on page load
    const wasCompletedBefore = completedMeals[mealType];
    
    if (isComplete) {
        // Mark as completed in our tracking object
        if (!wasCompletedBefore) {
            // This is a newly completed meal - show animation and mark as completed
            completedMeals[mealType] = true;
            saveToLocalStorage(); // Save the updated completion status
            
            // Add celebration animation
            mealSection.classList.add('goal-just-completed');
            
            // Remove the animation class after it plays
            setTimeout(() => {
                mealSection.classList.remove('goal-just-completed');
            }, 2000);
        }
        
        mealSection.setAttribute('data-completed', 'true');
    } else {
        // Reset completion status if the goal is no longer met
        completedMeals[mealType] = false;
        saveToLocalStorage();
        mealSection.removeAttribute('data-completed');
    }
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
    Object.keys(totals).forEach((type, index) => {
        const element = document.getElementById(`total${type}`);
        if (element) {
            const goal = goals[type] || 0;
            const current = totals[type];
            element.textContent = goal > 0 ? `${current}/${goal}` : current;
            
            // Add visual feedback if goal is met
            const badge = element.closest('.exchange-badge');
            
            // Add badge index for staggered animation
            badge.style.setProperty('--badge-index', index);
            
            // Toggle goal-met class based on goal completion
            if (goal > 0 && current >= goal) {
                badge.classList.add('goal-met');
                badge.style.opacity = '1';
                
                // Add celebratory animation if goal was just met
                if (!badge.hasAttribute('data-goal-met')) {
                    badge.setAttribute('data-goal-met', 'true');
                    badge.style.animation = 'none';
                    setTimeout(() => {
                        badge.style.animation = 'badgePop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both';
                    }, 10);
                }
            } else {
                badge.classList.remove('goal-met');
                badge.removeAttribute('data-goal-met');
                if (goal > 0) {
                    badge.style.opacity = '0.8';
                }
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
    localStorage.setItem('completedMeals', JSON.stringify(completedMeals));
}

function loadFromLocalStorage() {
    const savedPlans = localStorage.getItem('mealPlans');
    const savedGoal = localStorage.getItem('currentGoal');
    const savedCompletedMeals = localStorage.getItem('completedMeals');
    
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
    
    if (savedCompletedMeals) {
        try {
            completedMeals = JSON.parse(savedCompletedMeals);
        } catch (e) {
            console.error('Error loading completed meals:', e);
        }
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
