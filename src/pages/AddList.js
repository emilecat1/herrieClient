import {
  GlobalStyles,
  Paper,
  Typography,
  Stack,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useStore } from "../store";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const AddList = () => {
  const username = useStore((state) => state.username);

  // const { isLoading, error, data: users } = useQuery(["users"], async () => {
  //     const data = await fetch(`${backendURL}/api/users?populate=*`).then(r => r.json());
  //     console.log(data, 'user data');
  //     return data;
  // });

  const { isLoading, error, data: users,} = useQuery(["users"], async () => { 
    const data = await fetch(`${backendURL}/api/users/?filters[username][$eq]=${username}&populate=*`).then((r) => r.json());
    console.log(data[0].id, "userid");
    console.log(data[0].lists, "homusers");
    return data;
  });


  let userId;
    if (users !== undefined) {
        userId = users[0].id;
    }



  console.log(userId, "userId");

  // console.log(userId, "dit is final user id");

  const defaultValues = {
    user: [userId],
    name: "",
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const jwt = useStore((state) => state.jwt);

  const { handleSubmit, formState: { errors }, register, reset,} = useForm({ defaultValues });

  const postList = async (data) => {
    return await fetch(`${backendURL}/api/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    })
      .then(console.log(data))
      .then((r) => r.json());
  };

  const mutation = useMutation(postList, {
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries("lists");
      reset();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({ data });

    navigate("/list");
  };

  return (
    <>
      <GlobalStyles styles={{ body: { backgroundColor: "#eafcf7" } }} />

      <Stack
        alignItems="center"
        sx={{ mt: 25 }}
        as="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Paper sx={{ maxWidth: 350, minWidth: 350, minHeight: 280 }}>
          <Stack sx={{ mt: 5, ml: 2 }}>
            <Typography variant="h1">Lijstje maken</Typography>
            <TextField
              sx={{ mt: 4, maxWidth: 300 }}
              id="name"
              label="lijst naam"
              required
              error={!!errors?.name}
              helperText={errors?.name?.message}
              {...register("name", {
                required: "Name is required",
              })}
            />

            <LoadingButton
              loading={mutation.isLoading}
              sx={{ maxWidth: 300, mt: 4 }}
              loadingIndicator="Adding list"
              type="submit"
              variant="contained"
            >
              Lijst toevoegen
            </LoadingButton>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

export default AddList;
