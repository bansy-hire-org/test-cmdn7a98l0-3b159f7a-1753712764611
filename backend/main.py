from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, auth
from typing import Annotated
import os

# Initialize Firebase Admin SDK (only if not already initialized)
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase_credentials.json")  # Ensure this file exists
    firebase_admin.initialize_app(cred)

app = FastAPI()

origins = ["*",]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GPSData(BaseModel):
    vehicle_id: str
    latitude: float
    longitude: float

# Dependency to verify Firebase authentication
async def get_current_user(token: str):
    try:
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token['uid']
        return uid
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid authentication credentials: {e}")

CurrentUser = Annotated[str, Depends(get_current_user)]

@app.post("/gps")
async def receive_gps_data(gps_data: GPSData, user: CurrentUser):
    # In a real application, you would store this data in a database
    print(f"Received GPS data from vehicle {gps_data.vehicle_id}: {gps_data.latitude}, {gps_data.longitude} for user: {user}")
    return {"message": "GPS data received"}

@app.get("/protected")
async def protected_route(user: CurrentUser):
    return {"message": f"Hello, authenticated user: {user}!"}

@app.get("/")
async def root():
    return {"message": "Backend is running"}
