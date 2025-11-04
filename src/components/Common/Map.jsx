import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon
const createCustomIcon = () => {
  return new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

// Component to handle map click events
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e);
    },
  });
  return null;
}

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const tehranPosition = [35.6892, 51.389];

  // Handle map click to add a new marker
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    const newMarker = {
      id: Date.now(), // unique ID for each marker
      position: [lat, lng],
      name: `موقعیت ${markers.length + 1}`,
    };

    setMarkers([...markers, newMarker]);
  };

  // Remove a marker by its ID
  const removeMarker = (id) => {
    setMarkers(markers.filter((marker) => marker.id !== id));
  };

  // Clear all markers
  const clearAllMarkers = () => {
    setMarkers([]);
  };

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          background: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          maxWidth: "300px",
        }}
      >
        <h3>نقشه تعاملی</h3>
        <p>برای افزودن نشانگر روی نقشه کلیک کنید</p>

        <div style={{ marginBottom: "10px" }}>
          <button
            onClick={clearAllMarkers}
            style={{
              padding: "5px 10px",
              backgroundColor: "#ff4d4f",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            حذف همه نشانگرها
          </button>
        </div>

        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          <h4>نشانگرها ({markers.length})</h4>
          {markers.length === 0 ? (
            <p>هیچ نشانگری وجود ندارد</p>
          ) : (
            <ul style={{ paddingLeft: "20px" }}>
              {markers.map((marker, index) => (
                <li key={marker.id} style={{ marginBottom: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      نشانگر {index + 1}: {marker.position[0].toFixed(4)},{" "}
                      {marker.position[1].toFixed(4)}
                    </span>
                    <button
                      onClick={() => removeMarker(marker.id)}
                      style={{
                        padding: "2px 6px",
                        backgroundColor: "#ff4d4f",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      حذف
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <MapContainer
        center={tehranPosition}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Handle map click events */}
        <MapClickHandler onMapClick={handleMapClick} />

        {/* Default Tehran marker */}
        <Marker position={tehranPosition} icon={createCustomIcon()}>
          <Popup>
            تهران، پایتخت ایران <br /> Tehran, Capital of Iran
          </Popup>
        </Marker>

        {/* Render all user-added markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={createCustomIcon()}
          >
            <Popup>
              <div>
                <strong>{marker.name}</strong>
                <br />
                عرض: {marker.position[0].toFixed(6)}
                <br />
                طول: {marker.position[1].toFixed(6)}
                <br />
                <button
                  onClick={() => removeMarker(marker.id)}
                  style={{
                    marginTop: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  حذف این نشانگر
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
