//Collection of Recipes that the user has saved
App.Collections.SavedRecipes = Backbone.Collection.extend({
  model: App.Models.Recipe,
  unique: true
});

//Collection of Recipes that are returned from a search
App.Collections.SearchedRecipes = Backbone.Collection.extend({
  requestUrl: "https://www.themealdb.com/api/json/v1/1/search.php?s=",
  url: "",

  parse(response) {
    if ("meals" in response && response.meals !== undefined) {
       //Change format of urls so they can be embedded
      for (let meal of response.meals) {
        if ("strYoutube" in meal) {
          [, videoID] = meal.strYoutube.split("v=");
          meal.strYoutube = "http://www.youtube.com/embed/" + videoID;
        }
      }
      console.log(response.meals);

      return response.meals;
    }
  }
});
