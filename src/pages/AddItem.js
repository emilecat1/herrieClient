import { GlobalStyles, Paper, Typography, Stack, Alert, CircularProgress, Button, Box, TextField, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from "react-query";
import placeholder from '../assets/Iplaceholder.jpeg';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStore } from '../store'
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';



const backendURL = process.env.REACT_APP_BACKEND_URL;
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ddinuqloh/upload';


const AddItem = ({ route }) => {

     const { isLoading, error, data: lists } = useQuery(["lists"], async () => {
         const data = await fetch(`${backendURL}/api/lists?populate=*`).then(r => r.json());
         console.log(data, 'dataadditem');
         return data;
     });


       let {id}  = useParams();

       console.log({id}, 'OMFJSQMFJEQRMFJ?');




    const defaultValues = {
        list: [id],
        amount: null,
        price: null,
        productName: "",
        description: ""
    };

    const Input = styled('input')({
        display: 'none',
      });

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

        navigate(`/listDetail/${id}` )
    }

    return (

        <>
            <GlobalStyles
                styles={{ body: { backgroundColor: "#eafcf7" }, }}
            />

        <Container sx={{maxWidth: 600}}>
            <Stack as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <Stack>

                     <Stack alignItems="center" spacing={2} sx={{ ml: 2, mr: 2, mt: 7 }}>
                         <Typography component="h1" variant="h6" sx={{ fontWeight: "normal", fontSize: 40, color: "primary.main", lineHeight: "35px", }} > add item </Typography>
                     </Stack>

                   

                    <Stack sx={{ ml: 2, mr: 2, mt: 2 }}>
                        <Typography sx={{ mt: 3, mb: 1 }} variant="h2nalf">Product naam</Typography>
                        <Paper sx={{ maxWidth: 230 }}>
                            <TextField size="small" sx={{ mt: 1, ml: 2, mb: 1 }}
                                inputProps={{ maxLength: 20 }}
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
                                type="number"
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
                                type="number"
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
                            <TextField size="small" sx={{ mt: 1.5, mb: 1.5, mr: 2 }}
                                id="description"
                                label="omschrijving"
                                required
                                multiline
                                rows={4}
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

AddItem.propTypes = {
    list: PropTypes.number,
    amount: PropTypes.number,
    price: PropTypes.number,
    productName: PropTypes.string,
    description: PropTypes.string

  };

export default AddItem;

