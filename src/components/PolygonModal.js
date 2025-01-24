// PolygonModal.js
import React from "react";
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const PolygonModal = ({ open, onClose, polygonPoints, onImport }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="polygon-modal-title">
      <Box sx={modalStyles}>
        <Typography id="polygon-modal-title" variant="h6" gutterBottom>
          Polygon Waypoints
        </Typography>
        <Box
          sx={{
            maxHeight: 500, // Set a max height for scrolling
            overflowY: "auto", // Enable vertical scrolling
            border: "1px solid #ddd", // Optional: add border for the scrollable area
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>WP</TableCell>
                <TableCell>Coordinates</TableCell>
                <TableCell>Distance (m)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {polygonPoints.map((point, index) => (
                <TableRow key={index}>
                  <TableCell>{String(index + 1).padStart(2, "0")}</TableCell>
                  <TableCell>{`${point[0].toFixed(6)}, ${point[1].toFixed(6)}`}</TableCell>
                  <TableCell>
                    {index > 0
                      ? calculateDistance(
                          polygonPoints[index - 1],
                          point
                        ).toFixed(2)
                      : "0.00"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ textAlign: "right", marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={onImport}>
            Import Points
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// Helper function to calculate distance between two coordinates
const calculateDistance = (coord1, coord2) => {
  const [x1, y1] = coord1;
  const [x2, y2] = coord2;
  
  // Simplified Euclidean distance formula for demonstration purposes
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

export default PolygonModal;
