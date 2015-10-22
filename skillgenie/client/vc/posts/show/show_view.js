define(["app",
        "text!templates/timeline/missing.handlebars",
        "text!templates/timeline/view.handlebars",
        "handlebars"],
       function(Skillgenie, missingTpl, viewTpl, Handlebars){
  Skillgenie.module("TimelineApp.Show.View", function(View, Skillgenie, Backbone, Marionette, $, _){
    View.MissingPost = Marionette.ItemView.extend({
      template: Handlebars.compile(missingTpl)
    });

    View.Post = Marionette.ItemView.extend({
      template: Handlebars.compile(viewTpl),

      events: {
        "click a.js-edit": "editClicked"
      },

      editClicked: function(e){
        e.preventDefault();
        this.trigger("post:edit", this.model);
      }
    });
  });

  return Skillgenie.TimelineApp.Show.View;
});
