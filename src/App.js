import React, { useState } from "react";
import Map from "./components/Map";
import MissionModal from "./components/MissionModal";
import PolygonModal from "./components/PolygonModal"; // New modal for polygons

const App = () => {
  const [drawingMode, setDrawingMode] = useState(null); // 'linestring' or 'polygon'
  const [waypoints, setWaypoints] = useState([]);
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [showPolygonModal, setShowPolygonModal] = useState(false); // New state for polygon modal

  const handleDrawButton = () => {
    setDrawingMode("linestring");
    setShowMissionModal(true);
  };

  const handleCloseModal = () => {
    setShowMissionModal(false);
    setShowPolygonModal(false); // Close polygon modal
  };

  return (
    <div>
      <button onClick={handleDrawButton}>Draw on Map</button>
      <Map
        drawingMode={drawingMode}
        setDrawingMode={setDrawingMode}
        waypoints={waypoints}
        setWaypoints={setWaypoints}
        polygonPoints={polygonPoints}
        setPolygonPoints={setPolygonPoints}
      />
      <MissionModal
        open={showMissionModal}
        onClose={handleCloseModal}
        waypoints={waypoints}
        setWaypoints={setWaypoints}
        setDrawingMode={setDrawingMode}
      />
      <PolygonModal
        open={showPolygonModal} // New polygon modal
        onClose={handleCloseModal}
        polygonPoints={polygonPoints} // Pass polygon points to modal
      />
    </div>
  );
};

export default App;