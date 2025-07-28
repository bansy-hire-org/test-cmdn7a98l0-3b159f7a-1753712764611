# EMO Energy Fleet Management App

## Setup

### Backend

1.  Navigate to the `backend` directory:
    `cd backend`
2.  Create a virtual environment:
    `python -m venv venv`
3.  Activate the virtual environment:
    *   On Windows: `venv\Scripts\activate`
    *   On macOS and Linux: `source venv/bin/activate`
4.  Install dependencies:
    `pip install -r requirements.txt`
5.  Set up Firebase Admin SDK: Download your Firebase Admin SDK credentials JSON file and save it as `firebase_credentials.json` in the `backend` directory.  Make sure to replace the placeholder in `backend/main.py` with the correct path if needed.
6. Run the backend:
    `uvicorn main:app --reload`

### Frontend

1.  Navigate to the `frontend` directory:
    `cd frontend`
2.  Install dependencies:
    `npm install`
3.  Start the frontend:
    `npm start`

## Firebase Configuration

**IMPORTANT:** The `firebase_credentials.json` file must be placed in the `backend` directory. Replace the placeholder values in this file with your actual Firebase project credentials.

## Running Tests

Tests are not implemented in this example project. Implement them following the instructions given in the test cases. After implementation, use `pytest` in backend and `npm test` in frontend directories to execute them.
