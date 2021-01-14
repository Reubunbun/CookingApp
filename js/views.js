//Main view
App.Views.App = Backbone.View.extend({
  initialize() {
    const savedMealsView = new App.Views.SavedMeals( {collection: App.savedMeals} );
    savedMealsView.render()
    $("#mealList").append(savedMealsView.$el);
    /**let searchBoxView = new App.Views.SearchBox({collection: App.searchedMeals});
    let searchedMealsView = new App.Views.SearchedMeals({collection: App.searchedMeals});
    let savedMealsView = new App.Views.SavedMeals({collection: App.savedMeals});
    savedMealsView.render();
    $("#mealList").append(savedMealsView.el);*/
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
App.Views.SearchBox = Backbone.View.extend({
  el: "#searchBox",
  events: {
    "keyup": "search"
  },

  search(){
    this.collection.url = this.collection.requestUrl + this.$el.val();
    this.collection.reset();
    if (this.$el.val() !== "") {
      this.collection.fetch().then( () => console.log(this.collection.length) );
    }
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
  remove() {
    this.$el.remove();
  }
});

//Collection of search results
App.Views.SearchedMeals = Backbone.View.extend({
  el: "#searchResults",

  initialize() {
    this.collection.on("reset", this.reset, this);
    this.collection.on("add", this.addOne, this);
  },
  addOne(meal) {
    let mealView = new App.Views.SearchedMeal( {model: meal} );
    this.$el.append(mealView.render().el);
    return this;
  },
  reset() {
    this.$el.empty();
  }
});
