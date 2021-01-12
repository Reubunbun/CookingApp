(function() {
  window.App = {
    Models     : {},
    Views      : {},
    Collections: {}
  };

  window.event = _.extend({}, Backbone.Events);

  window.template = function(id) {
    return _.template( $('#' + id).html() );
  };
})();
