App.Models.Recipe = Backbone.Model.extend({
  requestUrl: "https://www.themealdb.com/api/json/v1/1/lookup.php?i=",
  url: "",

  parse(response) {
    console.log("hello");
    if ("meals" in response && response.meals !== undefined) {
      const meal = response.meals[0];
      if ("strYoutube" in meal) {
        [, videoID] = meal.strYoutube.split("v=");
        meal.strYoutube = "http://www.youtube.com/embed/" + videoID;
      }
      return meal;
    }
  }
});
