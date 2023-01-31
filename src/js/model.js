import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import * as helpers from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: 10,
    page: 1,
  },
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
    throw err;
  }
};

//This function takes string as an argument and fetches the data from the API and stores it in the state object
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await helpers.getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};
