import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';
import ReviewOrder from '../components/ReviewOrder';
import SitemarkIcon from '../components/SitemarkIcon';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

export default function Checkout(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleFormDataChange = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm formData={formData} onChange={handleFormDataChange} />;
      case 1:
        return <PaymentForm formData={formData} onChange={handleFormDataChange} />;
      case 2:
        return <ReviewOrder formData={formData} onBack={handleBack} />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }}>
        <ColorModeIconDropdown />
      </Box>

      <Grid container sx={{ height: '100vh' }}>
        <Grid item xs={12} sm={5} lg={4}>
          <SitemarkIcon />
          {/* Additional UI components */}
        </Grid>
        <Grid item xs={12} sm={7} lg={8}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {activeStep !== 0 && (
              <Button startIcon={<ChevronLeftRoundedIcon />} onClick={handleBack} variant="text">
                Previous
              </Button>
            )}
            <Button
              variant="contained"
              endIcon={<ChevronRightRoundedIcon />}
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </AppTheme>
  );
}
