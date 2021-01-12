//Main view
App.Views.App = Backbone.View.extend({
  initialize: function(){
    let addLocationView  = new App.Views.AddLocation({collection: App.locations});
    let allLocationsView = new App.Views.Locations({collection: App.locations});
    allLocationsView.render();
    $("#locationList").append(allLocationsView.el);
  }
});

//Single location
App.Views.Location = Backbone.View.extend({
  tagName: "li",

  template: template("locationTemplate"),

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

//Collection of locations
App.Views.Locations = Backbone.View.extend({
  tagName: "ul",

  initialize() {
    this.collection.on("add", this.addOne, this);
  },

  render() {
    this.collection.each(this.addOne, this);
  },

  addOne(location) {
    let locationView = new App.Views.Location({model: location});
    this.$el.append(locationView.render().el);
    return this;
  },

});

//Add location button
App.Views.AddLocation = Backbone.View.extend({
  el: "#searchButton",

  events: {
    "click": "addLocation"
  },

  addLocation(e) {
    e.preventDefault();
    this.collection.add({
      "name" : $("#searchBox").val()
    });
  }
});
