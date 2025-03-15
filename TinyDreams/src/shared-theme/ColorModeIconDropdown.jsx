// src/shared-theme/ColorModeIconDropdown.jsx
import * as React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';

export default function ColorModeIconDropdown() {
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
        <ColorLensIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Light Mode</MenuItem>
        <MenuItem onClick={handleClose}>Dark Mode</MenuItem>
      </Menu>
    </>
  );
}
