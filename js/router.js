App.Router = Backbone.Router.extend({
  routes: {
    "": "SavedRecipesPage",
    "search": "SearchRecipesPage",
    "show/:id": "ShowRecipePage"
  },

  SavedRecipesPage() {
    mainView.getRegion("main").detachView();
    mainView.showChildView( "main",
      new App.Views.SavedRecipesPage()
    );
  },
  SearchRecipesPage() {
    mainView.getRegion("main").detachView();
    mainView.showChildView( "main",
      new App.Views.SearchedRecipesPage()
    );
  },
  ShowRecipePage(id) {
    const recipeModel = App.savedRecipes.find(
      recipe => recipe.get("idMeal") == id
    );
    mainView.getRegion("main").detachView();
    mainView.showChildView( "main",
      new App.Views.ShowRecipePage( {model: recipeModel} )
    );
  }
});
