 import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Divider, dividerClasses, IconButton, TextField, Typography } from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { array,  object, string } from "yup";
import { addRecipe, Recipe } from "./RecipesStore";
import { AsyncThunkAction, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
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
        name: "ingredients", // שם השדה במודל
    });

    const onSubmit = (data: RecipeType) => {
        const newRecipe: Recipe = {
            title: data.title,
            description: data.description,
            ingredients: data.ingredients.map(i => i.name),
            instructions:"fghjk",

            // authorId: 0,  // כאן אתה צריך לוודא שאתה שולח את ה-userId אם יש
        };    
        dispatch(addRecipe(newRecipe));  // שליחה ל-Redux
        reset();
    };

    return (
        <>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <label>הכנס כותרת למתכון</label>
                <br />
                <input {...register("title")}></input>
                <br />
                {errors.title && <div>{errors.title.message}</div>}
                <br />
                <label>נסה לגרות אותנו</label>
<br />
                <input {...register("description")}></input>
                {errors.description && <div>{errors.description.message}</div>}
                <br />
                <label>הכנס את רשימת החומרים הדרושים</label>
            {fields.map((item, index) => (
                <div key={item.id}>
                    <input {...register(`ingredients[${index}].name`)} placeholder={`חומר #${index + 1}`} />
                    <button type="button" onClick={() => remove(index)}>הסרת חומר</button>
                </div>
            ))}
            <button type="button" onClick={() => append({name:""})}>הוסף חומר</button>
            {errors.ingredients && <div>{errors.ingredients.message}</div>}
                <br />
                <label>תאר את אופן ההכנה</label>
                <br />
                <br />
<button type="submit">שלח לתנור...:)</button>
            </form>
*/}

<Box sx={{ maxWidth: '100%', margin: '0 auto', padding: 4, backgroundColor: '#F4F1F0', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#6E4B3A' }}>
        הוסף מתכון חדש
      </Typography>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* כותרת המתכון */}
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

        {/* תיאור המתכון */}
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

        {/* חומרים */}
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

        {/* שגיאות חומרים */}
        {errors.ingredients && (
          <Typography color="error" variant="body2">יש למלא את כל החומרים</Typography>
        )}

        <Divider sx={{ marginY: 2 }} />

        {/* אופן הכנה */}
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

        {/* כפתור שליחה */}
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
