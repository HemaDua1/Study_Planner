# Frontend - Study Planner

Clean and modern study planning web application built with vanilla JavaScript.

## Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Serve the frontend:**
   ```bash
   npx serve
   ```

The frontend will run on `http://localhost:3000`

## Features

- Add and manage study subjects
- Set subject difficulty and weekly study hours
- Auto-generate balanced weekly study schedules
- View your personalized study plan
- Responsive design with a beautiful pink and white color scheme

## File Structure

- `index.html` - Main HTML file
- `style.css` - Styling with Montserrat font
- `app.js` - Main application entry point
- `js/` - JavaScript modules
  - `ui.js` - User interface handlers
  - `subjects.js` - Subject management API calls
  - `schedule.js` - Schedule generation and display
  - `storage.js` - LocalStorage utilities (legacy - now uses backend)

## How to Use

1. **Start the backend** (in a separate terminal from the backend folder):
   ```bash
   npm start
   ```

2. **Start the frontend** (from the frontend folder):
   ```bash
   npx serve
   ```

3. Open `http://localhost:3000` in your browser

4. Add subjects with name, difficulty level, and weekly hours
5. Generate a schedule and view your personalized study plan
