
# Task Planner

Task Planner is a dynamic to-do list web application integrated into a calendar view. It is designed to help users efficiently manage tasks within a calendar interface, offering both month and week views.


## Features
- **Calendar Views**: Switch between month and week views.
- **Task Management**: Add, edit, and delete tasks directly from the calendar.
- **Drag and Drop**: Move tasks between different days seamlessly.
- **Accessibility**: Includes keyboard navigability and ARIA roles for accessibility.
- **Real-time Updates**: Changes to tasks are instantly reflected.

## Tech Stack

### Frontend:
- **Languages**: HTML, CSS, JavaScript (TypeScript)
- **Framework**: React 
  
### Backend:
- **Languages**:  TypeScript
- **Framework**: Node.js with Express
- **Database**: MongoDB (Mongoose for data modeling)
- **Authentication**: express-session for session management

### Node.js Version:
- Requires **Node.js version 18** or above.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/varun-inapakurthi/task-planner.git
   cd Task Planner
   ```

2. **Install Dependencies**:

   - Install frontend dependencies:
     ```bash
     cd client
     npm install
     ```
   
   - Install backend dependencies:
     ```bash
     cd server
     npm install
     ```

3. **Environment Variables**:
   - In the `server/` folder, create a `.env` file with the following variables:
     ```
     MONGO_URI=<your-mongodb-connection-string>
     SESSION_SECRET=<session-secret>
     ```

4. **Run the Application**:

   - **Frontend**:
     ```bash
     cd client
     npm start
     ```

   - **Backend**:
     ```bash
     cd ../server
     npm start
     ```

5. **Access the Application**:
   Open your browser and visit `http://localhost:5173` to access the frontend, and the backend should run on `http://localhost:5001`.
