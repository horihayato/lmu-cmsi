define(["app",
        "text!templates/goal-menu/missing.handlebars",
        "text!templates/goal-menu/view.handlebars",
        "handlebars"],
       function(Skillgenie, missingTpl, viewTpl, Handlebars){
  Skillgenie.module("GoalMenuApp.Show.View", function(View, Skillgenie, Backbone, Marionette, $, _){
    View.MissingGoal = Marionette.ItemView.extend({
      template: Handlebars.compile(missingTpl)
    });

    View.Goal = Marionette.ItemView.extend({
      template: Handlebars.compile(viewTpl),

      events: {
        "click a.js-edit": "editClicked"
      },

      editClicked: function(e){
        e.preventDefault();
        this.trigger("goal:edit", this.model);
      }
    });
  });

  return Skillgenie.GoalMenuApp.Show.View;
});
