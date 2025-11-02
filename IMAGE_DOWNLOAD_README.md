# Food Image Download Guide

## Getting Better Quality Images with Unsplash

The new `download-images-unsplash.js` script uses Unsplash API for higher quality, more accurate food photography compared to Pexels.

## Why Unsplash?

✅ **Higher Quality**: Professional, high-resolution food photography  
✅ **Better Accuracy**: More focused, close-up shots of specific food items  
✅ **Consistent Style**: Professional food styling across all images  
✅ **Free Tier**: 50 requests/hour is sufficient for downloading all 161 images  

---

## Step 1: Get Your Unsplash API Key

1. **Go to Unsplash Developers**: https://unsplash.com/developers
2. **Sign up / Log in** with your account
3. **Register a New Application**:
   - Click "New Application"
   - Accept the terms
   - Fill in application details:
     - **Application name**: "Meal Planner" (or any name)
     - **Description**: "Food image downloader for meal planning app"
4. **Copy Your Access Key** from the application dashboard

---

## Step 2: Update the Script

1. Open `download-images-unsplash.js`
2. Find this line:
   ```javascript
   const ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY';
   ```
3. Replace `YOUR_UNSPLASH_ACCESS_KEY` with your actual key:
   ```javascript
   const ACCESS_KEY = 'your_actual_key_here';
   ```

---

## Step 3: Run the Download Script

### Option A: Download All Images at Once
```bash
node download-images-unsplash.js
```

This will take approximately **3+ hours** due to rate limiting (1 request per second).

### Option B: Download by Category (Faster)
You can modify the script to download one category at a time if needed.

---

## What Gets Downloaded

The script will download **161 high-quality food images** organized in folders:

- ✅ `images/breakfast/` - 59 items (scrambled eggs, pancakes, cereals, etc.)
- ✅ `images/lunch-dinner/` - 22 items (chicken parmesan, pasta, soups, etc.)
- ✅ `images/sides/` - 21 items (rice, vegetables, bread, etc.)
- ✅ `images/snacks/` - 9 items (fruit, cheese sticks, veggies, etc.)
- ✅ `images/desserts/` - 14 items (cookies, ice cream, brownies, etc.)
- ✅ `images/condiments/` - 20 items (sauces, spreads, dressings, etc.)
- ✅ `images/beverages/` - 16 items (milk, juices, smoothies, etc.)

---

## Improved Search Terms

The Unsplash script uses better search terms for more accurate results:

| Old Search | New Search | Result |
|------------|------------|---------|
| "scrambled eggs breakfast" | "scrambled eggs plate" | Close-up of eggs on plate |
| "cottage cheese bowl" | "cottage cheese bowl" | Actual cottage cheese |
| "pancakes stack" | "pancakes stack" | Professional pancake photo |

---

## Image Quality

- **Resolution**: Regular size (~1080px width) - perfect for web use
- **Format**: JPG - optimized for fast loading
- **Style**: Professional food photography with consistent lighting

---

## Troubleshooting

### Rate Limit Error
If you hit the rate limit:
- Wait 1 hour and resume
- The script preserves existing images
- Only failed downloads will be retried

### No Image Found
If some images return "no results":
- The search term may be too specific
- Try modifying the search query in the script
- Or manually download and place in the correct folder

---

## Alternative: Keep Pexels Images

If you prefer to keep the current Pexels images and only update specific ones:

1. Identify which images need updating
2. Manually download better images from Unsplash.com
3. Place them in the appropriate folder with the correct filename

---

## Next Steps After Download

Once images are downloaded, open the meal planner app:

```bash
open index.html
```

Browse through food categories to verify all images display correctly!

---

## Need Help?

- Unsplash API Docs: https://unsplash.com/documentation
- Unsplash Support: https://help.unsplash.com/

Happy Meal Planning! 🍽️
