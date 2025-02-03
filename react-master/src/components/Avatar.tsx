import { useContext } from "react";
import Avatar from '@mui/material/Avatar';
import { deepPurple} from '@mui/material/colors';
import { Box, Stack } from "@mui/material";
import { currentContext } from "./User";
// import { deepOrange } from "@mui/material/colors";


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
            top={0} 
            left={0} 
            sx={{ padding: '16px' }} // הוסף סגנונות נוספים לפי הצורך
        >
            <Avatar sx={{ bgcolor: deepPurple[700] }} >{f}</Avatar>
        </Box>      
    </Stack>
    
  );
}

export default LetterAvatar;
