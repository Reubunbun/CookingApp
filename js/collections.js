//Collection of meals that the user has saved
App.Collections.SavedMeals = Backbone.Collection.extend({
  model: App.Models.Meal
});

//Collection of meals that are returned from a search
App.Collections.SearchedMeals = Backbone.Collection.extend({
  model: App.Models.Meal,
  requestUrl: "https://www.themealdb.com/api/json/v1/1/search.php?s=",
  url: "",

  parse(response) {
    if ("meals" in response) return response.meals;
  }
});
