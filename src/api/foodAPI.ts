import { Food } from '../dataTypes/foodTypes';

const BASE_URL = 'http://192.168.5.107:3000/foods';

// Utility to handle fetch + JSON + error
const fetchData = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

// GET all foods
export const getAllFoods = async (): Promise<Food[]> => {
  return await fetchData<Food[]>(BASE_URL);
};

// GET foods by category
export const getFoodsByCategory = async (category: string): Promise<Food[]> => {
  const url = `${BASE_URL}?category=${encodeURIComponent(category)}`;
  return await fetchData<Food[]>(url);
};

// GET single food by ID
export const getFoodById = async (id: number): Promise<Food> => {
  return await fetchData<Food>(`${BASE_URL}/${id}`);
};

// CREATE new food
export const createFood = async (foodData: Omit<Food, 'id'>): Promise<Food> => {
  return await fetchData<Food>(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(foodData),
  });
};

// UPDATE existing food
export const updateFood = async (
  id: number,
  updatedData: Partial<Food>
): Promise<Food> => {
  return await fetchData<Food>(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
};

// DELETE food by ID
export const deleteFood = async (id: number): Promise<void> => {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
};

// SEARCH foods by name
export const searchFoods = async (query: string): Promise<Food[]> => {
  const url = `${BASE_URL}?searchfoodname=${encodeURIComponent(query)}`;
  return await fetchData<Food[]>(url);
};
