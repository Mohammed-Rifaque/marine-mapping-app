// Map.js
import React, { useEffect, useRef } from "react";
import { Map as OlMap, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { Draw } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";

const Map = ({ drawingMode, setDrawingMode, waypoints, setWaypoints, polygonPoints, setPolygonPoints }) => {
  const mapRef = useRef();
  const drawInteraction = useRef();

  useEffect(() => {
    const source = new VectorSource();
    const vectorLayer = new VectorLayer({ source });

    const map = new OlMap({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({
        center: fromLonLat([88.3639, 22.5726]),
        zoom: 8,
      }),
    });

    const addDrawInteraction = (type) => {
      if (drawInteraction.current) map.removeInteraction(drawInteraction.current);

      drawInteraction.current = new Draw({ source, type });
      map.addInteraction(drawInteraction.current);

      drawInteraction.current.on("drawend", (event) => {
        const coords = event.feature.getGeometry().getCoordinates();

        if (type === "LineString") {
          const updatedWaypoints = coords.map((c, i) => ({
            wp: String(i + 1).padStart(2, '0'), // Format waypoint number
            coordinates: c,
            distance: i > 0 ? calculateDistance(coords[i - 1], c) : 0,
          }));
          setWaypoints(updatedWaypoints);
          setDrawingMode(null); // Stop drawing linestring
        } else if (type === "Polygon") {
          setPolygonPoints(coords[0]); // Save polygon's coordinates
          setDrawingMode(null); // Stop drawing polygon
        }
      });
    };

    if (drawingMode) {
      addDrawInteraction(drawingMode === "linestring" ? "LineString" : "Polygon");
    }

    return () => map.setTarget(null);
  }, [drawingMode]);

  const calculateDistance = (coord1, coord2) => {
    const [x1, y1] = coord1;
    const [x2, y2] = coord2;
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2).toFixed(2);
  };

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default Map;