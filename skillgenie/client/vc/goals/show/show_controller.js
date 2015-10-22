define(["app", "vc/goals/show/show_view"], function(Skillgenie, View){
  Skillgenie.module("GoalMenuApp.Show", function(Show, Skillgenie, Backbone, Marionette, $, _){
    Show.Controller = {
      showGoal: function(id){
        require(["shared/views", "models/post_model"], function(CommonViews){
          var loadingView = new CommonViews.Loading({
            title: "Artificial Loading Delay",
            message: "Data loading is delayed to demonstrate using a loading view."
          });
          Skillgenie.mainRegion.show(loadingView);

          var fetchingGoal = Skillgenie.request("goal:entity", id);
          $.when(fetchingGoal).done(function(goal){
            var goalView;
            if(goal !== undefined){
              goalView = new View.Goal({
                model: goal
              });

              goalView.on("goal:edit", function(goal){
                Skillgenie.trigger("goal:edit", goal.get("_id"));
              });
            }
            else{
              goalView = new View.MissingGoal();
            }

            Skillgenie.mainRegion.show(goalView);
          });
        });
      }
    }
  });

  return Skillgenie.GoalMenuApp.Show.Controller;
});
