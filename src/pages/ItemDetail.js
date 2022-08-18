import { GlobalStyles, Paper, Typography, Stack, Alert, CircularProgress, Button, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from "react-query";
import placeholder from '../assets/Iplaceholder.jpeg';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from "react-hook-form";
import { useStore } from '../store'
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const ItemDetail = () => {

    const { id } = useParams();
    console.log(id)


    const { isLoading, error, data: item } = useQuery(["items", id], async () => {
        const data = await fetch(`${backendURL}/api/items/${id}?populate=*`).then(r => r.json());
        console.log(data);
        return data;
    });

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const jwt = useStore(state => state.jwt)

    const defaultValues = {
        items: { id }
    };

    const { handleSubmit, formState: { errors }, register, reset } = useForm({ defaultValues });


    const deleteItem = async (data) => {
        return await fetch(`${backendURL}/api/items/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify(data),

        })
            .then(console.log(data))
            .then(r => r.json());
    }

    const deleteMutation = useMutation(deleteItem, {
        onSuccess: () => {
            console.log("success")
            queryClient.invalidateQueries('items');
            reset()
        },
    })

    const onSubmit = data => {
        deleteMutation.mutate({ data })

        navigate('/list')
    }


    if (isLoading) {
        return <CircularProgress />
    };

    if (error) {
        return <Alert severity="error">Something went wrong</Alert>
    };


    if (item) {
        return (


            <>

                <GlobalStyles
                    styles={{ body: { backgroundColor: "#eafcf7" }, }}
                />



                <Stack as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 5, ml: 4, mr: 4 }}>
                        <LoadingButton
                            sx={{ color: 'red.main', fontSize: 25 }}
                            loading={deleteMutation.isLoading}
                            variant="text"
                            loadingIndicator="Adding list"
                            type="submit"
                        >
                            Verwijder
                        </LoadingButton>
                        <Button component={Link} to="/List" sx={{ fontSize: 25 }} variant="text">Klaar</Button>
                    </Stack>
                    <Stack alignItems="center">

                        
                            <Box sx={{ mt: 3 }}>
                                <img src="https://res.cloudinary.com/ddinuqloh/image/upload/v1660759755/lijstjestijd/voetbal_edmjev.jpg" alt="placeholder" width={'100px'}></img>
                            </Box>
                        


                    </Stack>
                    <Stack sx={{ ml: 2, mr: 2 }}>
                        <Typography sx={{ mt: 3, mb: 1 }} variant="h2nalf">Product naam</Typography>
                        <Paper>
                            <Typography sx={{ mt: 1, ml: 2, mb: 1 }} variant="h3">{item.data.attributes.productName}</Typography>
                        </Paper>

                        <Typography sx={{ mt: 2, mb: 1 }} variant="h2nalf">Prijs</Typography>
                        <Paper sx={{ maxWidth: 160 }}>
                            <Typography sx={{ mt: 1, ml: 2, mb: 1 }} variant="h3">{item.data.attributes.price}</Typography>
                        </Paper>

                        <Typography sx={{ mt: 2, mb: 1 }} variant="h2nalf">Aantal</Typography>
                        <Paper sx={{ maxWidth: 160 }}>
                            <Typography sx={{ mt: 1, ml: 2, mb: 1 }} variant="h3">{item.data.attributes.amount}</Typography>
                        </Paper>

                        <Typography sx={{ mt: 2, mb: 1 }} variant="h2nalf">Omschrijving</Typography>
                        <Paper sx={{ minHeight: 150 }}>
                            <Typography sx={{ mt: 2, ml: 2, mr: 2, mb: 1 }} variant="h3">{item.data.attributes.description} </Typography>
                        </Paper>

                    </Stack>

                </Stack>


            </>
        );

    }

}


export default ItemDetail;