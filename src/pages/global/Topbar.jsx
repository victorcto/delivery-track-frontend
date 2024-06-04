import { Box, IconButton, colors, useTheme } from '@mui/material'
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon  from '@mui/icons-material/ExpandMore';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    console.log("....."+theme.palette.secondary[500]);
    console.log("....."+theme.mode);
    return (
        <Box display="flex" justifyContent="space-between"  p={2} borderBottom={`1px solid ${colors.primary[400]}`} >
            <Box >
                <IconButton 
                onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (<DarkModeOutlinedIcon/>):(<LightModeOutlinedIcon/>)}
                </IconButton>
          
            </Box>
            <Box display="flex" mr="15px" >
                <Box>
                   <img src={require('../../profiles/34.png')} style={{height:40, borderRadius:"20%"}} />
                </Box>
                <Box alignContent={'center'} ml={1}>Administrador</Box>
                <IconButton>
                    <ExpandMoreIcon></ExpandMoreIcon>
                </IconButton>
            </Box>

        </Box>
    );
}

export default Topbar;