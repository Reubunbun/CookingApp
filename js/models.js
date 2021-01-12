App.Models.Location = Backbone.Model.extend({
  validate: function(attrs) {
    if (!attrs.name) {
      return "Must have an input";
    }
  }
});
