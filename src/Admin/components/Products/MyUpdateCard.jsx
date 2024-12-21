import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; // Ajouté pour la mise en page
import UpdateAttributes from './UpdateAttributes.jsx';
import UpdateImg from './UpdateImg.jsx';
import UpdateInformations from './UpdateInformations.jsx';
import { useUpdatearticleMutation } from '../../../services/articleApi.js';
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

const MyUpdateCard = ({ Articledata, setArticledata, setIsVisible, refetch }) => {
  const steps = ['Written information', 'Image', 'Informations'];
  const [updatearticle, { isLoading }] = useUpdatearticleMutation();

  const initialState = {
    nom: '',
    puv: '',
    image: '',
    stock: '',
    categorie_id: null,
    description: '',
  };

  // Test uniquement pour l'image
  const isImageEmpty = Articledata.image === initialState.image;

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <UpdateAttributes Articledata={Articledata} setArticledata={setArticledata} />;
      case 1:
        return <UpdateImg Articledata={Articledata} setArticledata={setArticledata} />;
      case 2:
        return <UpdateInformations Articledata={Articledata} setArticledata={setArticledata} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);

  const updateArticle = async () => {
    console.log(Articledata);
    try {
      const result = await updatearticle(Articledata).unwrap();
      if (result.success) {
        toast.success(result.message);
        setIsVisible(false);
        refetch();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      await updateArticle();
      setIsVisible(false);
    } else {
      setActiveStep(activeStep + 1);
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
        <Typography component="h1" variant="h4" align="center">
          Product Info
        </Typography>
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
              Confirm the Product Information
            </Typography>
            <Typography variant="subtitle1">
              Please review and confirm all the product details. Once you click "Insert," the product will be added to the product list.
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
                disabled={activeStep === 1 && isImageEmpty}
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

export default MyUpdateCard;
