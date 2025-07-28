import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';

// Fix for Leaflet marker issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function App() {
  const [vehicleData, setVehicleData] = useState({
    vehicle_id: 'EV001',
    latitude: 37.7749,  // Example San Francisco
    longitude: -122.4194
  });

  useEffect(() => {
    // Simulate real-time updates (replace with actual API call)
    const intervalId = setInterval(() => {
      setVehicleData(prevData => ({
        ...prevData,
        latitude: prevData.latitude + (Math.random() - 0.5) * 0.001,
        longitude: prevData.longitude + (Math.random() - 0.5) * 0.001
      }));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const position = [vehicleData.latitude, vehicleData.longitude];

  return (
    <div className="App">
      <h1>Fleet Tracking</h1>
      <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Vehicle ID: {vehicleData.vehicle_id}<br />
            Latitude: {vehicleData.latitude}<br />
            Longitude: {vehicleData.longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
