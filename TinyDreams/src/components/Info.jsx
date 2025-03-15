import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Info({ totalPrice }) {
  return (
    <Box>
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Order Summary
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Total Price: {totalPrice}
      </Typography>
    </Box>
  );
}
