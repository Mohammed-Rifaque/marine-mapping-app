// MissionModal.js
import React from "react";
import { Modal, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import DropdownMenu from "./DropdownMenu";

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

const MissionModal = ({ open, onClose, waypoints, setWaypoints }) => {
  
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="mission-modal-title">
      <Box sx={modalStyles}>
        <Typography id="mission-modal-title" variant="h6">Mission Creation</Typography>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>WP</TableCell>
              <TableCell>Coordinates</TableCell>
              <TableCell>Distance (m)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {waypoints.map((wp, index) => (
              <TableRow key={index}>
                <TableCell>{wp.wp}</TableCell>
                <TableCell>{wp.coordinates.join(", ")}</TableCell>
                <TableCell>{wp.distance}</TableCell>
                <TableCell>
                  <DropdownMenu 
                    onInsertBefore={() => {/* Logic to insert before */}}
                    onInsertAfter={() => {/* Logic to insert after */}}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Modal>
  );
};

export default MissionModal;
