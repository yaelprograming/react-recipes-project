import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Grid, Typography, List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import { RootStore } from "../../reduxStore";
import RecipesList from "./RecipesList";

const RecipesLayout = () => {
    const recipes = useSelector((state: RootStore) => state.recipes.recipes);

    return (
             <Grid container spacing={3}  >
                <Grid
                    item
                    xs={3}
                    style={{
                        position: 'fixed',
                        top:75,
                        right: 0,
                        height: 'calc(100vh - 72px)',
                        overflowY: 'auto',
                        
                        paddingRight: '20px',
                        zIndex: 1,
                        backgroundColor: '#FFF',  // ניתן להוסיף צבע רקע לרשימה
                        borderLeft: '1px solid #ddd' // קו גבול בין הרשימה לתוכן
                    }}
                >
                    <RecipesList />
                </Grid>
    
                <Grid
                    item
                    xs={9}
                    style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        paddingLeft: '20px', // ריווח בין התוכן לבין צד ימין
                        paddingRight: '20px',
                        maxWidth: '80%',
                        position: 'relative', // כדי שלא יהיה תקלות עם הפוזיציה של צד ימין
                        zIndex: 0
                    }}
                >
                    <Outlet />
                </Grid>
            </Grid>
        );
    };

export default RecipesLayout;
