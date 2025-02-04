import { useContext, useRef, useState } from "react"
import { userContext, userId } from "./Home"
import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import axios from "axios";
import { currentContext } from "./User";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: "#D7CCC8",
  borderRadius: "12px",
  boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.2)",
  p: 4,
  zIndex:1400
};
const Update = () => {
  const [isClicked, setIsClicked] = useState(false)
  const context = useContext(currentContext)
  const lNameRef = useRef<HTMLInputElement>(null)
  const fNameRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState({})
  const handleSubmit = async (e:React.FormEvent) => {  
    e.preventDefault()
    if (!context?.currentUser?.id) {
      console.error("User ID is missing!");
      return; 
  }
    try{
      console.log("id!!!!! :"+context?.currentUser.id)
      console.log('Current User:', context?.currentUser);

        const res=await axios.put('http://localhost:3000/api/user',
       {
        firstName:fNameRef.current?.value||context?.currentUser.firstName,
        lastName:lNameRef.current?.value||context?.currentUser.lastName,
        email:context?.currentUser.email,
        address:addressRef.current?.value||context?.currentUser.address,
        phone:phoneRef.current?.value||context?.currentUser.phone
       
       } , {
        headers: {
            'user-id':context?.currentUser.id 
        }
    }); 
       setUser(res.data.user) 
    
       context?.userDispatch({ type: 'UPDATE', new_data: {id:context.currentUser.id, firstName:fNameRef.current?.value||'', lastName: lNameRef.current?.value || '', passward: context.currentUser.passward, email: context.currentUser.email, address: addressRef.current?.value || '', phone: phoneRef.current?.value || '' } })
       setIsClicked(false)
    
      } catch (error) {

        console.error('Error fetching data:', error);
      }
    }
       return (
      <>
        {<Box
          position="absolute"
          top={10}
          left={70}
          sx={{ width:"" }} 
        ><Button
        sx={{
          backgroundColor: "#8D6E63", 
          color: "white",
          fontSize: "14px",
          padding: "6px 12px", 
          borderRadius: "8px", 
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#6D4C41", 
          }
        }}
         onClick={() => setIsClicked(true)}>update</Button>
        </Box>}
        <Modal
          open={isClicked}
          onClose={() => setIsClicked(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <TextField type="text" inputRef={fNameRef} placeholder="firstName" />
          <TextField type="text" inputRef={lNameRef} placeholder="lastName" />
            <TextField type="text" inputRef={addressRef} placeholder="address" />
            <TextField type="text" inputRef={phoneRef} placeholder="phone" />
            <Button onClick={handleSubmit}>save</Button>
          </Box>
        </Modal>
        
      </>
    )
  }
  export default Update

