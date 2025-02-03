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
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex:1400
};
const Update = () => {
  const [isClicked, setIsClicked] = useState(false)
  const context = useContext(currentContext)
  const lNameRef = useRef<HTMLInputElement>(null)
  const fNameRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)
  //const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState({})
  const handleSubmit = async (e:React.FormEvent) => {  
    e.preventDefault()
    if (!context?.currentUser?.id) {
      console.error("User ID is missing!");
      return; // אם ה-ID לא קיים, אל תשלח את הבקשה
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
            'user-id':context?.currentUser.id // Ensure you replace '123' with the actual user ID as needed
        }
    }); 
       setUser(res.data.user) 
    
       context?.dispatch({ type: 'UPDATE', new_data: {id:context.currentUser.id, firstName:fNameRef.current?.value||'', lastName: lNameRef.current?.value || '', passward: context.currentUser.passward, email: context.currentUser.email, address: addressRef.current?.value || '', phone: phoneRef.current?.value || '' } })
       setIsClicked(false)
    
      } catch (error) {

        console.error('Error fetching data:', error);
      }
    }
       return (
      <>
        {<Box
          position="absolute"
          top={0}
          left={40}
          sx={{ padding: '16px' }} // הוסף סגנונות נוספים לפי הצורך
        ><Button onClick={() => setIsClicked(true)}>update-details</Button>
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
            {/* <TextField type="text" inputRef={emailRef} placeholder="email" /> */}
            <TextField type="text" inputRef={phoneRef} placeholder="phone" />
            <Button onClick={handleSubmit}>save</Button>
          </Box>
        </Modal>
        {/* {isClicked==false&& <button  onClick={()=>setIsClicked(true)}>update</button>} */}
        {/* {isClicked&&
           <form>
               <input type="text" ref={lNameRef} placeholder="lastName"/>
               <input type="text" ref={addressRef} placeholder="address"/>
               <input type="text" ref={emailRef} placeholder="email"/>
               <input type="text" ref={phoneRef} placeholder="phone"/>
               <button onClick={handleSubmit}>save</button>   
           </form>
           } */}
      </>
    )
  }
  export default Update

