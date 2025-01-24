import React from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const DropdownMenu = ({ onInsertBefore, onInsertAfter }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={onInsertBefore}>Insert Polygon Before</MenuItem>
        <MenuItem onClick={onInsertAfter}>Insert Polygon After</MenuItem>
      </Menu>
    </>
  );
};

export default DropdownMenu;
