//Main view
App.Views.App = Backbone.View.extend({
  initialize: function(){
    let addMealView  = new App.Views.AddMeal({collection: App.meals});
    let allMealsView = new App.Views.Meals({collection: App.meals});
    allMealsView.render();
    $("#mealList").append(allMealsView.el);
  }
});

//Single Meal
App.Views.Meal = Backbone.View.extend({
  tagName: "li",

  template: template("mealTemplate"),

  events: {
    "click #removeButton": "destroy"
  },

  render() {
    this.$el.html( this.template( this.model.toJSON() ) );
    return this;
  },

  destroy() {
    this.model.destroy();
    this.$el.remove();
  }
});

//Collection of Meals
App.Views.Meals = Backbone.View.extend({
  tagName: "ul",

  initialize() {
    this.collection.on("add", this.addOne, this);
  },

  render() {
    this.collection.each(this.addOne, this);
  },

  addOne(meal) {
    let mealView = new App.Views.Meal({model: meal});
    this.$el.append(mealView.render().el);
    return this;
  },

});

//Add Meal button
App.Views.AddMeal = Backbone.View.extend({
  el: "#searchButton",

  events: {
    "click": "addMeal"
  },

  addMeal(e) {
    e.preventDefault();
    let newMeal = new App.Models.Meal(
      { name: $("#searchBox").val() }, {validate: true}
    );
    let bExistsInCollection = this.collection.findWhere({name: newMeal.get("name")});

    if (!newMeal.validationError) {
      if (!bExistsInCollection)
        this.collection.add(newMeal);
      else
        console.log("Meal already in list");
    } else {
      console.log(newMeal.validationError);
    }
  }
});
