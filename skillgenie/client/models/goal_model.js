define(["app"], function(Skillgenie){
  Skillgenie.module("Entities", function(Entities, Skillgenie, Backbone, Marionette, $, _){
    Entities.Goal = Backbone.Model.extend({
      idAttribute: "_id",
      urlRoot: "/api/goals/",

      defaults: {
        id: "",
        doc: "",
        slug: "",
        timestamp: 0,
        headline: "",
        description: "",
        success: false,

        fop: "",
        difficulty: 0,
        priority: ""
      },

      parse : function(res,xhr) { 
        if (_.isObject(res[0])) {
           return res[0];
       } else {
           return res;
       }
      },

      // validate: function(attrs, options) {
      //   var errors = {}
      //   if (! attrs.firstName) {
      //     errors.firstName = "can't be blank";
      //   }

      //   if (! attrs.lastName) {
      //     errors.lastName = "can't be blank";
      //   }
      //   else{
      //     if (attrs.lastName.length < 2) {
      //       errors.lastName = "is too short";
      //     }
      //   }

      //   if( ! _.isEmpty(errors)){
      //     return errors;
      //   }
      // }
    });

    Entities.GoalCollection = Backbone.Collection.extend({
      url: "/api/goals/",
      model: Entities.Goal,
      comparator: "timestamp",

    });

    var API = {
      getGoalEntities: function(){
        var goals = new Entities.GoalCollection();
        var defer = $.Deferred();
        goals.fetch({
          success: function(data){
            defer.resolve(data);
          }
        });
        var promise = defer.promise();
        $.when(promise).done(function(goals){
          if(goals.length === 0){
            goals.reset(models);
          }
        });
        return promise;
      },

      getGoalEntity: function(goalID){
        var goal = new Entities.Goal({_id: goalID});
        var defer = $.Deferred();
          goal.fetch({
            success: function(data){
              defer.resolve(data);
            },
            error: function(data){
              defer.resolve(undefined);
            }
          });
        return defer.promise();
      }
    };

    Skillgenie.reqres.setHandler("goal:entities", function(){
      return API.getGoalEntities();
    });

    Skillgenie.reqres.setHandler("goal:entity", function(id){
      return API.getGoalEntity(id);
    });
  });

  return ;
});
