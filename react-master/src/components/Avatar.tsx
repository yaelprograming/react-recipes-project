import { useContext } from "react";
import Avatar from '@mui/material/Avatar';
import { Box, Stack } from "@mui/material";
import { currentContext } from "./User";

const LetterAvatar=() =>{
  const context=useContext(currentContext)
    let f: string = ''
    if (context) {
        f = context.currentUser.firstName[0]
        if(context.currentUser.lastName)
        f+=context.currentUser.lastName[0]
    }
  return (
    <Stack direction="row" spacing={2}>
           <Box 
            position="absolute" 
            top={-4} 
            left={4} 
            sx={{ padding: '10px' }}
        >
            <Avatar sx={{ bgcolor:"#8D6E63" , width: 40, height: 40,border: "3px solid #6D4C41",
               transition: "0.3s","&:hover": { transform: "scale(1.1)", boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.3)" }
            }} >{f}</Avatar>
        </Box>      
    </Stack>
  );
}

export default LetterAvatar;
