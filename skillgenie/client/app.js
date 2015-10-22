define(["marionette", "shared/regions/dialog"], function(Marionette){
  var Skillgenie = new Marionette.Application();

  Skillgenie.addRegions({
    headerRegion: "#header-region",
    mainRegion: "#main-region",
    dialogRegion: Marionette.Region.Dialog.extend({
      el: "#dialog-region"
    })
  });

  Skillgenie.navigate = function(route,  options){
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  Skillgenie.getCurrentRoute = function(){
    return Backbone.history.fragment
  };

  Skillgenie.startSubApp = function(appName, args){
    var currentApp = appName ? Skillgenie.module(appName) : null;
    if (Skillgenie.currentApp === currentApp){ return; }

    if (Skillgenie.currentApp){
      Skillgenie.currentApp.stop();
    }

    Skillgenie.currentApp = currentApp;
    if(currentApp){
      currentApp.start(args);
    }
  };

  Skillgenie.on("start", function(){
    if(Backbone.history){
      require(["routes/post_routes", "routes/metric_routes", "routes/goal_routes"], function () {
        Backbone.history.start();

        if(Skillgenie.getCurrentRoute() === ""){
          Skillgenie.trigger("goals:list");
        }
      });
    }
  });

  return Skillgenie;
});
