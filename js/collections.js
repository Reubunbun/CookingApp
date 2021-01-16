//Collection of Recipes that the user has saved
App.Collections.SavedRecipes = Backbone.Collection.extend({
  model: App.Models.Recipe,
  unique: true
});

//Collection of Recipes that are returned from a search
App.Collections.SearchedRecipes = Backbone.Collection.extend({
  model: App.Models.Recipe,
  requestUrl: "https://www.themealdb.com/api/json/v1/1/search.php?s=",
  url: "",

  parse(response) {
    if ("meals" in response && response.meals !== undefined) {
      return response.meals;
    }
  }
});
