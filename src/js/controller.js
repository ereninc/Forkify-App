import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    //Loading spinner animation
    recipeView.renderSpinner();

    //Loading recipe
    await model.loadRecipe(recipeId);

    //Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //Load search results
    await model.loadSearchResults(query);

    //Render results
    //Before pagination
    // resultsView.render(model.state.search.results);

    //After pagination
    resultsView.render(model.getSearchResultsPage(2));

    //Render pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    recipeView.renderError();
  }
};

//Event handlers
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
