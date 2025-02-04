import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/api/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error("Error fetching recipe:", err));
  }, [id]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/recipes/${id}`, recipe);
      alert("המתכון עודכן בהצלחה!");
      navigate("/RecipesList"); 
    } catch (err) {
      console.error("Error updating recipe:", err);
      alert("אירעה שגיאה בעדכון המתכון.");
    }
  };

  return (
    <Box sx={{ maxWidth: "600px", margin: "80px auto", textAlign: "right", padding: "16px" }}>
      <Typography variant="h4" gutterBottom>עריכת מתכון</Typography>

      <TextField
        label="כותרת"
        name="title"
        value={recipe.title}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      
      <TextField
        label="תיאור"
        name="description"
        value={recipe.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />

      <TextField
        label="חומרים (מופרדים בפסיקים)"
        name="ingredients"
        value={recipe.ingredients}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="הוראות הכנה"
        name="instructions"
        value={recipe.instructions}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit}
      >
        שמירת שינויים
      </Button>
    </Box>
  );
};

export default EditRecipe;
