import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

export const OrderItem = ({imgName='34.png', clientName, date}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
    <>
        <Box 
            display="flex" 
            justifyContent="space-between" 
            borderBottom={`1px solid ${colors.primary[400]}`}
            marginBottom="3px"
            marginTop="10px"
            >
            
            <Box display="flex" alignItems="center" mb={1}>
                <img src={require(`../profiles/${imgName}`)} style={{height:40, width:40, borderRadius:"100%"}} /> 
                <span style={{marginLeft:"20px"}}>{clientName}</span>
            </Box>
            
            <Box display="flex" alignItems="center">{date}</Box>
        </Box> 
    </>);
}