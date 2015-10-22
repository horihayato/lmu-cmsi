define(["app", "vc/goals/common/goals_views"], function(Skillgenie, CommonViews){
  Skillgenie.module("GoalMenuApp.Edit.View", function(View, Skillgenie, Backbone, Marionette, $, _){
    View.Goal = Skillgenie.GoalMenuApp.Common.Views.Form.extend({
    initialize: function(){
      this.title = "Edit " + this.model.get("headline");

    },

    onRender: function(){
      if(this.options.generateTitle){
        var $title = $('<h1>', { text: this.title });
        this.$el.prepend($title);
      }

      this.$(".js-submit").text("Update goal");
    }
    });
  });

  return Skillgenie.GoalMenuApp.Edit.View;
});
