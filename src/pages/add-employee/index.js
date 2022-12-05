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
import { toast } from 'react-toastify';
import axios from 'axios'
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';

const AddEmployees = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const AddEmployee = (firstName, lastName, age, salary, email, password) => {
        let query = `mutation MyQuery($password: String!, $email: String!, $lastName: String = "", $salary: Int!, $firstName: String!, $age: Int!) {
            insert_employee_one(object: {email: $email, password: $password, lastName: $lastName, salary: $salary, firstName: $firstName, age: $age}) {
                firstName
                lastName
                age
                salary
                email
            }
        }`

        axios.post("https://leheket-hilcoe-55.hasura.app/v1/graphql", JSON.stringify({
            query: query,
            variables: {firstName: firstName, lastName: lastName, age: age, salary: salary, email: email, password: password}
        }),{
            headers: {
                "x-hasura-admin-secret": "3YX812ege3703HRPFtdbdPRIEe0iRXuO6CE9buCsn1nEjGMSxKXJZTJUrHWZiZ1b",
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            console.log(res.data);
            if(res.data?.data?.insert_employee_one) {
                // redirect to employee list page
                toast.success("Employee Added")
                navigate('/employees')
                // dispatch(login({ isAuth: true, role: "Employee" }));
            } else {
                toast.warning("Something went wrong")
            }
        }).catch((err) => {
            console.log(err)
            console.log(err?.response?.data)
            toast.warning("Something went wrong")
        })
    }

    const handleSubmitNew = (e) => {
        e.preventDefault()
        // if(e.target.email.value == "boazdeju@gmail.com" && e.target.password.value == "123456") {
        //     console.log(e.target.email.value, e.target.password.value)
        //     dispatch(login({ isAuth: true, role: "Admin" }));
        // } else 
        if(e.target.firstName.value && e.target.lastName.value && e.target.age.value && e.target.salary.value && e.target.email.value && e.target.password.value) {
            AddEmployee(e.target.firstName.value, e.target.lastName.value, e.target.age.value, e.target.salary.value, e.target.email.value, e.target.password.value)
        }
        // console.log(e.target.firstName.value, e.target.lastName.value, e.target.age.value, e.target.salary.value, e.target.email.value, e.target.password.value)
    }

    return (
        <Grid container spacing={3}>
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
                            <MainCard sx={{ mt: 2, pb: 2, pl: 2, pr: 2, pt: 3 }} content={false}>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">First Name</InputLabel>
                                        <OutlinedInput
                                            id="firstName"
                                            type="text"
                                            name="firstName"
                                            onBlur={handleBlur}
                                            // value={values.email}
                                            // onChange={handleChange}
                                            placeholder="Enter First Name"
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
                                <Grid item xs={12} sx={{mt: 1}}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name-login">Last Name</InputLabel>
                                        <OutlinedInput
                                            id="lastName"
                                            type="text"
                                            name="lastName"
                                            onBlur={handleBlur}
                                            // value={values.email}
                                            // onChange={handleChange}
                                            placeholder="Enter Last Name"
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
                                <Grid item xs={12} style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%"
                                }} sx={{mt: 1}}>
                                    <Stack spacing={1} sx={{width: "47%"}}>
                                        <InputLabel>Age</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="number"
                                            // value={values.email}
                                            name="age"
                                            onBlur={handleBlur}
                                            // onChange={handleChange}
                                            placeholder="Enter Age"
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                    <Stack spacing={1} sx={{width: "47%"}}>
                                        <InputLabel>Salary</InputLabel>
                                        <OutlinedInput
                                            id="salary"
                                            type="number"
                                            // value={values.email}
                                            name="salary"
                                            onBlur={handleBlur}
                                            // onChange={handleChange}
                                            placeholder="Enter Salary"
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
                                <Grid item xs={12} sx={{mt: 1}}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="email"
                                            name="email"
                                            onBlur={handleBlur}
                                            // value={values.email}
                                            // onChange={handleChange}
                                            placeholder="Enter Email Address"
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
                                <Grid item xs={12} sx={{mt: 1}}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="password-login">Password</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.password && errors.password)}
                                            id="-password-login"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            onBlur={handleBlur}
                                            // value={values.password}
                                            // onChange={handleChange}
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
                                            placeholder="Enter Password"
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
                                <Grid item xs={12} sx={{mt: 3}}>
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
                                            Add Employee
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </MainCard>
                        </form>
                    )}
                </Formik>
            </Grid>
        </Grid>
)};

export default AddEmployees;
