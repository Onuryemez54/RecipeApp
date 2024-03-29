import { useForm } from 'react-hook-form';
import { Box, Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { StyledBox } from '../../../components/StyledBox';

export const SignUpPage = () => {
    const theme = useTheme();

    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
            name: { firstName: '', lastName: '' },
            userName: '',
            email: '',
            age: '',
            gender: '',

        }
    });

    const { register, handleSubmit, formState, reset } = form;

    const { errors } = formState;

    const onSubmit = (data) => {
        reset();
        navigate('/signInPage')
    };

    return (
        <StyledBox>
            <Box sx={{ margin: 'auto', maxWidth: '100%', '&:hover': { color: theme.palette.info.dark } }}>
                <Typography gutterBottom textAlign='center' variant="h4">Sign Up</Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Stack spacing={2} sx={{ width: { xs: '250px', sm: '500px' } }}>

                        <TextField label='First Name' type="text"
                            {...register('name.firstName', {
                                required: {
                                    value: true,
                                    message: 'First name is required!'
                                },
                                minLength: 2,
                            })}
                            error={!!errors.name?.firstName}
                            helperText={errors.name?.firstName?.message}
                        />

                        <TextField label='Last Name' type="text"
                            {...register('name.lastName', {
                                required: {
                                    value: true,
                                    message: 'Last name is required!'
                                },
                                minLength: 2,
                            })}
                            error={!!errors.name?.lastName}
                            helperText={errors.name?.lastName?.message}
                        />

                        <TextField label='User Name' type="text"
                            {...register('userName', {
                                required: {
                                    value: true,
                                    message: 'User name is required!'
                                },
                                minLength: 2,
                            })}
                            error={!!errors.userName}
                            helperText={errors.userName?.message}
                        />

                        <TextField label='Email' type="email"
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Email is required!'
                                },
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: 'Invalid email format'
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField label='Age' type="number"
                            {...register('age', {
                                valueAsNumber: true,
                                required: {
                                    value: true,
                                    message: 'Age is required!'
                                }
                            })}
                            error={!!errors.age}
                            helperText={errors.age?.message}
                        />


                        <TextField
                            label="Select your gender"
                            select
                            defaultValue=''
                            fullWidth
                            {...register('gender',
                                {
                                    required: {
                                        value: true, message: 'Please select your gender!'
                                    }
                                })}
                            error={!!errors.gender}
                            helperText={errors.gender?.message}
                        >

                            <MenuItem value='male'>Male</MenuItem>
                            <MenuItem value='female'>Female</MenuItem>

                        </TextField>



                        <Button sx={{ backgroundColor: theme.palette.info.main, '&:hover': { backgroundColor: theme.palette.info.dark } }} type='submit' variant="contained" color="success"  >Sign Up</Button>
                    </Stack>
                </form>
            </Box>
        </StyledBox >
    )
}
