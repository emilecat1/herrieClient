import React from 'react';

import { RiHomeLine } from "react-icons/ri";
import { GoListUnordered } from "react-icons/go";
import { BsFillGiftFill } from "react-icons/bs";
import { BsFillPinFill } from "react-icons/bs";
import { BsFillLightbulbFill } from "react-icons/bs";

import { Link as RouterLink } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';




const Nav = () => {
    const [value, setValue] = React.useState(0);
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 100, zIndex: 3000 }} elevation={3}>

            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}

                sx={{ height: 100, bgcolor: 'background.darker', }}
            >

                <BottomNavigationAction to={"/"} component={RouterLink} icon={<RiHomeLine size={45}  />} />
                <BottomNavigationAction to={"/List"} component={RouterLink} icon={<GoListUnordered size={40} />} />
                <BottomNavigationAction to={"/Reservations"} component={RouterLink} icon={<BsFillGiftFill size={38} />} />
                <BottomNavigationAction to={"/Pinned"} component={RouterLink} icon={<BsFillPinFill size={40} />} />
                <BottomNavigationAction to={"/messages"} component={RouterLink} icon={<BsFillLightbulbFill size={40} />} />
                
            </BottomNavigation>

        </Paper>
    );
};

export default Nav;