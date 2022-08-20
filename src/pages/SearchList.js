import {
  GlobalStyles, Container, Stack, Typography, IconButton, Paper, CircularProgress, Alert
} from "@mui/material";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SearchItem from '../components/SearchItem.js';
import { useMutation, useQuery, useQueryClient } from "react-query";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const SearchList = () => {

  const [listCode, setListCode] = useState('');
  console.log(listCode)

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [items, setItems] = useState();
  const [title, setTitle] = useState();
  const [list, setList] = useState();

  const { handleSubmit, formState: { errors }, register, reset } = useForm();

  const onSubmit = async () => {

    const list = await fetch(`${backendURL}/api/lists/${listCode}?populate=*`).then(r => r.json());
    setList(list);
    setItems(list.data.attributes.items);
    setTitle(list.data.attributes.name);
   
  
    setIsSubmitted(true);
  }


  console.log(list);

  if(!list){
    return (
      <>
        <GlobalStyles styles={{ body: { backgroundColor: "#eafcf7" } }} />

        <Container>
          <Stack direction="row" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={2} sx={{ ml: 2, mr: 2, mt: 7 }}>
              <Typography component="h1" variant="h6" sx={{ fontWeight: "normal", fontSize: 40, color: "primary.main", lineHeight: "35px", }} > Zoek lijstjes </Typography>
            </Stack>
          </Stack>
          <Typography sx={{ mt: 4, ml:1.5, maxWidth: 330 }} variant="h3">Voer hier de unieke lijstcode in om producten uit de lijst te bekijken.</Typography>
          <Stack as="form" noValidate onSubmit={handleSubmit(onSubmit)} direction="row" >
         
            <Paper sx={{ maxWidth: 240, mt: 2, ml: 1.5 }}>
              <Container sx={{ maxWidth: 340 }}>
                <TextField
                  size="small"
                  sx={{ mt: 1, mr: 5, mb: 1 }}
                  id="listCode"
                  label="lijstcode"
                  type="number"
                  required
                  fullWidth
                  onChange={(event) => setListCode(event.target.value)}
                  value={listCode}
                />
              </Container>
            </Paper>
            <LoadingButton sx={{ backgroundColor: "secondary.main", fontSize: 18, maxHeight: 50, mt: 2.5, ml: 2, }}
              variant="contained"
              loadingIndicator="Adding list"
              type="submit"
            >
              Zoek
            </LoadingButton>
          </Stack>

        </Container>
      </>
    )
  }


  if(list.data === null){
    return (
      <>
        <GlobalStyles styles={{ body: { backgroundColor: "#eafcf7" } }} />

        <Container>
          <Stack direction="row" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={2} sx={{ ml: 2, mr: 2, mt: 7 }}>
              <Typography component="h1" variant="h6" sx={{ fontWeight: "normal", fontSize: 40, color: "primary.main", lineHeight: "35px", }} > Zoek lijstjes </Typography>
            </Stack>
          </Stack>
          <Typography sx={{ mt: 4, ml:1.5, maxWidth: 330 }} variant="h3">Voer hier de unieke lijstcode in om producten uit de lijst te bekijken.</Typography>
          <Stack as="form" noValidate onSubmit={handleSubmit(onSubmit)} direction="row" >
         
            <Paper sx={{ maxWidth: 240, mt: 2, ml: 1.5 }}>
              <Container sx={{ maxWidth: 340 }}>
                <TextField
                  size="small"
                  sx={{ mt: 1, mr: 5, mb: 1 }}
                  id="listCode"
                  label="lijstcode"
                  required
                  fullWidth
                  onChange={(event) => setListCode(event.target.value)}
                  value={listCode}
                />
              </Container>
            </Paper>
            <LoadingButton sx={{ backgroundColor: "secondary.main", fontSize: 18, maxHeight: 50, mt: 2.5, ml: 2, }}
              variant="contained"
              loadingIndicator="Adding list"
              type="submit"
            >
              Zoek
            </LoadingButton>
          </Stack>
          <Stack alignItems="center" sx={{mt:10}}>
            <Typography sx={{fontSize: 60, ml: 6.5, fontWeight: "bold", color: "red.softer"}}>Lijstcode ongeldig</Typography>
          </Stack>

        </Container>
      </>
    )
  }



    return (
      <>
        <GlobalStyles styles={{ body: { backgroundColor: "#eafcf7" } }} />

        <Container>
          <Stack direction="row" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={2} sx={{ ml: 2, mr: 2, mt: 7 }}>
              <Typography component="h1" variant="h6" sx={{ fontWeight: "normal", fontSize: 40, color: "primary.main", lineHeight: "35px", }} > Zoek lijstjes </Typography>
            </Stack>
          </Stack>
          <Typography sx={{ mt: 4, ml:1.5, maxWidth: 330 }} variant="h3">Voer hier de unieke lijstcode in om producten uit de lijst te bekijken.</Typography>
          <Stack as="form" noValidate onSubmit={handleSubmit(onSubmit)} direction="row" >
         
            <Paper sx={{ maxWidth: 240, mt: 2, ml: 1.5 }}>
              <Container sx={{ maxWidth: 340 }}>
                <TextField
                  size="small"
                  sx={{ mt: 1, mr: 5, mb: 1 }}
                  id="listCode"
                  label="lijstcode"
                  required
                  fullWidth
                  onChange={(event) => setListCode(event.target.value)}
                  value={listCode}
                />
              </Container>
            </Paper>
            <LoadingButton sx={{ backgroundColor: "secondary.main", fontSize: 18, maxHeight: 50, mt: 2.5, ml: 2, }}
              variant="contained"
              loadingIndicator="Adding list"
              type="submit"
            >
              Zoek
            </LoadingButton>
          </Stack>

              <Stack  alignItems="center" sx={{mt:2}}>
                  {isSubmitted && <Typography component="h1" variant="h6" sx={{ fontWeight: "bold", fontSize: 40, color: "primary.main" }}>{title}</Typography>}
                <Stack spacing={0.5} sx={{ minHeight: 450, maxHeight: 450, overflow: "auto" }} >
                  {isSubmitted && items.data.map(item => <SearchItem key={item.id} item={item} />)}
                </Stack>
              </Stack>

        </Container>
      </>
    );
};

export default SearchList;
