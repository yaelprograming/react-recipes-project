import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { FormEvent, useContext, useRef, useState } from "react";
import axios from "axios";
import { currentContext } from "./User";

const LogUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(currentContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/user/register", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });

      context?.userDispatch({
        type: "CREATE",
        new_data: {
          id: res.data.userId,
          firstName: "",
          lastName: "",
          passward: passwordRef.current?.value || "",
          email: emailRef.current?.value || "",
          address: "",
          phone: "",
        },
      });

      setIsOpen(false);
    } catch (e) {
      alert("שגיאה בהרשמה! נסי שוב.");
    }
  };

  return (
    <>
      <Button variant="outlined" sx={{ borderColor: "white", color: "white" }} onClick={() => setIsOpen(true)}>
        Sign Up
      </Button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#6D4C41" }}>הרשמה</Typography>
          <TextField type="email" inputRef={emailRef} placeholder="אימייל" fullWidth sx={{ mb: 2, bgcolor: "white" }} />
          <TextField type="password" inputRef={passwordRef} placeholder="סיסמה" fullWidth sx={{ mb: 2, bgcolor: "white" }} />
          <Button variant="contained" sx={{ backgroundColor: "#8D6E63", "&:hover": { backgroundColor: "#6D4C41" } }} fullWidth onClick={handleSubmit}>
            הירשם
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#FAF3E0",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default LogUp;


