import { GlobalStyles, Paper, Typography, Stack, Alert, CircularProgress, Button, Box, TextField, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from "react-query";
import placeholder from '../assets/Iplaceholder.jpeg';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStore } from '../store'
import LoadingButton from '@mui/lab/LoadingButton';

const backendURL = process.env.REACT_APP_BACKEND_URL;


const AddItem = () => {
 

    const { isLoading, error, data: lists } = useQuery(["lists"], async () => {
        const data = await fetch(`${backendURL}/api/lists?populate=*`).then(r => r.json());
        console.log(data, 'dataadditem');
        return data;
    });


    const defaultValues = {
        list: [2],
        amount: null,
        price: null,
        productName: "",
        description: ""
    };

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const jwt = useStore(state => state.jwt)

    const { handleSubmit, formState: { errors }, register, reset } = useForm({ defaultValues });


    const postItems = async (data) => {
        return await fetch(`${backendURL}/api/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify(data),

        })
            .then(console.log(data))
            .then(r => r.json());
    }

    const mutation = useMutation(postItems, {
        onSuccess: () => {
            console.log("success")
            queryClient.invalidateQueries('items');
            reset()
        },
    })

    const onSubmit = data => {
        mutation.mutate({ data })

        navigate('/list')
    }


    return (

        <>
            <GlobalStyles
                styles={{ body: { backgroundColor: "#eafcf7" }, }}
            />

        <Container sx={{maxWidth: 600}}>
            <Stack as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    <Stack alignItems="center">
                        <Box sx={{ mt: 3 }}>
                            <img alt="placeholder" width={'100px'}></img>
                        </Box>
                    </Stack>
                    <Stack sx={{ ml: 2, mr: 2 }}>
                        <Typography sx={{ mt: 3, mb: 1 }} variant="h2nalf">Product naam</Typography>
                        <Paper sx={{ maxWidth: 230 }}>
                            <TextField size="small" sx={{ mt: 1, ml: 2, mb: 1 }}
                         
                                id="productName"
                                label="voetbal"
                                required
                                error={!!errors?.productName}
                                helperText={errors?.productName?.message}
                                {...register("productName", {
                                    required: 'product name is required'
                                })}
                            />
                        </Paper>

                        <Typography sx={{ mt: 2, mb: 1 }} variant="h2nalf">Prijs</Typography>
                        <Paper sx={{ maxWidth: 160 }}>
                            <TextField size="small" sx={{ mt: 1, ml: 2, mb: 1, mr: 2 }}
                                id="price"
                                label="19.99"
                                required
                                error={!!errors?.productName}
                                helperText={errors?.productName?.message}
                                {...register("price", {
                                    required: 'price is required'
                                })}
                            />
                        </Paper>

                        <Typography sx={{ mt: 2, mb: 1 }} variant="h2nalf">Aantal</Typography>
                        <Paper sx={{ maxWidth: 160 }}>
                            <TextField size="small" sx={{ mt: 1, ml: 2, mb: 1, mr: 2 }}
                                id="amount"
                                label="2"
                                required
                                error={!!errors?.productName}
                                helperText={errors?.productName?.message}
                                {...register("amount", {
                                    required: 'amount is required'
                                })}
                            />
                        </Paper>

                        <Typography sx={{ mt: 2, mb: 1 }} variant="h2nalf">Omschrijving</Typography>
                        <Paper sx={{ maxWidth: 450 }}>
                            <Container sx={{maxWidth: 350}}>
                            <TextField size="small" sx={{ mt: 1, mb: 1, mr: 2 }}
                                id="description"
                                label="omschrijving"
                                required
                                multiline
                                rows={4.5}
                                fullWidth
                                error={!!errors?.productName}
                                helperText={errors?.productName?.message}
                                {...register("description", {
                                    required: 'description name is required'
                                })}
                            />
                            </Container>
                        </Paper>

                        <LoadingButton
                            loading={mutation.isLoading}
                            sx={{ minWidth: 160, mt: 4 }}
                            loadingIndicator="Adding item"
                            type="submit"
                            variant="contained">
                            Item toevoegen
                        </LoadingButton>

                    </Stack>



                </Stack>
            </Stack>
            </Container>
        </>
    );
}

export default AddItem;