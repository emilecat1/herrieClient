import { GlobalStyles, Stack, Typography,  } from "@mui/material";
import ReservationSelf from '../components/ReservationSelf.js';

const Reservations = () => {
    return ( 
        <>
            <GlobalStyles
                styles={{ body: { backgroundColor: "#eafcf7" }, }}
            />

            <Stack direction="row" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={2} sx={{ ml: 2, mr: 2, mt: 5 }}>
                    <Typography component="h1" variant="h6" sx={{ fontWeight: "medium", fontSize: 85, color: "primary.main" }} >2</Typography>
                    <Typography component="h1" variant="h6" sx={{ fontWeight: "normal", fontSize: 40, color: "primary.main" }} >Reservaties</Typography>
                </Stack>
                
            </Stack>

            <Stack spacing={2}>
                <ReservationSelf />
                <ReservationSelf />
                <ReservationSelf />
                <ReservationSelf />
                <ReservationSelf />
                <ReservationSelf />
                <ReservationSelf />
                <ReservationSelf />
                <ReservationSelf />
                <ReservationSelf />
            </Stack>
        </>
     );
}
 
export default Reservations;