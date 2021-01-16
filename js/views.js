////////////////////////////////
//// MODEL VIEWS
////////////////////////////////

//One Recipe
App.Views.SavedRecipe = Marionette.View.extend({
  tagName: "li",
  template: template("savedRecipeTemplate"),
  events: {
    "click #removeButton": "destroy",
    "click #viewButton": "viewRecipe"
  },

  viewRecipe() {
    App.searchedRecipes.reset();
    window.location.href += "#show/" + this.model.get("idMeal");
  },
  destroy() { this.model.destroy(); }
});

//Collection of Recipes
App.Views.SavedRecipes = Marionette.CollectionView.extend({
  el: "#recipeList",
  childView: App.Views.SavedRecipe
});

//Single search result
App.Views.SearchedRecipe = Marionette.View.extend({
  tagName: "li",
  template: _.template("<%= strMeal %>"),
  events: {"click": "saveRecipe"},

  saveRecipe() {
    const isDuplicate = App.savedRecipes.find(
      recipe => recipe.get("idMeal") == this.model.get("idMeal")
    );
    if (!isDuplicate) App.savedRecipes.add( this.model.toJSON() );
  }
});

//Collection of search results
App.Views.SearchedRecipes = Marionette.CollectionView.extend({
  el: "#searchResults",
  childView: App.Views.SearchedRecipe
});

//Searchbox view
App.Views.SearchBar = Marionette.View.extend({
  el: "#searchBar",
  template: template("searchBarTemplate"),
  events: { "keyup #searchBox": "search" },
  regions: { searchResults: "#searchResults" },

  onRender(){
    this.showChildView( "searchResults",
      new App.Views.SearchedRecipes( {collection: this.collection} )
    );
  },
  search() {
    const searchValue = this.$el.find("#searchBox").val();
    this.collection.url = this.collection.requestUrl + searchValue;
    this.collection.reset();
    if (searchValue !== "") this.collection.fetch();
  }
});

////////////////////////////////
//// PAGE VIEWS
////////////////////////////////

//Main parent view
App.Views.Main = Marionette.View.extend({
  el: "body",
  template: template("mainViewTemplate"),
  regions: {
    searchBar: "#searchBar",
    main: {
      el: "#main-content",
      replaceElement: false
    }
  },

  onRender() {
    this.showChildView( "searchBar",
      new App.Views.SearchBar( {collection: App.searchedRecipes} )
    );
  }
});

//Shows all saved recipes
App.Views.SavedRecipesPage = Marionette.View.extend({
  el: "#main-content",
  template: template("savedRecipesTemplate"),
  regions: { recipeList: "#recipeList" },

  onRender() {
    this.showChildView( "recipeList",
      new App.Views.SavedRecipes( {collection: App.savedRecipes} )
    );
  }
});

//Shows details for a recipe
App.Views.ShowRecipePage = Marionette.View.extend({
  el: "#main-content",
  template: template("showRecipeTemplate"),
  regions: { ingredientsList: "#ingredientsList" },

  onRender() {
    //TODO render list of ingredients in region
  }
});

//Shows all searched recipes with image preview
App.Views.SearchedRecipesPage = Marionette.View.extend({
  template: template("searchedRecipesTemplate"),
  regions: {resultsList: "#resultsList"},

  onBeforeShow() {
    this.getRegion("resultsList").show(
      //TODO
    );
  }
});
