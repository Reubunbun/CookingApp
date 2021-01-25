App.Router = Backbone.Router.extend({
  routes: {
    "": "savedRecipesPage",
    "search": "searchRecipesPage",
    "showSaved/:id": "showSavedRecipePage",
    "showSearched/:id": "showSearchedRecipePage"
  },

  switchMainView(newView, params) {
    App.Views.mainView.getRegion("main").detachView();
    App.Views.mainView.showChildView( "main", new newView(params) );
    $("#searchBox").val("");
    App.searchPreviewRecipes.reset();
  },
  savedRecipesPage() {
    this.switchMainView(App.Views.SavedRecipesPage);
  },
  searchRecipesPage() {
    this.switchMainView(App.Views.SearchedRecipesPage);
  },
  showSavedRecipePage(id) {
    const recipeModel = App.savedRecipes.find(
      recipe => recipe.get("idMeal") == id
    );
    this.switchMainView( App.Views.ShowRecipePage, {model: recipeModel} );
  },
  showSearchedRecipePage(id) {
    const recipeModel = App.searchedRecipes.find(
      recipe => recipe.get("idMeal") == id
    );
    this.switchMainView( App.Views.ShowRecipePage, {model: recipeModel} );
  }
});
