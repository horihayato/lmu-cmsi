define(["app", "marionette"], function(Skillgenie, Marionette){
  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      "metrics/:slug" : "showMetrics"
    }
  });

  var API = {
    showMetrics: function(slug){
      require(["vc/metrics/show/show_controller"], function(ShowController){
        Skillgenie.startSubApp(null);
        ShowController.showMetrics(slug);
        Skillgenie.execute("set:active:header", "metrics");
      });
    }
  };

  Skillgenie.on("metric:show", function(slug){
    Skillgenie.navigate("metrics/" + slug);
    API.showMetrics(slug);
  });

  Skillgenie.addInitializer(function(){
    new Router({
      controller: API
    });
  });

  return Router;
});
