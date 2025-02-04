 import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Divider, IconButton, TextField, Typography } from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { array,  object, string } from "yup";
import { addRecipe, Recipe } from "./RecipesStore";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../reduxStore";
export enum Difficulty {
    Easy = 'קל',
    Medium = 'בינוני',
    Hard = 'קשה',
}

export type RecipeType = { 
    title: string;
    description: string;
     ingredients: { name: string }[];
    instructions:string;
}

const schema = object({
    title: string().required("Title is required"),
    description: string().required("Description is required"),
    ingredients: array().of(
        object({ name: string().required("Ingredient is required") })
    ).min(1, "At least one ingredient is required"),
}).required();
    
    const AddRecipe = ({ addToList }: { addToList: Function }) => {
        const dispatch = useDispatch<AppDispatch>();
        const { control, formState: { errors }, register, handleSubmit, reset } = useForm<RecipeType>({
            resolver: yupResolver(schema),
        });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients", 
    });

    const onSubmit = (data: RecipeType) => {
        const newRecipe: Recipe = {
            title: data.title,
            description: data.description,
            ingredients: data.ingredients.map(i => i.name),
            instructions:"fghjk",
        };    
        dispatch(addRecipe(newRecipe)); 
        reset();
    };

    return (
        <>
<Box sx={{ maxWidth: '100%', margin: '0 auto', marginTop: 4,padding: 4, backgroundColor: '#F4F1F0', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#6E4B3A' }}>
        הוסף מתכון חדש
      </Typography>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="כותרת המתכון"
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: '#FFF4E6' }}
              error={!!errors.title}
              helperText={errors.title ? "הכותרת היא שדה חובה" : ""}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="תיאור המתכון"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              sx={{ backgroundColor: '#FFF4E6' }}
              error={!!errors.description}
              helperText={errors.description ? "תיאור הוא שדה חובה" : ""}
            />
          )}
        />
        <Typography variant="h6" sx={{ color: '#6E4B3A' }}>החומרים</Typography>
        {fields.map((item, index) => (
          <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Controller
              name={`ingredients[${index}].name`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={`חומר #${index + 1}`}
                  variant="outlined"
                  fullWidth
                  sx={{ backgroundColor: '#FFF4E6' }}
                />
              )}
            />
            <IconButton onClick={() => remove(index)} sx={{ color: '#6E4B3A' }}>
             remove
            </IconButton>
          </Box>
        ))}
        <Button
          variant="outlined"
          color="secondary"
          startIcon="add"
          onClick={() => append({ name: '' })}
          sx={{ marginTop: 2 }}
        >
          הוסף חומר
        </Button>
        {errors.ingredients && (
          <Typography color="error" variant="body2">יש למלא את כל החומרים</Typography>
        )}

        <Divider sx={{ marginY: 2 }} />
        <Controller
          name="instructions"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="תאר את אופן ההכנה"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              sx={{ backgroundColor: '#FFF4E6' }}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#6E4B3A',
            '&:hover': { backgroundColor: '#A16848' },
            color: '#FFF',
            marginTop: 3,
          }}
        >
          שלח לתנור... :)
        </Button>
      </form>
    </Box>
        </> 
    )
}
export default AddRecipe
