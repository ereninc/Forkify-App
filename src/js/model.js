import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import * as helpers from './helpers.js';

export const state = {
  recipe: {},
};

//All this function do is to fetch the data from the API and store it in the state object
export const loadRecipe = async function (id) {
  try {
    const data = await helpers.getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(`${err} 💥💥💥💥💥`);
    // alert(err);
  }
};
