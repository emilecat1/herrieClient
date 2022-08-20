import { GlobalStyles, Paper, Typography, Stack, Alert, CircularProgress, Button, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from "react-query";
import placeholder from '../assets/Iplaceholder.jpeg';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from "react-hook-form";
import { useStore } from '../store'
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const SearchDetail = () => {

    const { id } = useParams();
    console.log(id)


    const { isLoading, error, data: item } = useQuery(["items", id], async () => {
        const data = await fetch(`${backendURL}/api/items/${id}?populate=*`).then(r => r.json());
        console.log(data);
        return data;
    });

    console.log(item , 'itemmmmmmmmmm')


    let listId;
    if (item !== undefined) {
        listId = item.data.attributes.list.data.id;
    }

    let reserved;
    if (item !== undefined) {
        reserved = item.data.attributes.isReserved;
    }
    console.log(reserved)

    console.log(listId, "BBBBBBBBBBB")

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const jwt = useStore(state => state.jwt)

    const defaultValues = {
        items: { id }
    };

    

    const { handleSubmit, formState: { errors }, register, reset } = useForm({ defaultValues });


    const updateItem = async (data) => {
        return await fetch(`${backendURL}/api/items/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify(data),

        })
            .then(console.log(data))
            .then(r => r.json());
    }

    const updateMutation = useMutation(updateItem, {
        onSuccess: () => {
            console.log("success")
            queryClient.invalidateQueries('isReserved');
        },
    })

    const onSubmit = () => {
        const data = {
            isReserved: true
        }
        updateMutation.mutate({ 
            data
         })

        //  navigate(`/listDetail/${listId}`)
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



                <Stack as="form" sx={{mt:4}} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Stack alignItems="center">

                        <Box sx={{ ml: 3 }}>
                            { item.data.attributes.imgPath === null ?  <img src="https://res.cloudinary.com/ddinuqloh/image/upload/v1660836557/lijstjestijd/present-gift_jczbd5.gif" alt="placeholder" width={'100px'}></img> : <img src={item.data.attributes.imgPath} alt="placeholder" width={'70px'}></img> }
                        </Box> 

                    </Stack>
                    <Stack sx={{ ml: 2, mr: 2 }}>
                        <Typography sx={{ mt: 1, mb: 1 }} variant="h2nalf">Product naam</Typography>
                        <Paper>
                            <Typography sx={{ mt: 1, ml: 2, mb: 1 }} variant="h3">{item.data.attributes.productName}</Typography>
                        </Paper>

                        <Typography sx={{ mt: 4, mb: 1 }} variant="h2nalf">Prijs</Typography>
                        <Paper sx={{ maxWidth: 160 }}>
                            <Typography sx={{ mt: 1, ml: 2, mb: 1 }} variant="h3">{item.data.attributes.price}</Typography>
                        </Paper>

                        <Typography sx={{ mt: 4, mb: 1 }} variant="h2nalf">Aantal</Typography>
                        <Paper sx={{ maxWidth: 160 }}>
                            <Typography sx={{ mt: 1, ml: 2, mb: 1 }} variant="h3">{item.data.attributes.amount}</Typography>
                        </Paper>

                        <Typography sx={{ mt: 4, mb: 1 }} variant="h2nalf">Omschrijving</Typography>
                        <Paper sx={{ minHeight: 150 }}>
                            <Typography sx={{ mt: 2, ml: 2, mr: 2, mb: 1 }} variant="h3">{item.data.attributes.description} </Typography>
                        </Paper>

                    </Stack>
                    <Stack alignItems="center">
                        <Stack>
                            {reserved ? <Typography variant="h2nalf" sx={{mt: 5, color: 'red.main'}}>artikel is gereserveerd!</Typography> : <LoadingButton sx={{ backgroundColor: 'secondary.main', fontSize: 20, maxWidth: 200, mt:4 }} variant="contained" loadingIndicator="Adding list" type="submit" >
                            Reserveer artikel
                         </LoadingButton>}

                        </Stack>
                     </Stack>

                </Stack>


            </>
        );

    }

}

SearchDetail.propTypes = {
    items: PropTypes.number,
  };


export default SearchDetail;