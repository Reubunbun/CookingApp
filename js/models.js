App.Models.Meal = Backbone.Model.extend({
  validate: function(attrs) {
    if (!attrs.strMeal) {
      return "Must have an input";
    }
  }
});
