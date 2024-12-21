import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ChoseListe from './ChoseListe'
import Form from './form'
import { useAddPackMutation } from '../../../services/PackApi';
import { toast } from 'react-toastify';

const styles = {
  layout: {
    width: 'auto',
    marginLeft: 2,
    marginRight: 2,
    '@media (min-width: 600px)': {
      width: 200,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: 3,
    marginLeft: 1,
  },
};

const ShosePage = ({ Info, setInfo, id, setId, refetch }) => {
  const [AddPack, { isLoading }] = useAddPackMutation();
  const [resulat, SetResultat] = useState('');
  const [message, SetMessage] = useState('');
  const steps = ['chose', 'Info'];


  function getStepContent(step) {
    switch (step) {
      case 0:
        return <ChoseListe setInfo={setInfo} id={id} setId={setId} />;
      case 1:
        return <Form Info={Info} setInfo={setInfo} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = async () => {
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      const result = await AddPack({ Info, id }).unwrap();
      console.log("result=>", result);
      SetResultat(result.data.message);
      refetch();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          width: '95%',
          maxWidth: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Stepper activeStep={activeStep} sx={{ marginTop: 3, marginBottom: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              {resulat}
            </Typography>
            <Typography variant="subtitle1">
              Vous pouvez revenir à la page précédente
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={styles.buttons}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={styles.button}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={styles.button}
                disabled={Info.Total == 0}
              >
                {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </React.Fragment>
  );
};

export default ShosePage;