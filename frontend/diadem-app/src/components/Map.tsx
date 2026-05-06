// MapView.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { journey } from "../data/diadems";
import { Box } from "@mui/material";

export const MapView = () => {
  return (
    <Box sx={{ height: 500 }}>
        <MapContainer
            center={[48.8566, 2.3522]}
            zoom={3}
            style={{ height: "100%", width: "100%" }}
        >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {journey.map((p, i) => (
        <Marker key={i} position={[p.lat, p.lng]}>
          <Popup>
            {p.city} — {p.year}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </Box>
  );
};