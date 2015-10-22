define(["app", "vc/goals/common/goals_views"], function(Skillgenie, CommonViews){
  Skillgenie.module("GoalMenuApp.New.View", function(View, Skillgenie, Backbone, Marionette, $, _){
    View.Goal = CommonViews.Form.extend({
      title: "New Goal",

      onRender: function(){
        this.$(".js-submit").text("Create goal");
      }
    });
  });

  return Skillgenie.GoalMenuApp.New.View;
});
