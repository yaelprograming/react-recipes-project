import { AppBar, Toolbar,  Box,  MenuItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { currentContext } from "./User";
import LogIn from "./LogIn";
import LogUp from "./LogUp";
import LetterAvatar from "./Avatar";
import Update from "./UpDate";

const NavBar = () => {
  const context = useContext(currentContext);
  const isLoggedIn = !!context?.currentUser?.id;
  const [userLoggedIn, setUserLoggedIn] = useState(isLoggedIn);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  useEffect(() => {
    setUserLoggedIn(isLoggedIn); 
  }, [isLoggedIn]);
  
  return (
<>
<AppBar position="fixed" sx={{ backgroundColor: "#4e342e" }}>
  <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    
    <Box sx={{ display: "flex", gap: 2 }}>
      <MenuItem component={Link} to="/">בית</MenuItem>
      <MenuItem component={Link} to="/RecipesList">מתכונים</MenuItem>
      <MenuItem component={Link} to="/about">אודות</MenuItem>
      {context?.currentUser?.id && <MenuItem component={Link} to="/AddRecipe">הוסף מתכון</MenuItem>}
    </Box>

    {!context?.currentUser?.id ? (
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <LogIn />
        <LogUp />
      </Box>
    ) : null}
  </Toolbar>
</AppBar>

{context?.currentUser?.id && (
  <Box sx={{
    position: "absolute",  
    top: 10, 
    right: 220, 
    display: "flex",
    alignItems: "center",
    gap: 2,
    backgroundColor: "white", 
    padding: "8px",
    borderRadius: "8px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)", 
    zIndex: 10000
  }}>
    <LetterAvatar />
    <Update />
  </Box>
)}
</>
  );
};

export default NavBar;
