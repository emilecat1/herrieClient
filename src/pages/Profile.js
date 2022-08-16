import { GlobalStyles, TextField, Stack, Typography, Button } from "@mui/material";
import { useStore } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useForm } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const Profile = () => {

    const isLoggedIn = useStore(state => state.isLoggedIn);
    const username = useStore(state => state.username);
    const logout = useStore(state => state.logout);

    const defaultValues = {
        username: "",
        email: ""
    };

    const navigate = useNavigate();


    const queryClient = useQueryClient()

    const { handleSubmit, formState: { errors }, register, reset } = useForm({ defaultValues });


    const { isLoading, error, data: users } = useQuery(["userss"], async () => {
        const data = await fetch(`${backendURL}/api/users/?filters[username][$eq]=${username}`).then(r => r.json());
        console.log(data);
        console.log(data[0].email, 'homusers');
        return data;
    });

    console.log(users)

    let userId;
    if (users !== undefined) {
        userId = users[0].id;
    }

    console.log(userId)

    const updateUser = async (data) => {
        return await fetch(`${backendURL}/api/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data }),
        }).then(r => r.json());
    }

    const mutationUpdateUser = useMutation(updateUser, {
        onSuccess: () => {
            console.log("success")
            queryClient.invalidateQueries('users', userId);
            reset()
        },
    })

    const onSubmit = data => {
        mutationUpdateUser.mutate({ data })

        navigate('/')

    }








    return (




        <>
            <GlobalStyles
                styles={{ body: { backgroundColor: "#eafcf7" }, }}
            />
            <Stack noValidate onSubmit={handleSubmit(onSubmit)}>
                <Stack sx={{ minWidth: 300 }} alignItems="flex-end">
                    <LoadingButton loading={mutationUpdateUser.isLoading} type="submit" component={Link} to="/" sx={{ maxWidth: 90, mr: 5, mt: 5 }} variant="contained" loadingIndicator="updating profile" >Klaar</LoadingButton>

                </Stack>

                <Stack sx={{ ml: 5, mt: 5 }}>
                    <Typography component="h1" variant="h2">Profiel</Typography>
                    <Stack sx={{ mt: 5 }}>
                        <Typography variant="h3">Email</Typography>
                        <TextField sx={{ mt: 2, maxWidth: 300 }} id="filled-basic" label="emile.catteeuw3@gmail.com" variant="filled" onChange={(e) => this.handleTextFieldChange(e)} />
                    </Stack>
                    <Stack sx={{ mt: 4 }}>
                        <Typography variant="h3">Naam</Typography>
                        {users &&
                            <TextField
                                sx={{ mt: 2, maxWidth: 300 }}
                                id="username"
                                label={users[0].username}
                                variant="filled"
                                error={!!errors?.username}
                                helperText={errors?.username?.message}
                                {...register("username", {
                                    required: 'Username is required'
                                })}
                            />}

                    </Stack>
                    <Stack sx={{ mt: 4 }}>
                        <Typography variant="h3">Adres</Typography>
                        <TextField sx={{ mt: 2, maxWidth: 300 }} id="filled-basic" label="Haiglaan" variant="filled" onChange={(e) => this.handleTextFieldChange(e)} />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ maxWidth: 300 }}>
                        <Stack sx={{ mt: 4 }}>
                            <Typography variant="h3">Postcode</Typography>
                            <TextField sx={{ mt: 2, maxWidth: 130 }} id="filled-basic" label="8900" variant="filled" onChange={(e) => this.handleTextFieldChange(e)} />
                        </Stack>
                        <Stack sx={{ mt: 4 }}>
                            <Typography variant="h3">Stad</Typography>
                            <TextField sx={{ mt: 2, maxWidth: 130 }} id="filled-basic" label="Ieper" variant="filled" onChange={(e) => this.handleTextFieldChange(e)} />
                        </Stack>
                    </Stack>
                    <Stack sx={{ minWidth: 300 }} alignItems="center">
                        <Button onClick={logout} sx={{ maxWidth: 90, mr: 5, mt: 5 }} variant="contained">Afmelden</Button>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}

export default Profile;