import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router"
import { currentContext } from "./User";
import React from "react";
import MenuIcon from '@mui/material/IconButton';


const NavBar = () => {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const context = useContext(currentContext);  // מתחברים לקונטקסט של המשתמש
  // console.log(context)

  // const isLoggedIn = context?.currentUser !== null;
  // console.log(`isLoggedIn${isLoggedIn}`)


  //שלי
  return (<>
    <nav>
      <Box display="flex" justifyContent="flex-first" p={2} sx={{ position: 'fixed', top: 0, right: 0,  zIndex: 1301,color: "#6D4C41",background:"#4e342e", boxShadow: 2 }} >
        <Link to='/'>Home</Link>   ||
        <Link to='/RecipesList'>Recipes</Link> ||
        {/* <Link to='/AddRecipe'>AddRecipe</Link> */}
      </Box>
    </nav>
  </>)





}
export default NavBar;