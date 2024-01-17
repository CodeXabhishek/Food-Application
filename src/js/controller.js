import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultVIew from './views/resultVIew.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash;

    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    const { recipe } = model.state;
    recipeView.render(model.state.recipe);
    resultVIew.update(model.getSearchResultPage());
    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    console.log(`${err.message}❌📛 `);
    recipeView.renderError();
  }
};

/**@description: Rendering results for search query */
const controlSearchResult = async function () {
  try {
    resultVIew.renderSpinner();
    const query = searchView.getQuery();
    await model.loadSearchResult(query);
    resultVIew.render(model.getSearchResultPage());
    paginationView.render(model.state.search);
  } catch (error) {}
};

/**@description:For diffrent pages */
const controlPagination = function (goToPage) {
  resultVIew.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
};

/**@description:For updating recipe servings */
const controlServing = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

/**@description:For Adding and deleting bookmarks */
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
};

/**@description:For rendering bookmarks */
const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

/**@description:For controling adding new custom recipe*/
const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderSuccess();

    bookmarkView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleForm();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
  location.reload();
};

/**@description:Hanndling function-publisher subscriber pattern */
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUploadForm(controlAddRecipe);
};
init();
