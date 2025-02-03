import axios from "axios"
import { FormEvent, useContext, useRef, useState } from "react"
import { Box, Button, Modal, TextField } from "@mui/material"
import { currentContext } from "./User";
import zIndex from "@mui/material/styles/zIndex";

const style = {
  position: 'fixed',
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
const style2 = {
  position: 'absolute',
  top: '0', // Position at the top
  left: '0', // Position at the left
  transform: 'translate(0, 0)', // No translation
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex:1400
};

const Login = ({ IsOpen }: { IsOpen: Function }) => {
  const [isClicked, setIsClicked] = useState(false)
  const context = useContext(currentContext)
  //const fNameRef=useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwardREf = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState({})

  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log("email: "+emailRef.current?.value)
      console.log("passward: "+passwardREf.current?.value)
    try {
      const res = await axios.post('http://localhost:3000/api/user/login',
        {
          email: emailRef.current?.value,
          password: passwardREf.current?.value

          
        })
      setUser(res.data.user)
      
      context?.dispatch({ type: 'CREATE', new_data: { id: res.data.user.id, firstName: '', lastName: '', passward: passwardREf.current?.value || '', email: emailRef.current?.value||'', address: '', phone: '' } })
      //setIsClicked(false)   
      
      IsOpen()
    }
    catch (e) {
      if (e.status === 401) {
        alert("email or passward isnt valid");
      }
    }
    if (context) {
      //if(context.currentUser.firstName==fNameRef.current?.value&&context.currentUser.passward==passwardREf.current?.value)           
    }


  }

  return (
    <>
      {/* {isClicked==false&& <button  onClick={()=>setIsClicked(true)}>login</button>} */}

      <Button style={{ position: 'absolute', top: 10, left: 10 }} onClick={() => setIsClicked(true)}>login </Button>
      {/* { isClicked==false&&<Button style={{ position: 'absolute', top: 10, left: 10 }}  onClick={()=>setIsClicked(true)}>login </Button>} */}
      <Modal
        open={isClicked}
        onClose={() => setIsClicked(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField type="email" inputRef={emailRef} placeholder="email"  />
          <TextField type="password" inputRef={passwardREf} placeholder="passward" />
          <Button onClick={handleSubmit}>log-in</Button>

        </Box>
      </Modal>
    </>
  )
}
export default Login
