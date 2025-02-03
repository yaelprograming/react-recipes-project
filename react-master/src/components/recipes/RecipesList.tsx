import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootStore } from "../../reduxStore";
import { useContext, useEffect, useState } from "react";
import { addRecipe, fetchRecipes, Recipe } from "./RecipesStore";
import AddRecipe from "./AddRecipe";
import { Link } from "react-router-dom";
import { Avatar, List, ListItem, Typography } from "@mui/material";
import { currentContext } from "../User";


export default () => {
    const dispatch = useDispatch<AppDispatch>();
    const recipes = useSelector((state: RootStore) => state.recipes.recipes);
    const context=useContext(currentContext)

    useEffect(() => {
        dispatch(fetchRecipes()).catch((error) => {
            console.error("Error fetching recipes", error)
        });
    }, [dispatch]);

   
    const handleAdd = (item: Recipe) => {
        dispatch(addRecipe(item));
    }
console.log(context?.currentUser)
    return (
        <>
            <div>
                <Typography variant="h6" gutterBottom>
                    רשימת מתכונים
                </Typography>
                
                { context?.currentUser&&<Link to="/AddRecipe"></Link>}
                <List>
                    {recipes.map((recipe: Recipe) => (
                        recipe.title ? (
                            <ListItem key={recipe.id} sx={{ marginBottom: "15px" }}>
                                <Link to={`Recipe/${recipe.id}`} style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    display: "flex",
                                    alignItems: "center",
                                }}>
<Avatar
  src={`/images/${recipe.title ? recipe.title.replace(/\s+/g, '') : 'default'}.jpg`}
  onError={(e) => {
    e.target.src = '/images/default.jpg'; // set the fallback image
  }}
  alt={recipe.title || "תמונה לא זמינה"}
  sx={{
    width: 80,
    height: 80,
    marginRight: 2,
    borderRadius: 0,
  }}
/>
                                    <Typography variant="body1">{recipe.title}</Typography>
                                </Link>
                            </ListItem>) : null
                    ))}
                </List>
            </div>
        </>
    )
}

