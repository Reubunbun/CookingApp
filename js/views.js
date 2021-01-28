////////////////////////////////
//// MODEL VIEWS
////////////////////////////////

//One Recipe
App.Views.SavedRecipe = Marionette.View.extend({
  tagName: "li",
  className: "list-group-item",
  template: template("savedRecipeTemplate"),
  events: {
    "click #removeButton": "destroy",
    "click #viewButton": "viewRecipe"
  },

  viewRecipe() {
    window.location.href = App.startURL + "#show/" + this.model.get("idMeal");
  },
  destroy() { this.model.destroy(); }
});

//Collection of Recipes
App.Views.SavedRecipes = Marionette.CollectionView.extend({
  el: "#recipeList",
  childView: App.Views.SavedRecipe
});

//Single search preview
App.Views.SearchPreview = Marionette.View.extend({
  tagName: "div",
  className: "list-group-item",
  template: _.template("<%= strMeal %>")
});

//Collection of search previews
App.Views.SearchPreviews = Marionette.CollectionView.extend({
  el: "#searchResults",
  childView: App.Views.SearchPreview
});

//Searchbar
App.Views.SearchBar = Marionette.View.extend({
  el: "#searchBar",
  template: template("searchBarTemplate"),
  events: {"keyup #searchBox": "search"},
  regions: {searchResults: "#searchResults"},

  onRender(){
    this.showChildView( "searchResults",
      new App.Views.SearchPreviews( {collection: this.collection} )
    );
  },
  search() {
    const searchValue = this.$el.find("#searchBox").val();
    this.collection.url = this.collection.requestUrl + searchValue;
    this.collection.reset();
    if (searchValue !== "") this.collection.fetch();
  }
});

//One search result
App.Views.SearchResult = Marionette.View.extend({
  tagName: "li",
  className: "list-group-item p-0 mb-1",
  template: template("searchedRecipeTemplate"),
  events: {
    "click #addButton": "saveRecipe",
    "click #viewButton": "viewRecipe",
  },

  saveRecipe() {
    const isDuplicate = App.savedRecipes.find(
      recipe => recipe.get("idMeal") == this.model.get("idMeal")
    );
    if (!isDuplicate) App.savedRecipes.add( this.model.toJSON() );
  },
  viewRecipe() {
    window.location.href = App.startURL + "#show/" + this.model.get("idMeal");
  }
});

//Collection of search results
App.Views.SearchResults = Marionette.CollectionView.extend({
  el: "#resultsList",
  childView: App.Views.SearchResult
});

//One ingredient
App.Views.Ingredient = Marionette.View.extend({
  tagName: "tr",
  template: template("ingredientTemplate")
});

//Collection of ingredients
App.Views.Ingredients = Marionette.CollectionView.extend({
  el: "#ingredientsList",
  childView: App.Views.Ingredient
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
    main: "#main-content"
  },
  events: { "click #searchButton": "search" },

  onRender() {
    this.showChildView( "searchBar",
      new App.Views.SearchBar( {collection: App.searchPreviewRecipes} )
    );
  },
  search() {
    window.location.href = App.startURL + "#search/" + this.$el.find("#searchBox").val();;
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
  events: { "click #saveButton": "saveRecipe" },

  onRender() {
    //Remove save button when recipe is already saved
    const isSaved = App.savedRecipes.find(
      recipe => recipe.get("idMeal") == this.model.get("idMeal")
    );
    if (isSaved) this.$el.find("#saveButton").remove();

    //Create new collection of ingredients with their corresponding measurements
    let pIngredients = [];
    for ( const [key, value] of Object.entries( this.model.toJSON() ) ) {
      if (key.includes("strIngredient") && value) {
        [, ingredientNum] = key.split("strIngredient");
        pIngredients.push({
          ingredientNum: ingredientNum,
          strIngredient: value,
          strMeasure: this.model.get("strMeasure" + ingredientNum)
        });
      }
    }

    this.showChildView( "ingredientsList",
      new App.Views.Ingredients(
        { collection: new Backbone.Collection(pIngredients) }
      )
    );
  },
  saveRecipe() {
    const isDuplicate = App.savedRecipes.find(
      recipe => recipe.get("idMeal") == this.model.get("idMeal")
    );
    if (!isDuplicate) App.savedRecipes.add( this.model.toJSON() );
  }
});

//Shows all searched recipes with image preview
App.Views.SearchedRecipesPage = Marionette.View.extend({
  el: "#main-content",
  template: template("searchedRecipesTemplate"),
  regions: { resultsList: "#resultsList" },

  onRender() {
    //Need to make a separate collection so there can be search previews on the
    //search page
    //App.searchedRecipes = App.searchPreviewRecipes.clone();
    this.showChildView( "resultsList",
      new App.Views.SearchResults( {collection: App.searchedRecipes} )
    );
  }
});

App.Views.mainView = new App.Views.Main();
