//Main view
App.Views.App = Backbone.View.extend({
  initialize: function(){
    let searchBoxView = new App.Views.SearchBox({collection: App.searchedMeals});
    let searchedMealsView = new App.Views.SearchedMeals({collection: App.searchedMeals});
    let savedMealsView = new App.Views.SavedMeals({collection: App.savedMeals});
    savedMealsView.render();
    $("#mealList").append(savedMealsView.el);
  }
});

//Single Saved Meal
App.Views.SavedMeal = Backbone.View.extend({
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

//Collection Of Saved Meals
App.Views.SavedMeals = Backbone.View.extend({
  tagName: "ul",

  initialize() {
    this.collection.on("add", this.addOne, this);
  },
  render() {
    this.collection.each(this.addOne, this);
  },
  addOne(meal) {
    let mealView = new App.Views.SavedMeal({model: meal});
    this.$el.append(mealView.render().el);
    return this;
  },

});

//Searchbox view
App.Views.SearchBox = Backbone.View.extend({
  el: "#searchBox",
  events: {
    "keyup": "search"
  },

  search(){
    this.collection.url = this.collection.requestUrl + this.$el.val();
    this.collection.each(
      function(model){model.destroy();
    });
    this.collection.reset();
    this.collection.fetch();
  }
});

//Single search result
App.Views.SearchedMeal = Backbone.View.extend({
  tagName: "li",

  initialize() {
    this.model.on("destroy", this.remove, this);
  },
  render() {
    this.$el.html( this.model.get("strMeal") );
    return this;
  },
  remove(){
    this.$el.remove();
  }
});

//Collection of search results
App.Views.SearchedMeals = Backbone.View.extend({
  el: "#searchResults",

  initialize() {
    this.collection.on("add", this.addOne, this);
  },
  addOne(meal) {
    let mealView = new App.Views.SearchedMeal({model: meal});
    this.$el.append(mealView.render().el);
    return this;
  }
});
