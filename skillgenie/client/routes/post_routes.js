define(["app"], function(Skillgenie){
  Skillgenie.module("Routers.TimelineApp", function(TimelineAppRouter, Skillgenie, Backbone, Marionette, $, _){
    TimelineAppRouter.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "timeline/:slug": "listPosts",
        "timeline/:id": "showPost",
        "timeline/:id/edit": "editPost"
      }
    });

    var executeAction = function(action, arg){
      Skillgenie.startSubApp("TimelineApp");
      action(arg);
      Skillgenie.execute("set:active:header", "timeline");
    };

    var API = {
      listPosts: function(slug){
        require(["vc/posts/list/list_controller"], function(ListController){
          executeAction(ListController.listPosts, slug);
        });
      },

      showPost: function(id){
        require(["vc/posts/show/show_controller"], function(ShowController){
          executeAction(ShowController.showPost, id);
        });
      },

      editPost: function(id){
        require(["vc/posts/edit/edit_controller"], function(EditController){
          executeAction(EditController.editPost, id);
        });
      }
    };

    Skillgenie.on("posts:list", function(slug){
      Skillgenie.navigate("timeline/" + slug);
      API.listPosts(slug);
    });

    Skillgenie.on("posts:filter", function(criterion){
      if(criterion){
        Skillgenie.navigate("timeline/filter/criterion:" + criterion);
      }
      else{
        Skillgenie.navigate("timeline");
      }
    });

    Skillgenie.on("post:show", function(id){
      Skillgenie.navigate("timeline/" + id);
      API.showPost(id);
    });

    Skillgenie.on("post:edit", function(id){
      Skillgenie.navigate("timeline/" + id + "/edit");
      API.editPost(id);
    });

    Skillgenie.addInitializer(function(){
      new TimelineAppRouter.Router({
        controller: API
      });
    });
  });

  return Skillgenie.TimelineAppRouter;
});
