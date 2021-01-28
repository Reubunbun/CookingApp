App.Router = Backbone.Router.extend({
  routes: {
    "": "savedRecipesPage",
    "search/:query": "searchRecipesPage",
    "show/:id": "showRecipePage"
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
  searchRecipesPage(query) {
    App.searchedRecipes.url = App.searchedRecipes.requestUrl + query;
    App.searchedRecipes.fetch().then( () => {
      this.switchMainView(App.Views.SearchedRecipesPage);
    }); 
  },
  showRecipePage(id) {
    const recipeModel = new App.Models.Recipe();
    recipeModel.url = recipeModel.requestUrl + id;
    console.log("url: " + recipeModel.url);
    recipeModel.fetch().then( () => {
      this.switchMainView( App.Views.ShowRecipePage, {model: recipeModel} );
    });    
  }
});
