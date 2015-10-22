define(["app", "vc/goals/list/list_view"], function(Skillgenie, View){
  Skillgenie.module("GoalMenuApp.List", function(List, Skillgenie, Backbone, Marionette, $, _){
    List.Controller = {
      listGoals: function(criterion){
        require(["shared/views", "models/goal_model"], function(CommonViews){
          var loadingView = new CommonViews.Loading();
          Skillgenie.mainRegion.show(loadingView);

          var fetchingGoals = Skillgenie.request("goal:entities");

          var goalsListLayout = new View.Layout();
          var goalsListPanel = new View.Panel();

          require(["models/shared_models"], function(FilteredCollection){
            $.when(fetchingGoals).done(function(goals){
              var filteredGoals = Skillgenie.Entities.FilteredCollection({
                collection: goals,
                filterFunction: function(filterCriterion){
                  var criterion = filterCriterion.toLowerCase();
                  return function(goal){
                    if(goal.get('firstName').toLowerCase().indexOf(criterion) !== -1
                      || goal.get('lastName').toLowerCase().indexOf(criterion) !== -1
                      || goal.get('phoneNumber').toLowerCase().indexOf(criterion) !== -1){
                        return goal;
                    }
                  };
                }
              });

              if(criterion){
                filteredGoals.filter(criterion);
                goalsListPanel.once("show", function(){
                  goalsListPanel.triggerMethod("set:filter:criterion", criterion);
                });
              }

              var goalsListView = new View.Goals({
                collection: filteredGoals
              });

              goalsListPanel.on("goals:filter", function(filterCriterion){
                filteredGoals.filter(filterCriterion);
                Skillgenie.trigger("goals:filter", filterCriterion);
              });

              goalsListLayout.on("show", function(){
                goalsListLayout.panelRegion.show(goalsListPanel);
                goalsListLayout.displayRegion.show(goalsListView);
              });

              goalsListPanel.on("goal:new", function(){
                require(["vc/goals/new/new_view"], function(NewView){
                  var newGoal = new Skillgenie.Entities.Goal()

                  var view = new NewView.Goal({
                    model: newGoal
                  });


                    view.on("form:submit", function(data){
                        if(goals.length > 0){

                          var highestId = _.max(goals.pluck('id'));
                          console.log("highestid is "+ highestId)
                          data.id = highestId + 1;

                          console.log(data);

                        }
                        else{
                          data.id = 1;
                        }
                        if(newGoal.save(data)){
                          console.log(data)

                          goals.add(newGoal);
                          view.trigger("dialog:close");
                          var newGoalView = goalsListView.children.findByModel(newGoal);
                          // check whether the new goal view is displayed (it could be
                          // invisible due to the current filter criterion)
                      if(newGoalView){
                        newGoalView.flash("success");
                      }
                    }
                    else{
                      console.log("WOAH,  should be validating entries")
                      //view.triggerMethod("form:data:invalid", newGoal.validationError);
                    }
                  });


                  Skillgenie.dialogRegion.show(view);
                });
              });

              goalsListView.on("childview:goal:show", function(childView, args){
                Skillgenie.trigger("goal:show", args.model.get("_id"));
              });

              goalsListView.on("childview:goal:view-timeline", function(childView, args){
                Skillgenie.trigger("posts:list", args.model.get("slug"));
              });

              goalsListView.on("childview:goal:view-metrics", function(childView, args){
                Skillgenie.trigger("metric:show", args.model.get("slug"));
              });

              goalsListView.on("childview:goal:edit", function(childView, args){
                require(["vc/goals/edit/edit_view"], function(EditView){
                  var model = args.model;
                  var view = new EditView.Goal({
                    model: model
                  });

                  view.on("form:submit", function(data){
                    if(model.save(data)){
                      childView.render();
                      view.trigger("dialog:close");
                      childView.flash("success");
                    }
                    else{
                      view.triggerMethod("form:data:invalid", model.validationError);
                    }
                  });

                  
                  Skillgenie.dialogRegion.show(view);
                });
              });

              goalsListView.on("childview:goal:delete", function(childView, args){
                args.model.destroy();
              });

              Skillgenie.mainRegion.show(goalsListLayout);
            });
          });
        });
      }
    }
  });

  return Skillgenie.GoalMenuApp.List.Controller;
});
