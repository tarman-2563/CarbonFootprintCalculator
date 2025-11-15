# CarbonTrack 🌱

**CarbonTrack** is a full-stack web application to track, calculate, and visualize your carbon footprint based on daily activities like commuting, food consumption, and electricity usage. Users can view dashboards, add activities, and monitor their emissions over time.

---

## Features

- **Dashboard:** Visualize daily and weekly CO₂e emissions.
- **Add Activity:** Log activities such as commute, food, and electricity usage.
- **Activity List:** View all recorded activities with filters.
- **Charts:** Line, bar, and doughnut charts for activity breakdown.
- **MongoDB Atlas:** Stores user activity and emissions data.

---

## Tech Stack

- **Frontend:** React.js, Chart.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Deployment:** Render - Backend , Netlify - Frontend
- **API:** Climatiq API for carbon emissions calculation

---

## Installation

### Backend

1. Clone the repo:

```bash
git clone https://github.com/tarman-2563/CarbonFootprintCalculator.git
cd carbontrack

2. Install dependencies:

npm install

3. Create a .env file in the backend folder with:

PORT = port
MONGO_URI=your_mongodb_connection_string
CLIMATIQ_API_KEY=your_climatiq_api_key

4. Start the backend server:

npm run dev


### Frontend

1. Navigate to the frontend folder (if separate):

cd frontend


2. Install dependencies:

npm install


3. Start the frontend:

npm start

