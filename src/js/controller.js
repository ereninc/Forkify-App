import * as model from './model.js';
import * as config from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
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

    //Updating results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    //Loading recipe
    await model.loadRecipe(recipeId);

    //Rendering recipe
    recipeView.render(model.state.recipe);

    //Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // model.state.search.page = 1;

    //Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //Load search results
    await model.loadSearchResults(query);

    //Render results
    //Before pagination
    // resultsView.render(model.state.search.results);

    //After pagination
    resultsView.render(model.getSearchResultsPage());

    //Render pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlPagination = function (goToPage) {
  //Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings);
  //Update the recipe view
  // recipeView.render(model.state.recipe); //its not efficient to render the whole recipe again
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //Add or remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  //Update recipe view
  recipeView.update(model.state.recipe);

  //Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  console.log(newRecipe);
  try {
    //Show loading spinner
    addRecipeView.renderSpinner();
    //Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //Render recipe
    recipeView.render(model.state.recipe);
    //Success message
    addRecipeView.renderMessage();
    //Render bookmark view
    bookmarksView.render(model.state.bookmarks);
    //Change ID in URL
    // window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, config.MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error.message);
  }
};

//Init handler
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
