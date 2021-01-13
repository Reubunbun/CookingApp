App.Collections.Locations = Backbone.Collection.extend({
  model: App.Models.Location,
  url: "https://www.metaweather.com/api/location/search/?query=san"
});
