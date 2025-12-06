# Backend - Study Planner

 Express.js backend server for the Study Planner application.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

The backend will run on `http://localhost:3001`

## API Endpoints

- **GET /api/subjects** - Get all subjects
- **POST /api/subjects** - Add a new subject
  - Body: `{ name, difficulty, weeklyHours }`
- **DELETE /api/subjects/:id** - Delete a subject by ID
- **GET /api/schedule** - Get the saved schedule
- **POST /api/schedule** - Save a new schedule
  - Body: `{ schedule }`

## File Structure

- `server.js` - Express server configuration and route handlers
- `db.js` - Simple in-memory database
- `package.json` - Project dependencies
- `node_modules/` - Installed packages
