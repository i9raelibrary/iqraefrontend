import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik, Form } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { useInsertClientMutation } from '../../services/ClientApi';
import BottomInscription from '../BottomInscription/BottomInscription';
import WhatsIconFix from '../WhatsIconFix/WhatsIconFix.jsx';
import CompleteNavbar from '../CompleteNavbar/CompleteNavbar';
import { useTranslation } from 'react-i18next';

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string().email('Email invalide').required('Email requis'),
  password: Yup.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .required('Mot de passe requis'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
    .required('Confirmation du mot de passe requise'),
});

const SignupForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [insertClient] = useInsertClientMutation();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (values) => {
    const sanitizedEmail = DOMPurify.sanitize(values.email);
    const sanitizedValues = { ...values, email: sanitizedEmail };

    try {
      const response = await insertClient(sanitizedValues).unwrap();
      if (response) {
        toast.success('Client enregistré avec succès!');
        setTimeout(() => {
          navigate('/login');
        }, 500);
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Une erreur inconnue.');
    }
  };

  return (
    <>
      <CompleteNavbar />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          p: 2,
        }}
      >
        <ToastContainer />
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" textAlign="center" mb={3} fontWeight="bold">
            {t('signup.title')}
          </Typography>
          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label={t('signup.email')}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label={t('signup.password')}
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label={t('signup.confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label={
                    <>
                      {t('signup.acceptwebsiteterms')}{' '}
                      <Link to="/termsconditions" className="text-blue-500">
                        terms & conditions
                      </Link>
                    </>
                  }
                  sx={{ mt: 2, mb: 2 }}
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  {t('signup.submit')}
                </Button>
                <Link to="/login" style={{ textDecoration: 'none', marginTop: '16px', display: 'block' }}>
                  <Typography textAlign="center" color="primary">
                    {t('signup.login')}
                  </Typography>
                </Link>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>

      <BottomInscription />
      <WhatsIconFix />
    </>
  );
};

export default SignupForm;
