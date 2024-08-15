import React, { useState } from "react";
import MapGL, { Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = "sk.eyJ1IjoiYWFyYXYyNjEwIiwiYSI6ImNsenF1emI5NTFkbnYya3F1OWQyNXlrcGkifQ.Kg5SKvauFwVyFxGmEDWNfQ"; // Replace with your Mapbox token

const MapComponent = () => {
    const [location, setLocation] = useState("");
    const [viewport, setViewport] = useState({
        latitude: 37.7749,
        longitude: -122.4194,
        zoom: 13,
        width: "100%",
        height: "400px",
    });
    const [marker, setMarker] = useState({
        latitude: 37.7749,
        longitude: -122.4194,
    });

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleShowOnMap = () => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${MAPBOX_TOKEN}`)
            .then(res => res.json())
            .then(data => {
                if (data.features && data.features.length > 0) {
                    const [longitude, latitude] = data.features[0].center;
                    setMarker({ latitude, longitude });
                    setViewport({ ...viewport, latitude, longitude });
                } else {
                    alert("Location not found");
                }
            })
            .catch(err => {
                console.error("Geocoding error:", err);
                alert("Error fetching location");
            });
    };

    return (
        <div>
            <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Enter a location"
            />
            <button onClick={handleShowOnMap}>Show on Map</button>

            <MapGL
                {...viewport}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onViewportChange={setViewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <Marker latitude={marker.latitude} longitude={marker.longitude}>
                    <div style={{ backgroundColor: "red", width: "10px", height: "10px", borderRadius: "50%" }} />
                </Marker>
            </MapGL>
        </div>
    );
};

export default MapComponent;
