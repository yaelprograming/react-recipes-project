import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { createContext, FormEvent, useContext, useRef, useState } from "react"
import axios from "axios"
import { currentContext } from "./User";
import zIndex from "@mui/material/styles/zIndex";

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

const LogUp = ({ IsOpen }: { IsOpen: Function }) => {
  const [isClicked, setIsClicked] = useState(false)
  const context = useContext(currentContext)
  // const [id,setId]=useContext(userIdRes)
  //const fNameRef=useRef<HTMLInputElement>(null)
 // const fNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwardREf = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState({})
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/api/user/register',
        {
          email: emailRef.current?.value,
          password: passwardREf.current?.value

        })
      setUser(res.data.user)

      IsOpen()
      context?.dispatch({ type: 'CREATE', new_data: { id: res.data.userId, firstName: '', lastName: '', passward: passwardREf.current?.value || '', email: emailRef.current?.value||'', address: '', phone: '' } })
      //setIsClicked(false)
      //  const g:String=(res.data.user.id)
    }
    catch (e) {
      if (e.response) {
        console.error('Error response:', e.response.data);
    } else {
        console.error('Error', e.message);
    }
    }

    if (context) {
      //if(context.currentUser.firstName==fNameRef.current?.value&&context.currentUser.passward==passwardREf.current?.value)

    }

  }


  return (
    <>
      {/* {isClicked==false&& <button  onClick={()=>setIsClicked(true)}>login</button>} */}

      <Button style={{ position: 'absolute', top: 10, left: 100 }} onClick={() => setIsClicked(true)}>Sign up </Button>
      {/* { isClicked==false&&<Button style={{ position: 'absolute', top: 10, left: 100 }} onClick={()=>setIsClicked(true)}>LogUp </Button>} */}
      <Modal
        open={isClicked}
        onClose={() => setIsClicked(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField type="email" inputRef={emailRef} placeholder="email" />
          <TextField type="password" inputRef={passwardREf} placeholder="passward" />
          <Button onClick={handleSubmit}>CREATE</Button>
        </Box>
      </Modal>
    </>)



}
export default LogUp
