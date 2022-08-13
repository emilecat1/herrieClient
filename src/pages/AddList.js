
import { GlobalStyles, Paper, Typography, Stack, TextField, Alert, Snackbar } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useForm } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { Link as RouterLink } from "react-router-dom";


const backendURL = process.env.REACT_APP_BACKEND_URL;

const AddList = () => {

    const defaultValues = {
        name: ""
    };

    console.log(backendURL)

    const queryClient = useQueryClient()

    const { handleSubmit, formState: { errors }, register, reset } = useForm({ defaultValues });

    const postList = async (data) => {
        return await fetch(`${backendURL}/api/lists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(r => r.json());
    }

    const mutation = useMutation(postList, {
        onSuccess: () => {
            console.log("success")
            queryClient.invalidateQueries('lists');
            reset()
        },
    })

    const onSubmit = data => {
        mutation.mutate({ data })

    }


    return (

        <>
            <GlobalStyles
                styles={{ body: { backgroundColor: "#eafcf7" }, }}
            />


            <Stack alignItems="center" sx={{ mt: 25 }} as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <Paper sx={{ maxWidth: 350, minWidth: 350, minHeight: 280 }}>
                    <Stack sx={{ mt: 5, ml: 2 }}>
                        <Typography variant="h1">Lijstje maken</Typography>
                        <TextField sx={{ mt: 4, maxWidth: 300 }}
                            id="name"
                            label="lijst naam"
                            required
                            error={!!errors?.name}
                            helperText={errors?.name?.message}
                            {...register("name", {
                                required: 'Name is required'
                            })}
                        />


                        <LoadingButton loading={mutation.isLoading}
                            sx={{ maxWidth: 300, mt: 4 }} loadingIndicator="Adding list" type="submit" variant="contained">Lijst toevoegen </LoadingButton>
                    </Stack>
                </Paper>
            </Stack>
        </>
    );
}

export default AddList;