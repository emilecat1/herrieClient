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

    const { isLoading, error, data: users } = useQuery(["users"], async () => {
        const data = await fetch(`${backendURL}/api/users/?filters[username][$eq]=${username}`).then(r => r.json());
        // console.log(data);
        // console.log(data[0].username, 'homusers');
        return data;
    });


    let userId;
    if (users !== undefined) {
        userId = users[0].id;
    }

    console.log(userId);

    let email;
    if (users !== undefined) {
        email = users[0].email;
    }

    console.log(email)

    const defaultValues = {
        user:[userId],
        username: username,
        email: email
    };

     

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const jwt = useStore((state) => state.jwt);


    const { handleSubmit, formState: { errors }, register, reset } = useForm({ defaultValues });


    const updateUser = async (data) => {
        return await fetch(`${backendURL}/api/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(),
        })
            .then(console.log(data, "updateuser"))
            .then(r => r.json());
    }

    const mutationUser = useMutation(updateUser, {
        onSuccess: () => {
            console.log("success")
            queryClient.invalidateQueries('users');
            reset()
        },
    })

    const onSubmit = data => {
        mutationUser.mutate({ data })
        console.log("mutation")

        navigate('/')

    }


    return (

        <>
            <GlobalStyles
                styles={{ body: { backgroundColor: "#eafcf7" }, }}
            />
            <Stack  as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <Stack sx={{ minWidth: 300 }} alignItems="flex-end">
                    <LoadingButton loading={mutationUser.isLoading} type="submit"  sx={{ backgroundColor: "secondary.main", maxWidth: 90, mr: 5, mt: 5 }} variant="contained" loadingIndicator="updating profile" >Klaar</LoadingButton>

                </Stack>

                <Stack sx={{ ml: 5, mt: 5 }}>
                    <Typography component="h1" variant="h2">Profiel</Typography>
                    <Stack sx={{ mt: 5 }}>
                        <Typography variant="h3">Email</Typography>
                        {users &&
                            <TextField
                                sx={{ mt: 2, maxWidth: 300 }}
                                id="email"
                                label={users[0].email}
                                variant="filled"
                                error={!!errors?.email}
                                helperText={errors?.email?.message}
                            />}
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
                            />}

                    </Stack>
                    <Stack sx={{ minWidth: 300 }} alignItems="center">
                        <Button onClick={logout} sx={{ backgroundColor: "red.main", maxWidth: 90, mr: 5, mt: 5 }} variant="contained">Afmelden</Button>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}

export default Profile;