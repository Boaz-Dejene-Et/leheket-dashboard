import AuthWrapper from './AuthWrapper';
import React, {useState} from 'react';
import {
    Button,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { login } from 'store/reducers/menu';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmitNew = (e) => {
        e.preventDefault()
        if(e.target.email.value == "boazdeju@gmail.com" && e.target.password.value == "123456") {
            // console.log(e.target.email.value, e.target.password.value)
            dispatch(login({ 
                isAuth: true, 
                user: {
                    firstName: "boaz",
                    lastName: "Dejene",
                    email: "boazdeju@gmail.com"
                }, 
                role: "Admin" }));
            navigate('/')
        } else {
            const query = `query MyQuery($email: String!) {
                employee_by_pk(email: $email) {
                    password
                    firstName
                    lastName
                    email
                }
            }`

            axios.post("https://leheket-hilcoe-55.hasura.app/v1/graphql", JSON.stringify({
                query: query,
                variables: {email: e.target.email.value}
            }),{
                headers: {
                    "x-hasura-admin-secret": "3YX812ege3703HRPFtdbdPRIEe0iRXuO6CE9buCsn1nEjGMSxKXJZTJUrHWZiZ1b",
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then((res) => {
                console.log(res.data);
                if(res.data?.data?.employee_by_pk === null) {
                    toast.warning("Email not Found")
                } else if(res.data?.data?.employee_by_pk?.password !== e.target.password.value) {
                    toast.warning("Password not correct")
                } else if(res.data?.data?.employee_by_pk?.password === e.target.password.value) {
                    dispatch(login({ 
                        isAuth: true,
                        user: {
                            firstName: res.data?.data?.employee_by_pk?.firstName,
                            lastName: res.data?.data?.employee_by_pk?.lastName,
                            email: res.data?.data?.employee_by_pk?.email
                        }, 
                        role: "Employee" 
                    }));
                    navigate('/')
                }
            }).catch((err) => {
                console.log(err)
                console.log(err.response?.data)
            })
            // e.target.email.value
            // e.target.password.value
        }
    }

    return (
    <AuthWrapper>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Login</Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Formik
                    initialValues={{
                        email: 'boazdeju@gmail.com',
                        password: '123456',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                        password: Yup.string().max(255).required('Password is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            setStatus({ success: false });
                            setSubmitting(false);
                        } catch (err) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmitNew}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="email"
                                            value={values.email}
                                            name="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter email address"
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="password-login">Password</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.password && errors.password)}
                                            id="-password-login"
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            name="password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            placeholder="Enter password"
                                        />
                                        {touched.password && errors.password && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {errors.password}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Login
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    </AuthWrapper>
)};

export default Login;
