import {
  GlobalStyles, Container, Stack, Typography, IconButton, Paper, CircularProgress, Alert
} from "@mui/material";
import Nav from "../components/Nav.js";
import ListSelf from "../components/ListSelf.js";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation, useQuery, useQueryClient } from "react-query";
import React, { useState } from "react";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const Pinned = () => {
  const [listId, setListId] = useState("");

  const { isLoading, error, data: list, } = useQuery(["lists"], async () => {
    const data = await fetch(`${backendURL}/api/lists?populate=*`).then((r) =>r.json());
    console.log(data);
    return data;
  });


  if (isLoading) {
    return <CircularProgress />
};

if (error) {
    return <Alert severity="error">Something went wrong</Alert>
};

  if (list) {
    console.log(list.data[0].attributes.items.data);

    const items = list.data[0].attributes.items;

    console.log(items.data);

    return (
      <>
        <GlobalStyles styles={{ body: { backgroundColor: "#eafcf7" } }} />

        <Container>
          <Stack direction="row" alignItems="center">
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ ml: 2, mr: 2, mt: 7 }}
            >
              <Typography
                component="h1"
                variant="h6"
                sx={{
                  fontWeight: "normal",
                  fontSize: 40,
                  color: "primary.main",
                  lineHeight: "35px",
                }}
              >
                Zoek lijstjes
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" sx={{ mt: 2 }}>
            <Paper sx={{ maxWidth: 240, mt: 2, ml: 1.5 }}>
              <Container sx={{ maxWidth: 340 }}>
                <TextField
                  size="small"
                  sx={{ mt: 1, mr: 5, mb: 1 }}
                  id="productName"
                  label="lijstcode"
                  required
                  fullWidth
                />
              </Container>
            </Paper>
            <LoadingButton
              sx={{
                backgroundColor: "secondary.main",
                fontSize: 18,
                maxHeight: 50,
                mt: 2.5,
                ml: 2,
              }}
              // loading={deleteMutation.isLoading}
              variant="contained"
              loadingIndicator="Adding list"
              type="submit"
            >
              Zoek
            </LoadingButton>
          </Stack>

          <Stack spacing={2} sx={{ mb: 15 }}></Stack>
        </Container>
        <Nav />
      </>
    );
  }
};

export default Pinned;
