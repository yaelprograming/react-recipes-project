import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootStore } from "../../reduxStore";
import { List, ListItem, Typography } from "@mui/material";


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
    return (<>
     <div>
            {recipe ? (
                <div  style={{marginTop:"75px"}}>
                    <Typography variant="h3" gutterBottom>
                        {recipe.title}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        תיאור:
                    </Typography>
                    <Typography paragraph>{recipe.description}</Typography>
                    <Typography variant="h6" gutterBottom>
                        חומרים:
                    </Typography>
                    <List>
                        {recipe.ingredients.map((ingredient, index) => (
                            <ListItem key={index}>{ingredient}</ListItem>
                        ))}
                    </List>,
                </div>
            ) : (
                <Typography>מתכון לא נמצא</Typography>
            )}
        </div>
    </>)
}

export default ShowRecipe