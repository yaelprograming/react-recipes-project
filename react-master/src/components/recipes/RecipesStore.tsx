
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStore } from '../../reduxStore';
// import { Difficulty } from './AddRecipe';

export type Recipe = {
    id: number;
    title: string;
    description: string;
    authorId: number;
    ingredients: string[];

    // difficulty:  "קל" | "בינוני" | "קשה" 
}
export const fetchRecipes = createAsyncThunk('recipes/fetch', async (_, thunkApi) => {
    try {
        const res = await axios.get("http://localhost:3000/api/recipes");
        return res.data as Recipe[];
    } catch (erorr) {
        return thunkApi.rejectWithValue(erorr);
    }
})

export const addRecipe = createAsyncThunk( 
    'recipes/add',
    async (recipe: Recipe, thunkApi) => {
        console.log("hjk");   
        try {
            const res = await axios.post("http://localhost:3000/api/recipes", recipe, { headers: { 'user-id': 1 } });
            return res.data as Recipe;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkApi.rejectWithValue(error.message);
            }
            return thunkApi.rejectWithValue("Unknown error occurred");
        }
    }
);

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [] as Recipe[], 
        loading: false,
        error: null as string | null
    },    
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
                state.loading = false;
                state.recipes = action.payload;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message||"Failed to load recipes"; 
            })
            .addCase(addRecipe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRecipe.fulfilled, (state, action: PayloadAction<Recipe>) => {
                state.loading = false;
                state.recipes.push(action.payload);
            })
            .addCase(addRecipe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message||"Failed to add recipe"; 
            });
    }
});
export const selectRecipes = (state: RootStore) => state.recipes;
export const { actions } = recipesSlice; // ייצוא הפעולות
// export const { fetchRecipes, addRecipe } = actions; // ייצוא הפעולות הספציפיות
export default recipesSlice;