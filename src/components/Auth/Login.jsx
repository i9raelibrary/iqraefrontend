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
import axios from 'axios';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginClientMutation } from '../../services/ClientApi';
import { useTranslation } from 'react-i18next';
import CompleteNavbar from '../CompleteNavbar/CompleteNavbar.jsx';
import BottomInscription from '../BottomInscription/BottomInscription.jsx';
import WhatsIconFix from '../WhatsIconFix/WhatsIconFix.jsx'

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Email invalide').required('Email requis'),
  password: Yup.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .required('Mot de passe requis'),
});

const LoginForm = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [LoginClient] = useLoginClientMutation();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (email, password) => {
    try {
      const LoginResult = await LoginClient({ email, password });
      if (LoginResult.data.success) {
        toast.success(t('loginForm.loginSuccess'));
        if (LoginResult.data.admin) {
          localStorage.setItem('AdminToken', LoginResult.data.token);
          navigate("/dashboard/");
        }
        if (LoginResult.data.success && !LoginResult.data.admin) {
          localStorage.setItem('ClientToken', LoginResult.data.token);
          navigate("/");
        }
      } else {
        toast.error(t('loginForm.loginFailed'));
      }
    } catch (error) {
      toast.error(t('loginForm.serverError'));
    }
  };

  return (
    <>
      <CompleteNavbar />

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', p: 2 }}>
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
            {t('loginForm.title')}
          </Typography>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const sanitizedEmail = DOMPurify.sanitize(values.email);
              handleLogin(sanitizedEmail, values.password);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label={t('loginForm.email')}
                  type="email"
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
                  label={t('loginForm.password')}
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
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label={t('loginForm.rememberMe')}
                  sx={{ display: 'block', mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ py: 1.5, mt: 2, mb: 2 }}
                >
                  {t('loginForm.submit')}
                </Button>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Typography textAlign="center" color="primary">
                    {t('loginForm.signUp')}
                  </Typography>
                </Link>
                <Link to="/forgot-password" style={{ textDecoration: 'none', marginTop: '8px', display: 'block' }}>
                  <Typography textAlign="center" color="primary">
                    {t('loginForm.forgotPassword')}
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

export default LoginForm;
