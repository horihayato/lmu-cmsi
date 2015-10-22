define(["app", "vc/goals/edit/edit_view"], function(Skillgenie, View){
  Skillgenie.module("GoalMenuApp.Edit", function(Edit, Skillgenie, Backbone, Marionette, $, _){
    Edit.Controller = {
      editGoal: function(id){
        require(["shared/views", "models/goal_model"], function(CommonViews){
          var loadingView = new CommonViews.Loading({
            title: "Artificial Loading Delay",
            message: "Data loading is delayed to demonstrate using a loading view."
          });
          Skillgenie.mainRegion.show(loadingView);

          var fetchingGoal = Skillgenie.request("goal:entity", id);
          $.when(fetchingGoal).done(function(goal){
            var view;
            if(goal !== undefined){
              view = new View.Goal({
                model: goal,
                generateTitle: true
              });

              view.on("form:submit", function(data){
                if(goal.save(data)){
                  Skillgenie.trigger("goal:show", goal.get('_id'));
                }
                else{
                  view.triggerMethod("form:data:invalid", goal.validationError);
                }
              });
            }
            else{
              view = new Skillgenie.GoalMenuApp.Show.MissingGoal();
            }

            Skillgenie.mainRegion.show(view);
          });
        });
      }
    };
  });

  return Skillgenie.GoalMenuApp.Edit.Controller;
});
