import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootStore } from "../../reduxStore";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant"; 
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import ChecklistIcon from "@mui/icons-material/Checklist"; 

const ShowRecipe = () => {
    const { id} = useParams();
    const recipes = useSelector((state: RootStore) => state.recipes.recipes);
    let recipe;
    if (id){
    recipe=recipes.find(x=>x.id===parseInt(id))
    }
    else
    {
        console.log("not found");       
    }

    return (
        <Box sx={{ margin: "80px auto",marginRight:"15%" ,textAlign: "center", padding: "16px" }}>
          {recipe ? (
            <>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
                {recipe.title}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                תיאור:
              </Typography>
              <Typography paragraph sx={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                {recipe.description}
              </Typography>
      
              <Divider sx={{ my: 2 }} />
      
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                חומרים:
              </Typography>
              <List>
                {recipe.ingredients.map((ingredient, index) => (
                  <ListItem key={index} sx={{ display: "flex", alignItems: "center" }}>
                    <RestaurantIcon sx={{ color: "#6D4C41", mr: 1 }} /> 
                    <ListItemText primary={ingredient} />
                  </ListItem>
                ))}
              </List>
    <Divider sx={{ my: 2 }} />
      
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
                <ChecklistIcon sx={{ color: "#795548" }} /> {/* ✅ אייקון */}
                הוראות הכנה:
              </Typography>
              <Typography paragraph sx={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                {recipe.instructions}
              </Typography>
      
              <Divider sx={{ my: 2 }} />
      
              <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", color: "#6D4C41", mt: 4 }}>
                בתיאבון! <EmojiFoodBeverageIcon sx={{ fontSize: "2rem", color: "#A1887F" }} /> {/* ☕ אייקון */}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
              מתכון לא נמצא
            </Typography>
          )}
        </Box>
      );
}

export default ShowRecipe