define(["app"], function(Skillgenie){

  Skillgenie.module("Routers.GoalMenuApp", function(GoalMenuAppRouter, Skillgenie, Backbone, Marionette, $, _){
    GoalMenuAppRouter.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "goals(/filter/criterion::criterion)": "listGoals",
        "goals/:id": "showGoal",
        "goals/:id/edit": "editGoal"
      }
    });

    var executeAction = function(action, arg){
      Skillgenie.startSubApp("GoalMenuApp");
      action(arg);
      Skillgenie.execute("set:active:header", "goals");
    };

    var API = {
      listGoals: function(criterion){
        require(["vc/goals/list/list_controller"], function(ListController){
          executeAction(ListController.listGoals, criterion);
        });
      },

      showGoal: function(id){
        require(["vc/goals/show/show_controller"], function(ShowController){
          executeAction(ShowController.showGoal, id);
        });
      },

      editGoal: function(id){
        require(["vc/goals/edit/edit_controller"], function(EditController){
          executeAction(EditController.editGoal, id);
        });
      }
    };

    Skillgenie.on("goals:list", function(){
      Skillgenie.navigate("goals");
      API.listGoals();
    });

    Skillgenie.on("goals:filter", function(criterion){
      if(criterion){
        Skillgenie.navigate("goals/filter/criterion:" + criterion);
      }
      else{
        Skillgenie.navigate("goals");
      }
    });

    Skillgenie.on("goal:show", function(id){
      Skillgenie.navigate("goals/" + id);
      API.showGoal(id);
    });

    Skillgenie.on("goal:edit", function(id){
      Skillgenie.navigate("goals/" + id + "/edit");
      API.editGoal(id);
    });

    Skillgenie.addInitializer(function(){
      new GoalMenuAppRouter.Router({
        controller: API
      });
    });
  });

  return Skillgenie.GoalMenuAppRouter;
});
