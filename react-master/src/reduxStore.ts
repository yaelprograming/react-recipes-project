import { combineSlices, configureStore } from "@reduxjs/toolkit";
import recipesSlice from "./components/recipes/RecipesStore";

const store = configureStore({
    reducer:  combineSlices(recipesSlice)
});

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;