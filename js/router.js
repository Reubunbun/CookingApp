App.Router = Backbone.Router.extend({
  routes: {
    "": "SavedRecipesPage",
    "search": "SearchRecipesPage",
    "show/:id": "ShowRecipePage"
  },

  switchMainView(newView, params) {
    mainView.getRegion("main").detachView();
    mainView.showChildView( "main", new newView(params) );
    $("#searchBox").val("");
    App.searchedRecipes.reset();
  },
  SavedRecipesPage() {
    this.switchMainView(App.Views.SavedRecipesPage);
  },
  SearchRecipesPage() {
    this.switchMainView(App.Views.SearchedRecipesPage);
  },
  ShowRecipePage(id) {
    const recipeModel = App.savedRecipes.find(
      recipe => recipe.get("idMeal") == id
    );
    this.switchMainView( App.Views.ShowRecipePage, {model: recipeModel} );
  }
});
