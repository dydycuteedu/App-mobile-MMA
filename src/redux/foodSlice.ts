import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Food } from '../dataTypes/foodTypes';
import {
  getAllFoods,
  getFoodsByCategory,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
  searchFoods,
} from '../api/foodAPI';

interface FoodState {
  allFoods: Food[];
  selectedFood: Food | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FoodState = {
  allFoods: [],
  selectedFood: null,
  status: 'idle',
  error: null,
};

// Async thunks
export const fetchAllFoods = createAsyncThunk('foods/fetchAll', async () => {
  const data = await getAllFoods();
  return data;
});

export const fetchFoodsByCategory = createAsyncThunk(
  'foods/fetchByCategory',
  async (category: string) => {
    const data = await getFoodsByCategory(category);
    return data;
  }
);

export const fetchFoodById = createAsyncThunk(
  'foods/fetchById',
  async (id: number) => {
    const data = await getFoodById(id);
    return data;
  }
);

export const addFood = createAsyncThunk(
  'foods/add',
  async (foodData: Omit<Food, 'id'>) => {
    const data = await createFood(foodData);
    return data;
  }
);

export const editFood = createAsyncThunk(
  'foods/edit',
  async ({ id, updatedData }: { id: number; updatedData: Partial<Food> }) => {
    const data = await updateFood(id, updatedData);
    return data;
  }
);

export const removeFood = createAsyncThunk(
  'foods/delete',
  async (id: number) => {
    await deleteFood(id);
    return id;
  }
);

export const searchFoodByName = createAsyncThunk(
  'foods/search',
  async (query: string) => {
    const data = await searchFoods(query);
    return data;
  }
);

// Slice
const foodSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {
    clearSelectedFood: (state) => {
      state.selectedFood = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllFoods
      .addCase(fetchAllFoods.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllFoods.fulfilled, (state, action: PayloadAction<Food[]>) => {
        state.status = 'succeeded';
        state.allFoods = action.payload;
      })
      .addCase(fetchAllFoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch foods';
      })

      // fetchFoodsByCategory
      .addCase(fetchFoodsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFoodsByCategory.fulfilled, (state, action: PayloadAction<Food[]>) => {
        state.status = 'succeeded';
        state.allFoods = action.payload;
      })
      .addCase(fetchFoodsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch foods by category';
      })

      // fetchFoodById
      .addCase(fetchFoodById.fulfilled, (state, action: PayloadAction<Food>) => {
        state.selectedFood = action.payload;
      })

      // addFood
      .addCase(addFood.fulfilled, (state, action: PayloadAction<Food>) => {
        state.allFoods.push(action.payload);
      })

      // editFood
      .addCase(editFood.fulfilled, (state, action: PayloadAction<Food>) => {
        const index = state.allFoods.findIndex((f) => f.id === action.payload.id);
        if (index !== -1) {
          state.allFoods[index] = action.payload;
        }
      })

      // removeFood
      .addCase(removeFood.fulfilled, (state, action: PayloadAction<number>) => {
        state.allFoods = state.allFoods.filter((f) => f.id !== action.payload);
      })

      // search
      .addCase(searchFoodByName.fulfilled, (state, action: PayloadAction<Food[]>) => {
        state.allFoods = action.payload;
      });
  },
});

export const { clearSelectedFood } = foodSlice.actions;
export default foodSlice.reducer;
