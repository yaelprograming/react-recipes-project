import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootStore } from "../../reduxStore";
import { useContext, useEffect } from "react";
import { addRecipe, fetchRecipes, Recipe } from "./RecipesStore";
import { Avatar, Box, Button, Card, CardContent, Typography } from "@mui/material";
import { currentContext } from "../User";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

export default () => {
    const dispatch = useDispatch<AppDispatch>();
    const recipes = useSelector((state: RootStore) => state.recipes.recipes);
    const context = useContext(currentContext)

    useEffect(() => {
        dispatch(fetchRecipes()).catch((error) => {
            console.error("Error fetching recipes", error)
        });
    }, [dispatch]);


    const handleAdd = (item: Recipe) => {
        dispatch(addRecipe(item));
    }
    return (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 1.5, padding: 2 }}>

            {recipes.map((recipe) => (
                <Card key={recipe.id} sx={{ maxWidth: 220, boxShadow: 1, textAlign: "center", padding: 2 }}>

                    <Avatar
                        src={`/images/${recipe.title ? recipe.title.replace(/\s+/g, '') : 'default'}.jpg`}
                        onError={(e) => { e.currentTarget.src = "/images/default.jpg"; }} 
                        sx={{
                            width: 120,
                            height: 120,
                            margin: "auto",
                            borderRadius: "12px", 
                            boxShadow: "1px 1px 6px rgba(0,0,0,0.15)"
                        }}
                    />

                    <CardContent>
                        <Typography variant="h6" gutterBottom>{recipe.title}</Typography>

                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                            {recipe.description.substring(0, 60)}...
                        </Typography>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Button component={Link} to={`Recipe/${recipe.id}`} variant="contained" sx={{ backgroundColor: "#6D4C41", marginRight: 1 }}>
                                למתכון
                            </Button>

                            <Button
                                component={Link}
                                to={`/edit-recipe/${recipe.id}`}
                                variant="outlined"
                                sx={{ color: "#6D4C41", borderColor: "#6D4C41" }}
                                startIcon={<EditIcon />}
                            >
                                עריכה
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
