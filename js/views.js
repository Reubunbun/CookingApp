//Main view
App.Views.App = Backbone.View.extend({
  initialize() {
    const savedMealsView = new App.Views.SavedMeals( {collection: App.savedMeals} );
    $("#mealList").append(savedMealsView.render().$el);
    const searchBoxView = new App.Views.SearchBox( {collection: App.searchedMeals} );
    const searchedMealsView = new App.Views.SearchedMeals( {collection: App.searchedMeals} );
    searchedMealsView.render();
  }
});

//One meal
App.Views.SavedMeal = Marionette.View.extend({
  tagName: "li",
  template: template("mealTemplate"),
  events: { "click #removeButton": "destroy" },

  destroy() { this.model.destroy(); }
});

//Collection of meals
App.Views.SavedMeals = Marionette.CollectionView.extend({
  tagName: "ul",
  childView: App.Views.SavedMeal
});

//Searchbox view
App.Views.SearchBox = Marionette.View.extend({
  el: "#searchBox",
  events: { "keyup": "search" },

  search() {
    this.collection.url = this.collection.requestUrl + this.$el.val();
    this.collection.reset();
    if (this.$el.val() !== "") this.collection.fetch();
  }
});

//Single search result
App.Views.SearchedMeal = Marionette.View.extend({
  tagName: "li",
  template: _.template("<%= strMeal %>")
});

//Collection of search results
App.Views.SearchedMeals = Marionette.CollectionView.extend({
  el: "#searchResults",
  childView: App.Views.SearchedMeal
});
